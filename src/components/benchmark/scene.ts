// Carga de las escenas del Benchmark.
//
// Las escenas viven en `public/benchmark/<edición>.json` y no en `src/data/`:
// así el JSON (>1 MB) se sirve como fichero estático y el gráfico lo descarga
// solo cuando entra en pantalla, en lugar de acabar dentro del bundle de
// JavaScript de la página. Los componentes que renderizan en servidor
// (resumen y detalle por agente) lo leen aquí en tiempo de build.

import { readFileSync } from "node:fs";
import { resolve } from "node:path";

export interface SceneEntry {
	portfolioId: string;
	label: string;
	subtitle?: string | null;
	model?: string | null;
	avatarUrl?: string | null;
	color?: string | null;
	winColor?: string | null;
	lossColor?: string | null;
	textColor?: string | null;
}

export interface ScenePosition {
	orderId?: string | null;
	s: string;
	c: number;
	p: number;
	pnl: number;
	price?: number | null;
	side: "long" | "short";
	stale?: boolean;
	avatar?: string | null;
}

export interface SceneClosed {
	s: string;
	side: "long" | "short";
	pnl: number;
	p: number;
	reason?: string | null;
	avatar?: string | null;
	tradeDate: string;
}

export interface SceneRow {
	portfolioId: string;
	label?: string;
	model?: string | null;
	avatarUrl?: string | null;
	color?: string | null;
	rank: number;
	equity: number;
	liquidity: number;
	invested: number;
	realized: number;
	unrealized: number;
	profitPct: number;
	profitPctFromStart: number;
	openCount: number;
	closedCount: number;
	wins: number;
	losses: number;
	positions: ScenePosition[];
	closed: SceneClosed[];
}

export interface SceneFrame {
	tradeDate: string;
	rows: SceneRow[];
}

export interface Scene {
	version?: string;
	source?: string;
	chart: {
		title: string;
		description?: string | null;
		layout: "capital" | "pnl";
		labels: "logo" | "full";
		avatarRadius: number;
		zeroAxis: boolean;
		stepEvery?: number;
		showDate: boolean;
		loop: boolean;
		assetIconSize: number;
		valueDisplay?: "capital" | "amount" | "profit" | "both" | null;
	};
	view: { metric: "equity" | "profitPct" | "profitPctFromStart"; speed: number; frameMs: number };
	range: { from: string; to: string; stepHours: number; intervalHours: number };
	portfolios: SceneEntry[];
	frames: SceneFrame[];
}

/** Edición por defecto cuando un componente se usa sin `edition`. */
export const DEFAULT_EDITION = "2026-dots3-note-preview-champion";

const cache = new Map<string, Scene>();

/**
 * Carpeta pública de la escena: `benchmark/` para las ediciones del Benchmark,
 * `research/` para los experimentos publicados en el blog (misma forma de
 * fichero, generado por tredops-research a partir de un Portfolio Compare).
 */
export type SceneDir = "benchmark" | "research";

/** Ruta pública de la escena, tal y como la descarga el navegador. */
export function sceneUrl(edition: string, base: string, dir: SceneDir = "benchmark"): string {
	return `${base.endsWith("/") ? base : `${base}/`}${dir}/${edition}.json`;
}

/**
 * Lee una escena en tiempo de build. Solo para el frontmatter de los
 * componentes `.astro`: en cliente se usa `fetch(sceneUrl(...))`.
 */
export function loadScene(edition: string = DEFAULT_EDITION, dir: SceneDir = "benchmark"): Scene {
	const key = `${dir}/${edition}`;
	const cached = cache.get(key);
	if (cached) return cached;
	if (!/^[a-z0-9][a-z0-9-]*$/.test(edition)) {
		throw new Error(`Edición de benchmark no válida: "${edition}"`);
	}
	const file = resolve(process.cwd(), "public", dir, `${edition}.json`);
	let raw: string;
	try {
		raw = readFileSync(file, "utf8");
	} catch {
		throw new Error(
			`No existe la escena del benchmark "${edition}" (${file}). ` +
				`Genérala con: npm run benchmark:build -- <export.json> ${edition}`,
		);
	}
	const scene = JSON.parse(raw) as Scene;
	cache.set(key, scene);
	return scene;
}
