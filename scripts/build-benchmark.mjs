// Genera una escena de Benchmark en `public/benchmark/<edición>.json` a partir
// del export "benchmark scene" de TredOps, quedándose solo con los campos que
// necesitan BenchmarkRace / BenchmarkSummary / BenchmarkAgentDetails.
//
// Uso:
//   npm run benchmark:build -- <export.json> <edición>
//   npm run benchmark:build -- ~/Descargas/benchmark_animation.json 2026-q4-crypto-agents
//
// La <edición> es el identificador de la publicación: el mismo valor que se
// pasa como prop `edition` en el MDX del benchmark. Solo minúsculas, números y
// guiones.
//
// El export de TredOps puede traer campos internos (ids de usuario, tokens,
// prompts). Este script actúa de filtro: lo que no esté en la lista de abajo
// NO acaba en el sitio público.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const [input, edition] = process.argv.slice(2);

if (!input || !edition) {
  console.error("uso: npm run benchmark:build -- <export.json> <edición>");
  process.exit(1);
}
if (!/^[a-z0-9][a-z0-9-]*$/.test(edition)) {
  console.error(`edición no válida: "${edition}" (solo minúsculas, números y guiones)`);
  process.exit(1);
}

const src = JSON.parse(readFileSync(resolve(process.cwd(), input), "utf8"));

const portfolios = src.portfolios.map((p) => ({
  portfolioId: p.portfolioId,
  label: p.label,
  subtitle: p.subtitle,
  model: p.model,
  avatarUrl: p.avatarUrl,
  color: p.color,
}));

const frames = src.frames.map((f) => ({
  tradeDate: f.tradeDate,
  rows: f.rows.map((r) => ({
    portfolioId: r.portfolioId,
    rank: r.rank,
    equity: r.equity,
    liquidity: r.liquidity,
    invested: r.invested,
    realized: r.realized,
    unrealized: r.unrealized,
    profitPct: r.profitPct,
    profitPctFromStart: r.profitPctFromStart,
    openCount: r.openCount,
    closedCount: r.closedCount,
    wins: r.wins,
    losses: r.losses,
    positions: r.positions.map((p) => ({
      orderId: p.orderId ?? null,
      s: p.s,
      c: p.c,
      p: p.p,
      pnl: p.pnl,
      price: p.price,
      side: p.side,
      stale: p.stale ?? false,
      avatar: p.avatar ?? null,
    })),
    // Posiciones cerradas en este frame (con motivo y P&L realizados).
    closed: (r.closedInStep ?? []).map((p) => ({
      s: p.s,
      side: p.side,
      pnl: p.pnl,
      p: p.p,
      reason: p.reason ?? null,
      avatar: p.avatar ?? null,
      tradeDate: f.tradeDate,
    })),
  })),
}));

const out = {
  version: src.version,
  source: src.source,
  chart: src.chart,
  view: src.view,
  range: src.range,
  portfolios,
  frames,
};

const dir = resolve(root, "public/benchmark");
mkdirSync(dir, { recursive: true });
const dest = resolve(dir, `${edition}.json`);
writeFileSync(dest, JSON.stringify(out));
const kb = (readFileSync(dest).byteLength / 1024).toFixed(0);
console.log(`escrito ${dest} (${kb} KB, ${frames.length} frames, ${portfolios.length} portfolios)`);
console.log(`usa <BenchmarkRace edition="${edition}" /> en el MDX de la publicación.`);
