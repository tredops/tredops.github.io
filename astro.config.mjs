// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import mdx from '@astrojs/mdx';

// El sitio se publica en el dominio propio `docs.tredops.com` (declarado en
// `public/CNAME`). El repo se llama `tredops.github.io` — sitio de organización
// de GitHub Pages —, así que `tredops.github.io` redirige aquí.
//
// `site` tiene que ser el dominio final, no el de GitHub: de él salen las URL
// canónicas y el sitemap, y apuntarlas al dominio que redirige le cuenta a
// Google que cada página vive en una URL que no es la suya.
//
// `base` no se deriva de `site`: hay que declararlo. Estas dos constantes son la
// única fuente de verdad del prefijo — `scripts/check-links.mjs` las lee de
// aquí, para que no puedan divergir.
const site = 'https://docs.tredops.com';
const base = '/';

// El sitio nació con el español en la raíz y el inglés bajo `/en/`. Al pasar el
// inglés a idioma por defecto, esas URL dejaron de existir: estas redirecciones
// mandan cada una a su equivalente en la raíz para no dejar enlaces muertos.
const enLegacyPaths = [
	'',
	'introduction',
	'concepts',
	'lifecycle',
	'getting-started',
	'guides/first-bot',
	'guides/bot-settings',
	'guides/first-agent',
	'guides/agent-tasks',
	'guides/playground',
	'guides/copy-trader',
	'guides/risk',
	'benchmark',
	'benchmark/methodology',
	'pillars/bots-ci',
	'pillars/monitoring',
	'pillars/agents',
	'pillars/integrations',
	'pricing',
	'security',
	'glossary',
	'faq',
];

const redirects = Object.fromEntries(
	enLegacyPaths.map((p) => [`/en/${p}`.replace(/\/$/, '') || '/en', `/${p}`]),
);

export default defineConfig({
	site,
	base,
	redirects,
	integrations: [
		starlight({
			title: 'TredOps',
			description: 'Official TredOps documentation, the algorithmic trading platform.',
			defaultLocale: 'root',
			locales: {
				root: { label: 'English', lang: 'en' },
				es: { label: 'Español', lang: 'es' },
			},
			// El logo se dibuja en src/components/SiteTitle.astro (marca inline +
			// wordmark «Tred» grueso / «Ops» fino), no con la opción `logo`.
			components: {
				SiteTitle: './src/components/SiteTitle.astro',
			},
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/tredops/tredops.github.io' },
				{ icon: 'x.com', label: 'X / Twitter', href: 'https://x.com/tredopsAI' },
			],
			editLink: { enabled: false },
			head: [
				{
					tag: 'link',
					attrs: {
						rel: 'preconnect',
						href: 'https://fonts.googleapis.com',
						crossorigin: undefined,
					},
				},
				{
					tag: 'link',
					attrs: { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
				},
				{
					tag: 'link',
					attrs: {
						rel: 'stylesheet',
						href: 'https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600&family=Geist+Mono:wght@400;500&family=Space+Grotesk:wght@300;400;500;600;700&display=swap',
					},
				},
			],
			customCss: ['./src/styles/custom.css'],
			sidebar: [
				{
					label: 'Introduction',
					translations: { es: 'Introducción' },
					items: [
						{ label: 'What is TredOps', translations: { es: 'Qué es TredOps' }, slug: 'introduction' },
						{ label: 'Key concepts', translations: { es: 'Conceptos clave' }, slug: 'concepts' },
						{ label: 'The TredOps loop', translations: { es: 'El ciclo de TredOps' }, slug: 'lifecycle' },
					],
				},
				{
					label: 'Getting started',
					translations: { es: 'Primeros pasos' },
					items: [
						{ label: 'Quick start', translations: { es: 'Guía rápida' }, slug: 'getting-started' },
						{ label: 'Your first bot', translations: { es: 'Tu primer bot' }, slug: 'guides/first-bot' },
						{ label: 'Bot settings explained', translations: { es: 'Opciones de un bot, explicadas' }, slug: 'guides/bot-settings' },
						{ label: 'Working with agents', translations: { es: 'Trabajar con agentes' }, slug: 'guides/first-agent' },
						{ label: 'Scheduling tasks (AgentTask)', translations: { es: 'Programar tareas (AgentTask)' }, slug: 'guides/agent-tasks' },
						{ label: 'Playground', translations: { es: 'Playground' }, slug: 'guides/playground' },
						{ label: 'Copy Trader Agent', translations: { es: 'Copy Trader Agent' }, slug: 'guides/copy-trader' },
						{ label: 'Managing risk', translations: { es: 'Gestionar el riesgo' }, slug: 'guides/risk' },
					],
				},
				{
					label: 'Benchmark',
					translations: { es: 'Benchmark' },
					items: [
						{ label: 'Editions', translations: { es: 'Ediciones' }, slug: 'benchmark' },
						{ label: 'Methodology', translations: { es: 'Metodología' }, slug: 'benchmark/methodology' },
						{
							label: 'Published',
							translations: { es: 'Publicaciones' },
							collapsed: true,
							items: [{ autogenerate: { directory: 'benchmark/editions' } }],
						},
					],
				},
				{
					label: 'Pillars',
					translations: { es: 'Pilares' },
					items: [
						{ label: 'Bots (CI)', translations: { es: 'Bots (CI)' }, slug: 'pillars/bots-ci' },
						{ label: 'Monitoring', translations: { es: 'Monitoring' }, slug: 'pillars/monitoring' },
						{ label: 'AI Agents', translations: { es: 'Agentes IA' }, slug: 'pillars/agents' },
						{ label: 'Integrations', translations: { es: 'Integraciones' }, slug: 'pillars/integrations' },
					],
				},
				{
					label: 'Blog',
					translations: { es: 'Blog' },
					items: [
						{ label: 'Experiments & updates', translations: { es: 'Experimentos y novedades' }, link: '/blog/' },
					],
				},
				{
					label: 'Reference',
					translations: { es: 'Referencia' },
					items: [
						{ label: 'Plans & pricing', translations: { es: 'Planes y precios' }, slug: 'pricing' },
						{ label: 'Security', translations: { es: 'Seguridad' }, slug: 'security' },
						{ label: 'Glossary', translations: { es: 'Glosario' }, slug: 'glossary' },
						{ label: 'FAQ', translations: { es: 'FAQ' }, slug: 'faq' },
					],
				},
			],
		}),
	],
});