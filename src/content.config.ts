import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

/**
 * Frontmatter extra de una edición del Benchmark.
 *
 * Las ediciones son entradas de la colección `docs` (para que hereden la
 * navegación y el buscador de Starlight) pero se listan como un blog: el
 * índice de la sección las ordena por `pubDate` y pinta una tarjeta con el
 * ganador y la ventana analizada. Publicar una edición nueva es añadir un
 * `.mdx` con este bloque; no hay que tocar ni el índice ni la configuración.
 */
const benchmarkEdition = z.object({
	/** Identificador de la escena en `public/benchmark/<edition>.json`. */
	edition: z.string(),
	/** Fecha de publicación: ordena el listado, de más reciente a más antigua. */
	pubDate: z.coerce.date(),
	/** Ventana analizada, tal y como se muestra en la tarjeta. */
	window: z.string(),
	/** Ganador de la edición y su resultado, p. ej. "Dots 3 · +17,10 %". */
	winner: z.string(),
	/** Número de participantes. */
	agents: z.number().int().positive(),
	/** Imagen de cabecera, relativa a `src/assets/benchmark/`. */
	hero: z.string().optional(),
	/** Etiquetas del segmento analizado: ETFs, crypto, acciones… */
	tags: z.array(z.string()).default([]),
	/** Marca la edición como borrador: no aparece en el listado. */
	draft: z.boolean().default(false),
});

export type BenchmarkEdition = z.infer<typeof benchmarkEdition>;

/**
 * Bloque `research:` de un post del blog que publica un experimento: la
 * tarjeta del índice muestra la ventana, el ganador y el capital, y el post
 * incrusta la escena de `public/research/<slug>.json` y la metodología de
 * `public/research/<slug>/methodology.json` (ambos generados por
 * tredops-research).
 */
const researchExperiment = z.object({
	slug: z.string(),
	benchmarkName: z.string().optional(),
	window: z.string().optional(),
	agents: z.number().int().positive().optional(),
	capital: z.number().positive().optional(),
	winner: z.string().optional(),
});

/**
 * Blog: `src/content/blog/<slug>.mdx` (inglés) y `src/content/blog/es/<slug>.mdx`
 * (español). El idioma lo decide la carpeta; `lang` en el frontmatter queda
 * como redundancia legible. Las rutas viven en `src/pages/blog` y
 * `src/pages/es/blog`.
 */
const blog = defineCollection({
	loader: glob({ pattern: '**/*.mdx', base: './src/content/blog' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		lang: z.enum(['es', 'en']).default('en'),
		author: z.string().default('TredOps'),
		tags: z.array(z.string()).default([]),
		/** Imagen de cabecera y tarjeta social, ruta pública absoluta (p. ej. `/research/<slug>/og.png`). */
		ogImage: z.string().optional(),
		heroImage: z.string().optional(),
		/** Borrador: se construye pero no aparece en el índice ni en el RSS. */
		draft: z.boolean().default(false),
		research: researchExperiment.optional(),
	}),
});

export const collections = {
	docs: defineCollection({
		loader: docsLoader(),
		schema: docsSchema({
			extend: z.object({
				benchmark: benchmarkEdition.optional(),
			}),
		}),
	}),
	blog,
};
