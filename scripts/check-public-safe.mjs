// Red de seguridad del despliegue público.
//
// Esta documentación se publica en GitHub Pages desde un repositorio público:
// todo lo que entra en `dist/` es visible para cualquiera. Buena parte del
// contenido viene de notas internas (Outline, exports del dashboard), así que
// el riesgo real no es un bug, es un copia-pega.
//
// Este script falla el build si encuentra en `dist/` algo que no debería salir
// de la red interna: IPs privadas, cadenas de conexión, rutas de la máquina de
// desarrollo, claves o tokens.
//
// Uso: node scripts/check-public-safe.mjs
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const DIST = "dist";

const RULES = [
  { name: "IP privada", re: /\b(?:10\.\d{1,3}|192\.168|172\.(?:1[6-9]|2\d|3[01]))\.\d{1,3}\.\d{1,3}\b/g },
  { name: "host de desarrollo", re: /\b(?:localhost|127\.0\.0\.1|0\.0\.0\.0):\d{2,5}\b/g },
  { name: "cadena de conexión", re: /\b(?:mongodb(?:\+srv)?|redis|postgres(?:ql)?|mysql|amqp):\/\/[^\s"'<)]+/g },
  { name: "ruta de la máquina local", re: /\/(?:Users|home)\/[a-zA-Z0-9._-]+\//g },
  { name: "variable de entorno con secreto", re: /\b[A-Z][A-Z0-9_]*(?:SECRET|PASSWORD|PRIVATE_KEY|API_KEY|ACCESS_KEY)\s*[=:]\s*\S+/g },
  { name: "clave de API", re: /\b(?:sk-[A-Za-z0-9_-]{20,}|tredops_[A-Za-z0-9]{16,}|AKIA[0-9A-Z]{16}|ghp_[A-Za-z0-9]{30,})\b/g },
  { name: "clave privada", re: /-----BEGIN (?:RSA |EC |OPENSSH |PGP )?PRIVATE KEY-----/g },
  { name: "JWT", re: /\beyJ[A-Za-z0-9_-]{10,}\.eyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\b/g },
];

/** Extensiones que se inspeccionan: lo demás son binarios (imágenes, fuentes). */
const TEXT = /\.(html|js|mjs|css|json|xml|txt|svg|map)$/i;

/**
 * Excepciones conocidas. Cada una necesita un motivo: si una entrada nueva no
 * se puede justificar en una línea, probablemente sea un hallazgo real.
 */
const ALLOW = [
  // El buscador de Starlight indexa el texto de la documentación, incluidos los
  // ejemplos de la propia guía.
  { file: /^pagefind\//, rule: /.*/ },
];

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
  files = walk(DIST).filter((f) => TEXT.test(f));
} catch {
  console.error(`No existe ${DIST}/. Ejecuta primero: npm run build`);
  process.exit(1);
}

const findings = [];
for (const f of files) {
  const rel = relative(DIST, f).split(/[\\/]/).join("/");
  const text = readFileSync(f, "utf8");
  for (const { name, re } of RULES) {
    for (const [match] of text.matchAll(re)) {
      if (ALLOW.some((a) => a.file.test(rel) && a.rule.test(name))) continue;
      findings.push({ rel, name, match: match.slice(0, 120) });
    }
  }
}

if (findings.length === 0) {
  console.log(`✓ sin datos internos en dist/ (${files.length} ficheros revisados)`);
  process.exit(0);
}

console.error(`✗ ${findings.length} posibles datos internos en dist/:`);
for (const f of findings.slice(0, 40)) console.error(`  [${f.name}] ${f.rel}: ${f.match}`);
if (findings.length > 40) console.error(`  … y ${findings.length - 40} más`);
console.error("\nQuita el dato del contenido, o añade una excepción justificada en scripts/check-public-safe.mjs.");
process.exit(1);
