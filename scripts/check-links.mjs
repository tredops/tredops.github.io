// Comprueba que ningún enlace interno de `dist/` apunta a una página que no se
// ha generado. Es el fallo más fácil de introducir en esta documentación: las
// URLs terminan en barra, así que un enlace relativo escrito como si la página
// fuese un fichero (`concepts/` en vez de `../concepts/`) se cuelga un nivel de
// más y solo se nota al hacer clic.
//
// Uso: node scripts/check-links.mjs
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, posix } from "node:path";

const DIST = "dist";

/**
 * Prefijo de despliegue que llevan las URLs absolutas del HTML. Se lee del
 * propio `astro.config.mjs` en vez de repetirlo aquí: cuando el sitio pasó del
 * subpath `/tredops-doc/` a la raíz, una copia desactualizada habría dado por
 * buenos todos los enlaces rotos.
 */
function readBase() {
  const config = readFileSync("astro.config.mjs", "utf8");
  const match = config.match(/^const base = ['"]([^'"]*)['"]/m);
  if (!match) throw new Error("No se encontró `const base = ...` en astro.config.mjs");
  return match[1].replace(/\/+$/, ""); // "/" -> "", "/tredops-doc/" -> "/tredops-doc"
}

const BASE = readBase();

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

let files;
try {
  files = walk(DIST);
} catch {
  console.error(`No existe ${DIST}/. Ejecuta primero: npm run build`);
  process.exit(1);
}

const pages = new Set();
for (const f of files) {
  const url = "/" + relative(DIST, f).split(/[\\/]/).join("/");
  pages.add(url);
  if (url.endsWith("/index.html")) pages.add(url.slice(0, -"index.html".length));
}

const SKIP = /^(https?:|mailto:|tel:|javascript:|data:|#)/;
const broken = new Map();

for (const f of files.filter((f) => f.endsWith(".html"))) {
  const src = "/" + relative(DIST, f).split(/[\\/]/).join("/");
  const dir = posix.dirname(src);
  const html = readFileSync(f, "utf8");
  for (const [, href] of html.matchAll(/href="([^"]+)"/g)) {
    if (SKIP.test(href)) continue;
    const path = href.split(/[?#]/)[0];
    if (!path) continue;
    let target = posix.normalize(path.startsWith("/") ? path : posix.join(dir, path));
    if (BASE && target.startsWith(BASE)) target = target.slice(BASE.length) || "/";
    const bare = target.endsWith("/") ? target.slice(0, -1) : target;
    if (pages.has(target) || pages.has(`${bare}/`) || pages.has(`${bare}/index.html`)) continue;
    const key = `${src} -> ${href}`;
    if (!broken.has(key)) broken.set(key, true);
  }
}

if (broken.size === 0) {
  console.log(`✓ enlaces internos correctos (${files.filter((f) => f.endsWith(".html")).length} páginas)`);
  process.exit(0);
}

console.error(`✗ ${broken.size} enlaces internos rotos:`);
for (const key of broken.keys()) console.error(`  ${key}`);
process.exit(1);
