# tredops.github.io

Documentación pública de TredOps: **https://tredops.github.io/**

Sitio estático con [Astro](https://astro.build) y
[Starlight](https://starlight.astro.build), en español e inglés. El repositorio
se llama `tredops.github.io` porque es el **sitio de organización** de GitHub
Pages: ese nombre exacto es lo que hace que se sirva en la raíz del dominio y no
bajo un subpath.

> **Repositorio público.** Todo lo que entre en `dist/` es visible para
> cualquiera. No hay secretos, ni credenciales, ni detalles de infraestructura
> interna: ver [Qué no se publica](#qué-no-se-publica).

## Desarrollo

> **Usa npm 10** (el que trae Node 22). npm 11.6.2 escribe un
> `package-lock.json` que su propio `npm ci` rechaza —omite las entradas
> anidadas de `@emnapi/*` que arrastra el `satteri-wasm32-wasi` de Astro— y eso
> rompe la CI. Si tienes npm 11, regenera el lock con
> `npx npm@10 install --package-lock-only`.

```bash
npm ci
npm run dev        # http://localhost:4321/
npm run build      # genera dist/
npm run preview    # sirve dist/
npm run check      # build + enlaces internos + revisión de datos internos
```

> **El buscador no funciona con `npm run dev`, y es lo esperado.** El índice lo
> genera Pagefind durante `astro build`, así que en el servidor de desarrollo
> `/pagefind/` no existe y la búsqueda no devuelve nada. Para probarla:
> `npm run build && npm run preview`.

## Estructura

```
src/
├── content/
│   ├── docs/                 # documentación (Starlight)
│   │   ├── *.md              # español (locale raíz)
│   │   ├── guides/           # guías de uso paso a paso
│   │   ├── pillars/          # los cuatro pilares de la plataforma
│   │   ├── benchmark/
│   │   │   ├── index.mdx     # listado de ediciones (formato blog)
│   │   │   ├── methodology.mdx
│   │   │   └── editions/     # una publicación por edición
│   │   └── en/               # espejo en inglés, misma jerarquía
│   └── blog/                 # novedades y anuncios
├── components/
│   ├── SiteTitle.astro       # logo: marca inline + wordmark Tred/Ops
│   └── benchmark/            # gráfico de carrera, resumen y detalle por agente
├── styles/custom.css         # tema (paleta del dashboard)
└── assets/                   # imágenes y marca

public/
└── benchmark/<edición>.json  # escenas del gráfico, servidas como estáticos
```

## Publicar una edición del Benchmark

La sección Benchmark funciona como un blog: cada edición es una publicación
cerrada con su propia ventana, sus participantes y sus resultados. El índice se
genera solo a partir del frontmatter, así que publicar una edición nueva es
crear un fichero.

**1. Genera la escena** a partir del export del dashboard:

```bash
npm run benchmark:build -- ~/Descargas/benchmark_animation.json 2026-q4-crypto-agents
```

El script filtra el export y escribe
`public/benchmark/2026-q4-crypto-agents.json`. Solo copia los campos de la lista
blanca: lo que no esté ahí no llega al sitio público.

**2. Crea la publicación** en `src/content/docs/benchmark/editions/<edición>.mdx`
(y su espejo en `en/`):

```mdx
---
title: "2026 Q4 Crypto Agents"
description: "Ocho sub-agentes sobre cripto durante un mes."
benchmark:
  edition: 2026-q4-crypto-agents   # nombre del JSON en public/benchmark/
  pubDate: 2026-11-02
  window: 1 oct 2026 → 31 oct 2026
  winner: Dots 3 · +12,40 %
  agents: 8
  hero: 2026-q4-crypto-agents.jpg  # opcional, en src/assets/benchmark/
  tags: [Crypto, LLM]
---

import BenchmarkRace from '../../../../components/benchmark/BenchmarkRace.astro';
import BenchmarkSummary from '../../../../components/benchmark/BenchmarkSummary.astro';
import BenchmarkAgentDetails from '../../../../components/benchmark/BenchmarkAgentDetails.astro';

<BenchmarkRace edition="2026-q4-crypto-agents" lang="es" />
<BenchmarkSummary edition="2026-q4-crypto-agents" lang="es" />
<BenchmarkAgentDetails edition="2026-q4-crypto-agents" lang="es" />
```

**3. Comprueba y sube:**

```bash
npm run check
```

El índice de `/benchmark/`, la barra lateral y la tarjeta de "otras ediciones"
se actualizan solos. Una edición con `draft: true` no aparece en el listado.

### El gráfico

`BenchmarkRace.astro` es un port en JS plano del componente React de la landing
(`tredops-landing-page/components/benchmark/benchmark-race.tsx`). Comparte su
geometría exacta — `ROW_H`, anchos de columnas y la aritmética del eje cero — y
la referencia manda: si algo se ve distinto, lo que hay que ajustar es el port.

Dos decisiones que conviene no deshacer:

- **La carrera avanza como mucho un frame por tick.** Ponerse al día saltando
  frames es lo que producía saltos: las barras se teletransportaban por encima de
  una transición que no podía seguirlas. Si el navegador no da abasto, la carrera
  va más despacio.
- **Los segmentos entran y salen desde 0 % de ancho.** Un segmento nuevo pintado
  ya a su ancho final mientras sus hermanos interpolan hace que la suma pase de
  100 % y el `overflow: hidden` recorte el trozo de cash.

La escena se descarga por `fetch` cuando el gráfico se acerca al viewport, no se
empaqueta en el bundle: el JS del gráfico son ~12 KB y el JSON (>1 MB) solo lo
paga quien baja hasta él.

## Qué no se publica

`npm run check:public` falla el build si encuentra en `dist/` IPs privadas,
cadenas de conexión, rutas de la máquina de desarrollo, claves, tokens o JWTs.
Corre también en cada pull request.

Además, por criterio editorial esta documentación **no** describe:

- Nombres de repositorios y servicios internos, puertos o topología de red.
- Modelos de datos, nombres de colecciones o campos internos.
- Detalles de implementación criptográfica más allá de "cifrado AES-256".

Si una explicación necesita alguno de esos datos, es que está escrita para el
equipo y no para el usuario.

## Despliegue

`.github/workflows/deploy.yml`:

- **Pull request** → build + comprobación de enlaces + comprobación de datos
  internos. No despliega.
- **Push a `main`** → lo anterior y despliegue a GitHub Pages.

No usa ningún secreto del repositorio.

### Cambiar a docs.tredops.com

Cuando el DNS esté listo, en `astro.config.mjs` basta con:

```js
const site = 'https://docs.tredops.com';
```

y añadir `public/CNAME` con `docs.tredops.com`. `base` ya es `/` y no hay que
tocarlo; `scripts/check-links.mjs` lee esas constantes del propio
`astro.config.mjs`, así que tampoco hay una segunda copia que actualizar.
