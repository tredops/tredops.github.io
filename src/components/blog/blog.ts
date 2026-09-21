// Helpers del blog compartidos por las rutas EN/ES y el RSS.
//
// El idioma de un post lo decide su carpeta: `src/content/blog/<slug>.mdx` es
// inglés y `src/content/blog/es/<slug>.mdx` español. Así un post existe en un
// idioma sin obligar a traducirlo, y el índice de cada idioma solo lista los
// suyos.
import { getCollection, type CollectionEntry } from "astro:content";

export type Lang = "en" | "es";
export type Post = CollectionEntry<"blog">;

export function langOf(post: Post): Lang {
	return post.id.startsWith("es/") ? "es" : "en";
}

/** Slug sin el prefijo de idioma: la parte de la URL después de `/blog/`. */
export function slugOf(post: Post): string {
	return post.id.replace(/^es\//, "");
}

/** Posts publicados de un idioma, del más reciente al más antiguo. */
export async function listPosts(lang: Lang): Promise<Post[]> {
	const all = await getCollection("blog");
	return all
		.filter((p) => langOf(p) === lang && !p.data.draft)
		.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

/** Ruta pública del post (`base` = import.meta.env.BASE_URL). */
export function postHref(post: Post, base: string): string {
	const b = base.endsWith("/") ? base : `${base}/`;
	return `${b}${langOf(post) === "es" ? "es/" : ""}blog/${slugOf(post)}/`;
}

export function blogHref(lang: Lang, base: string): string {
	const b = base.endsWith("/") ? base : `${base}/`;
	return `${b}${lang === "es" ? "es/" : ""}blog/`;
}

/** El mismo post en el otro idioma, si existe. */
export async function counterpart(post: Post): Promise<Post | null> {
	const other = langOf(post) === "es" ? "en" : "es";
	const slug = slugOf(post);
	const all = await getCollection("blog");
	return all.find((p) => langOf(p) === other && slugOf(p) === slug && !p.data.draft) ?? null;
}

export const T = {
	en: {
		title: "Blog",
		description: "Experiments on real data, platform updates and deep-dive guides.",
		intro: "Every post is an experiment you can inspect: same capital, same window, same rules — full methodology, prompts and trades included.",
		locale: "en-US",
		back: "← Back to the blog",
		by: "by",
		alsoIn: "También en español",
		readMore: "Read",
		rssTitle: "TredOps Blog",
		research: { window: "Window", agents: "agents", capital: "Capital", winner: "Winner" },
		notAdvice: "Paper trading on historical data. Past results do not guarantee future results. Nothing here is financial advice.",
	},
	es: {
		title: "Blog",
		description: "Experimentos con datos reales, novedades de la plataforma y guías avanzadas.",
		intro: "Cada post es un experimento que puedes inspeccionar: mismo capital, misma ventana, mismas reglas — con la metodología, los prompts y las operaciones completas.",
		locale: "es-ES",
		back: "← Volver al blog",
		by: "por",
		alsoIn: "Also in English",
		readMore: "Leer",
		rssTitle: "Blog de TredOps",
		research: { window: "Ventana", agents: "agentes", capital: "Capital", winner: "Ganador" },
		notAdvice: "Paper trading sobre datos históricos. Los resultados pasados no garantizan resultados futuros. Nada de esto es asesoramiento financiero.",
	},
} as const;
