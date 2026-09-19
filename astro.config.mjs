// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import mdx from '@astrojs/mdx';

// Sitio de organización de GitHub Pages: el repo se llama `tredops.github.io`,
// así que se sirve en la raíz del dominio y no bajo un subpath.
//
// `base` no se deriva de `site`: hay que declararlo. Estas dos constantes son la
// única fuente de verdad del prefijo — `scripts/check-links.mjs` las lee de
// aquí, para que no puedan divergir.
//
// FASE DNS (pendiente): cambiar `site` a 'https://docs.tredops.com' y subir
// `public/CNAME` con ese dominio. `base` ya no hay que tocarlo.
const site = 'https://tredops.github.io';
const base = '/';

export default defineConfig({
	site,
	base,
	integrations: [
		starlight({
			title: 'TredOps',
			description: 'Documentación oficial de TredOps, la plataforma de trading algorítmico.',
			defaultLocale: 'root',
			locales: {
				root: { label: 'Español', lang: 'es' },
				en: { label: 'English', lang: 'en' },
			},
			// El logo se dibuja en src/components/SiteTitle.astro (marca inline +
			// wordmark «Tred» grueso / «Ops» fino), no con la opción `logo`.
			components: {
				SiteTitle: './src/components/SiteTitle.astro',
			},
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/tredops/tredops.github.io' },
				{ icon: 'x.com', label: 'X / Twitter', href: 'https://x.com/tredops' },
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
					label: 'Introducción',
					translations: { en: 'Introduction' },
					items: [
						{ label: 'Qué es TredOps', translations: { en: 'What is TredOps' }, slug: 'introduction' },
						{ label: 'Conceptos clave', translations: { en: 'Key concepts' }, slug: 'concepts' },
					],
				},
				{
					label: 'Primeros pasos',
					translations: { en: 'Getting started' },
					items: [
						{ label: 'Guía rápida', translations: { en: 'Quick start' }, slug: 'getting-started' },
						{ label: 'Tu primer bot', translations: { en: 'Your first bot' }, slug: 'guides/first-bot' },
						{ label: 'Trabajar con agentes', translations: { en: 'Working with agents' }, slug: 'guides/first-agent' },
						{ label: 'Programar tareas (AgentTask)', translations: { en: 'Scheduling tasks (AgentTask)' }, slug: 'guides/agent-tasks' },
						{ label: 'Gestionar el riesgo', translations: { en: 'Managing risk' }, slug: 'guides/risk' },
					],
				},
				{
					label: 'Benchmark',
					translations: { en: 'Benchmark' },
					items: [
						{ label: 'Ediciones', translations: { en: 'Editions' }, slug: 'benchmark' },
						{ label: 'Metodología', translations: { en: 'Methodology' }, slug: 'benchmark/methodology' },
						{
							label: 'Publicaciones',
							translations: { en: 'Published' },
							collapsed: true,
							items: [{ autogenerate: { directory: 'benchmark/editions' } }],
						},
					],
				},
				{
					label: 'Pilares',
					translations: { en: 'Pillars' },
					items: [
						{ label: 'Bots (CI)', translations: { en: 'Bots (CI)' }, slug: 'pillars/bots-ci' },
						{ label: 'Monitoring', translations: { en: 'Monitoring' }, slug: 'pillars/monitoring' },
						{ label: 'Agentes IA', translations: { en: 'AI Agents' }, slug: 'pillars/agents' },
						{ label: 'Integraciones', translations: { en: 'Integrations' }, slug: 'pillars/integrations' },
					],
				},
				{
					label: 'Referencia',
					translations: { en: 'Reference' },
					items: [
						{ label: 'Planes y precios', translations: { en: 'Plans & pricing' }, slug: 'pricing' },
						{ label: 'Seguridad', translations: { en: 'Security' }, slug: 'security' },
						{ label: 'Glosario', translations: { en: 'Glossary' }, slug: 'glossary' },
						{ label: 'FAQ', translations: { en: 'FAQ' }, slug: 'faq' },
					],
				},
			],
		}),
	],
});