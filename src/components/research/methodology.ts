// Ficha de metodología de un experimento del blog.
//
// `public/research/<slug>/methodology.json` lo genera tredops-research
// (`publish.mjs`) a partir del informe del benchmark, filtrando por lista
// blanca: prompt del benchmark, temperatura, razonamiento, plantilla del
// portfolio y, por agente, modelo, proveedor, temperatura, coste y el system
// prompt íntegro. Es la parte "enséñame todo" de cada publicación.
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

export interface MethodologyAgent {
	name: string;
	model: string | null;
	provider: string | null;
	isFree: boolean | null;
	temperature: number | null;
	reasoningEffort: string | null;
	systemPrompt: string | null;
	finalProfitPct: number | null;
	maxDrawdownPct: number | null;
	winRate: number | null;
	wins: number;
	losses: number;
	cost: { costTotal: number; tokenInput: number; tokenOutput: number; runs: number; avgDurationMs: number | null } | null;
}

export interface Methodology {
	benchmark: { name: string; startAt: string; endAt: string; intervalDay: number; cyclesTotal: number; balance: number; status: string };
	benchmarkPrompt: string;
	mode: string | null;
	temperature: number | null;
	reasoningLevel: string | null;
	maxTurns: number | null;
	skipWeekends: boolean | null;
	stages: string[];
	portfolioTemplate: Record<string, unknown> | null;
	paperTrading: boolean;
	agents: MethodologyAgent[];
	highlightedDecisions?: Array<{ agent: string; tradeDate: string; tool: string; justification: string; symbol?: string | null; suggestion?: string | null }>;
}

const cache = new Map<string, Methodology>();

export function loadMethodology(slug: string): Methodology {
	const cached = cache.get(slug);
	if (cached) return cached;
	if (!/^[a-z0-9][a-z0-9-]*$/.test(slug)) throw new Error(`Slug de experimento no válido: "${slug}"`);
	const file = resolve(process.cwd(), "public/research", slug, "methodology.json");
	let raw: string;
	try {
		raw = readFileSync(file, "utf8");
	} catch {
		throw new Error(`No existe la metodología del experimento "${slug}" (${file}). La genera tredops-research al publicar.`);
	}
	const doc = JSON.parse(raw) as Methodology;
	cache.set(slug, doc);
	return doc;
}
