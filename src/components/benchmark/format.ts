// Helpers de formato del Benchmark. Port de los utilizados por el dashboard /
// la landing de TredOps (compare-format.ts y bot-format.ts); se usan tanto en el
// renderizado servidor (BenchmarkSummary) como en el cliente (BenchmarkRace).

/** Colores de texto por defecto dibujados sobre la barra de un competidor. */
export const TONE = {
  win: "#a7f3d0",
  loss: "#fecaca",
  text: "rgba(255, 255, 255, 0.8)",
};

export function money(value: number | null | undefined, digits = 2): string {
  if (value == null || Number.isNaN(value)) return "—";
  const sign = value > 0 ? "+" : value < 0 ? "−" : "";
  return `${sign}$${Math.abs(value).toLocaleString("en-US", { minimumFractionDigits: digits, maximumFractionDigits: digits })}`;
}

export function percent(value: number | null | undefined, digits = 2): string {
  if (value == null || Number.isNaN(value)) return "—";
  const sign = value > 0 ? "+" : "";
  return `${sign}${value.toFixed(digits)}%`;
}

/** Cambio de equity respecto al capital inicial: "+17.10%" · "-0.66%". */
export function capitalPercent(profitPct: number | null | undefined): string {
  const v = profitPct == null || Number.isNaN(profitPct) ? 0 : profitPct;
  return `${v > 0 ? "+" : ""}${v.toFixed(2)}%`;
}

/** Iniciales del nombre de un competidor para el fallback del avatar. */
export function initialsOf(label: string): string {
  return label
    .split(/[\s·-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

export function formatDay(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" });
}

export function formatTime(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  return `${hh}:${mm}`;
}

/** Color de un P&L sobre la barra: el signo decide, 0 es neutro. */
export function toneColor(
  entry: { winColor?: string | null; lossColor?: string | null; textColor?: string | null } | null | undefined,
  value: number | null | undefined,
): string {
  if (value == null || Number.isNaN(value) || value === 0) return entry?.textColor || TONE.text;
  return value > 0 ? entry?.winColor || TONE.win : entry?.lossColor || TONE.loss;
}