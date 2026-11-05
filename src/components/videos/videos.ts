// Catálogo de vídeos del canal de YouTube de TredOps (https://www.youtube.com/@TredOps).
//
// Es una lista a mano a propósito: el sitio es estático y solo se reconstruye al
// hacer push, así que leer el feed en el build no lo mantendría al día y añadiría
// una dependencia de red al build. Al subir un vídeo nuevo se añade aquí.
//
// Para sacar el id, el título y la fecha de un vídeo nuevo:
//   curl -s "https://www.youtube.com/feeds/videos.xml?channel_id=UCvDIDyb2Wv-DOTiy1DPUymg"
//
// Un vídeo con `course` aparece además como lección del curso, ordenado por
// `lesson`.

export const CHANNEL_URL = "https://www.youtube.com/@TredOps";
export const CHANNEL_SUBSCRIBE_URL = `${CHANNEL_URL}?sub_confirmation=1`;

export type Lang = "en" | "es";
export type Topic = "tutorial" | "overview" | "benchmark";

export interface Video {
	id: string;
	title: string;
	/** Resumen de una o dos frases, en el idioma del vídeo. */
	summary: string;
	/** Idioma hablado en el vídeo. */
	lang: Lang;
	/** Fecha de publicación (ISO). */
	published: string;
	topic: Topic;
	/** Vídeo vertical (YouTube Short). */
	short?: boolean;
	/** Posición dentro del curso «Getting started». */
	lesson?: number;
	/** Página de la doc que amplía el vídeo (sin prefijo de idioma). */
	docs?: string;
}

export const VIDEOS: Video[] = [
	{
		id: "nOzRj8vIceg",
		title: "Discover AI-powered trading with TredOps!",
		summary:
			"Create your account, set up a medium-risk Express portfolio with $5,000 of virtual capital, turn on push notifications, connect Telegram and link an AI trading agent — all on paper trading.",
		lang: "en",
		published: "2026-10-14",
		topic: "tutorial",
		lesson: 1,
		docs: "getting-started/",
	},
	{
		id: "dVVdPwwUAEk",
		title: "Master Geopolitical Trading with AI Agents",
		summary:
			"Use the trade-setup skill in the TredOps chat: one prompt makes your agent scan global news, weigh geopolitical flashpoints and propose GLD and XOM setups with entry, size, Stop Loss and Take Profit.",
		lang: "en",
		published: "2026-11-05",
		topic: "tutorial",
		lesson: 2,
		docs: "features/trade-setups/",
	},
	{
		id: "zTHZAFEVZTQ",
		title: "Can AI Beat Buying Crypto? 36 Days, 9 Agents, 1 Winner",
		summary:
			"The basket won (+19.4%), but the best agent made +12.5% with half the drawdown and a total LLM bill of $1.63. Same model, two prompts: +6% vs +12%.",
		lang: "en",
		published: "2026-10-08",
		topic: "benchmark",
		short: true,
		docs: "benchmark/editions/2026-agents-vs-crypto/",
	},
	{
		id: "Y6E5NFpKQAI",
		title: "Trading + DevOps: How TredOps Automates Strategy",
		summary:
			"The full platform loop: quantitative bots generate signals, AI agents decide with your portfolio's context, and mandatory risk controls protect your capital.",
		lang: "en",
		published: "2026-10-03",
		topic: "overview",
		docs: "lifecycle/",
	},
	{
		id: "QdK5WOcN4zA",
		title: "Cómo automatizar tu Trading con Bots AI",
		summary:
			"El flujo completo de la plataforma: los bots generan señales, los agentes de IA deciden con el contexto de tu portfolio y el control de riesgo protege tu capital.",
		lang: "es",
		published: "2026-10-03",
		topic: "overview",
		docs: "lifecycle/",
	},
];

export const COURSE = VIDEOS.filter((v) => v.lesson !== undefined).sort(
	(a, b) => (a.lesson ?? 0) - (b.lesson ?? 0),
);

/** Todos los vídeos, del más reciente al más antiguo. */
export const LATEST = [...VIDEOS].sort((a, b) => b.published.localeCompare(a.published));

export const thumb = (id: string) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
export const watchUrl = (id: string) => `https://www.youtube.com/watch?v=${id}`;
