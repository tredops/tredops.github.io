// Genera la escena "X vs Y" de una edición en `public/benchmark/<edición>-xy.json`.
//
// Dos entradas posibles:
//   a) el export "xy-scene.json" del dashboard (botón JSON del gráfico X vs Y
//      de Portfolio compare): se filtra y se copia tal cual.
//   b) la escena de la race (benchmark scene) + el report.json del experimento
//      (getExperimentReport): se calculan aquí las mismas métricas que el
//      dashboard — profit, equity, drawdown máximo, win rate, operaciones,
//      posiciones abiertas, P&L realizado / no realizado — y el coste LLM
//      acumulado de cada agente se toma de la serie por ciclo del report.
//
// Uso:
//   node scripts/build-xy.mjs <xy-scene.json> <edición>
//   node scripts/build-xy.mjs <race-scene.json> <edición> --report <report.json>
//
// El componente BenchmarkXY.astro lee el fichero en el navegador (lazy) y lo
// reproduce con línea de tiempo, selectores de métrica y avatares.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
const [input, edition] = args;
const reportIdx = args.indexOf("--report");
const reportPath = reportIdx >= 0 ? args[reportIdx + 1] : null;

if (!input || !edition) {
  console.error("uso: node scripts/build-xy.mjs <xy-scene.json | race-scene.json> <edición> [--report report.json]");
  process.exit(1);
}
if (!/^[a-z0-9][a-z0-9-]*$/.test(edition)) {
  console.error(`edición no válida: "${edition}"`);
  process.exit(1);
}

// Mismo catálogo que `compare-metrics.ts` del dashboard.
const METRIC_KEYS = ["profitPct", "profitUsd", "equity", "cost", "profitPerDollarCost", "maxDrawdownPct", "winRatePct", "trades", "openCount", "realized", "unrealized"];
const METRICS = {
  profitPct: { label: "Profit %", axis: "Profit % vs start", unit: "%", higherIsBetter: true, hint: "P&L at this instant as % of the equity on the first frame." },
  profitUsd: { label: "Profit $", axis: "Profit $", unit: "$", higherIsBetter: true, hint: "Equity at this instant minus equity on the first frame." },
  equity: { label: "Equity $", axis: "Equity $", unit: "$", higherIsBetter: true, hint: "Equity at this instant." },
  cost: { label: "LLM cost $", axis: "LLM cost $", unit: "$", higherIsBetter: false, hint: "Cumulative LLM cost of the agent's cycles up to this instant. Buy & Keep has no cost." },
  profitPerDollarCost: { label: "Profit per $ of cost", axis: "Profit $ / cost $", unit: "x", higherIsBetter: true, hint: "Profit $ divided by LLM cost $." },
  maxDrawdownPct: { label: "Max drawdown %", axis: "Max drawdown %", unit: "%", higherIsBetter: false, hint: "Largest peak-to-trough fall of the equity up to this instant, as % of that peak." },
  winRatePct: { label: "Win rate %", axis: "Win rate %", unit: "%", higherIsBetter: true, hint: "Winning closes over every close so far." },
  trades: { label: "Closed trades", axis: "Closed trades", unit: "#", higherIsBetter: true, hint: "Closed orders so far." },
  openCount: { label: "Open positions", axis: "Open positions", unit: "#", higherIsBetter: true, hint: "Positions open at this instant." },
  realized: { label: "Realized $", axis: "Realized P&L $", unit: "$", higherIsBetter: true, hint: "Realized P&L so far." },
  unrealized: { label: "Unrealized $", axis: "Unrealized P&L $", unit: "$", higherIsBetter: true, hint: "Unrealized P&L of the open positions." },
};
const PRESETS = [
  { x: "cost", y: "profitPct", label: "Profit vs cost" },
  { x: "maxDrawdownPct", y: "profitPct", label: "Profit vs drawdown" },
  { x: "trades", y: "profitPct", label: "Profit vs activity" },
  { x: "winRatePct", y: "profitPct", label: "Profit vs win rate" },
  { x: "cost", y: "profitPerDollarCost", label: "Efficiency" },
];

const src = JSON.parse(readFileSync(resolve(process.cwd(), input), "utf8"));
const round2 = (v) => Math.round(v * 100) / 100;

let out;
if (src.kind === "xy-scene") {
  out = {
    version: 1, kind: "xy-scene",
    source: { app: "tredops", name: src.source?.name ?? edition, exportedAt: src.source?.exportedAt ?? null },
    chart: src.chart, style: src.style ?? null, metricKeys: src.metricKeys, metrics: src.metrics, presets: src.presets, defaults: src.defaults, range: src.range,
    portfolios: src.portfolios.map((p) => ({ portfolioId: p.portfolioId, label: p.label, subtitle: p.subtitle ?? null, avatarUrl: p.avatarUrl ?? null, color: p.color ?? null, source: p.source ?? null })),
    frames: src.frames,
  };
} else {
  // Race scene + report: cost series per portfolio (cumulative at each cycle instant).
  const costSeries = new Map();
  if (reportPath) {
    const report = JSON.parse(readFileSync(resolve(process.cwd(), reportPath), "utf8"));
    for (const a of report.agents ?? []) {
      if (!a.portfolioId) continue;
      // The series carries the list price of every cycle; a free tier really
      // cost $0, and the axis says what was paid, so free agents sit at 0.
      const s = a.isFree
        ? [{ t: 0, cost: 0 }]
        : (a.series ?? []).filter((p) => p.costCumulative != null).map((p) => ({ t: Date.parse(p.tradeDate), cost: p.costCumulative })).sort((x, y) => x.t - y.t);
      costSeries.set(a.portfolioId, s.length ? s : [{ t: 0, cost: a.cost?.costTotal ?? 0 }]);
    }
  }
  const costAt = (pid, at) => {
    const s = costSeries.get(pid);
    if (!s) return null;
    let cost = 0;
    for (const p of s) { if (p.t <= at) cost = p.cost; else break; }
    return cost;
  };
  const portfolios = src.portfolios.map((p, i) => ({
    portfolioId: p.portfolioId, label: p.label, subtitle: p.subtitle ?? p.model ?? null, avatarUrl: p.avatarUrl ?? null,
    color: p.color || `hsl(${(i * 67) % 360} 70% 55%)`, source: p.portfolioId.startsWith("overlay:") ? "buyKeep" : "benchmark",
  }));
  const first = src.frames[0];
  const peak = new Map();
  const worstDd = new Map();
  const frames = src.frames.map((f) => {
    const at = Date.parse(f.tradeDate);
    const values = {};
    for (const p of portfolios) {
      const r = f.rows.find((x) => x.portfolioId === p.portfolioId);
      const r0 = first.rows.find((x) => x.portfolioId === p.portfolioId);
      if (!r || !r0) continue;
      const pk = Math.max(peak.get(p.portfolioId) ?? -Infinity, r.equity);
      peak.set(p.portfolioId, pk);
      const dd = pk > 0 ? ((pk - r.equity) / pk) * 100 : 0;
      const wdd = Math.max(worstDd.get(p.portfolioId) ?? 0, dd);
      worstDd.set(p.portfolioId, wdd);
      const cost = costAt(p.portfolioId, at);
      const profitUsd = round2(r.equity - r0.equity);
      const closes = r.wins + r.losses;
      const m = {
        profitPct: round2(r.profitPctFromStart ?? r.profitPct), profitUsd, equity: round2(r.equity),
        cost: cost == null ? null : round2(cost),
        profitPerDollarCost: cost != null && cost > 0 ? round2(profitUsd / cost) : null,
        maxDrawdownPct: round2(wdd), winRatePct: closes > 0 ? round2((r.wins / closes) * 100) : null,
        trades: r.closedCount, openCount: r.openCount, realized: round2(r.realized), unrealized: round2(r.unrealized),
      };
      values[p.portfolioId] = METRIC_KEYS.map((k) => m[k]);
    }
    return { tradeDate: f.tradeDate, values };
  });
  out = {
    version: 1, kind: "xy-scene",
    source: { app: "tredops", name: src.source?.name ?? src.chart?.title ?? edition, exportedAt: src.source?.exportedAt ?? null },
    chart: { title: src.chart?.title ?? edition, avatarRadius: src.chart?.avatarRadius ?? 50 },
    // No dashboard style in a race scene: the component uses its defaults (names off).
    style: null,
    metricKeys: METRIC_KEYS, metrics: METRICS, presets: PRESETS, defaults: { x: "cost", y: "profitPct" },
    range: { from: src.frames[0]?.tradeDate, to: src.frames[src.frames.length - 1]?.tradeDate },
    portfolios, frames,
  };
}

const dir = resolve(root, "public/benchmark");
mkdirSync(dir, { recursive: true });
const dest = resolve(dir, `${edition}-xy.json`);
writeFileSync(dest, JSON.stringify(out));
console.log(`escrito ${dest} (${(readFileSync(dest).byteLength / 1024).toFixed(0)} KB, ${out.frames.length} frames, ${out.portfolios.length} competidores)`);
console.log(`usa <BenchmarkXY edition="${edition}" /> en el MDX de la publicación.`);
