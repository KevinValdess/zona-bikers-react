import { readFile, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { chromium } from 'playwright';

const require = createRequire(import.meta.url);
const leer = async ruta => JSON.parse(await readFile(ruta, 'utf8'));
const frontend = await leer('docs/resultados-vitest-chromium.json');
const coberturaFrontend = await leer('coverage/frontend/coverage-summary.json');
const originales = await leer('docs/casos-originales.json');
const casos = informe => informe.testResults.flatMap(archivo => archivo.assertionResults);
const normalizar = nombre => nombre.replace('Karma + Jasmine', 'Vitest + Chromium').replace(/\s+/g, ' ').trim();

for (const informe of [frontend]) {
  if (!informe.success || informe.numFailedTests || informe.numPendingTests || informe.numTodoTests
      || casos(informe).some(caso => caso.status !== 'passed')) {
    throw new Error('No se genera documentación de éxito con casos fallidos u omitidos.');
  }
}

function comprobarConservacion(anteriores, actuales) {
  const disponibles = actuales.map(caso => normalizar(caso.fullName));
  for (const nombre of anteriores) {
    const indice = disponibles.indexOf(normalizar(nombre));
    if (indice < 0) throw new Error(`Falta un caso original: ${nombre}`);
    disponibles.splice(indice, 1);
  }
  return anteriores.length;
}

const conservados = {
  frontend: comprobarConservacion(originales.frontend, casos(frontend)),
};
const browser = await chromium.launch({ headless: true });
let versionChromium;
try { versionChromium = browser.version(); }
finally { await browser.close(); }

const metadata = {
  fechaUTC: new Date(Math.max(...[frontend].flatMap(r => r.testResults.map(a => a.endTime)))).toISOString(),
  zonaHoraria: 'America/Santiago',
  herramienta: 'Vitest',
  versiones: {
    vitest: require('vitest/package.json').version,
    playwright: require('playwright/package.json').version,
    node: process.version,
    chromium: versionChromium,
  },
  entorno: { frontend: 'Chromium headless de Playwright' },
  casos: { frontend: frontend.numPassedTests },
  casosOriginalesConservados: conservados,
  cobertura: { frontend: coberturaFrontend.total },
};
await writeFile('docs/resultados-migracion.json', `${JSON.stringify(metadata, null, 2)}\n`);

const fecha = new Intl.DateTimeFormat('es-CL', {
  dateStyle: 'long', timeStyle: 'short', timeZone: metadata.zonaHoraria,
}).format(new Date(metadata.fechaUTC));
const tablaCobertura = total => [
  '| Métrica | Cobertura | Cubierto / total |',
  '|---|---|---|',
  ...[['Sentencias', 'statements'], ['Ramas', 'branches'], ['Funciones', 'functions'], ['Líneas', 'lines']]
    .map(([etiqueta, clave]) => `| ${etiqueta} | ${total[clave].pct}% | ${total[clave].covered} / ${total[clave].total} |`),
].join('\n');
const fila = texto => texto.replace(/\|/g, '\\|').replace(/\r?\n/g, ' ');
const listar = (informe, prefijo) => [
  '| ID | Caso ejecutado | Resultado |', '|---|---|---|',
  ...casos(informe).map((caso, i) => `| ${prefijo}-${String(i + 1).padStart(3, '0')} | ${fila(caso.fullName)} | Pasó |`),
].join('\n');

await writeFile('docs/RESULTADOS.md', `# Resultados de Vitest con Chromium

Generado por \`npm test\`. Última ejecución: ${fecha} (America/Santiago).

## Entorno y resultado

- Vitest ${metadata.versiones.vitest}, Playwright ${metadata.versiones.playwright}, Node ${metadata.versiones.node}.
- Frontend: **${frontend.numPassedTests}/${frontend.numTotalTests} casos pasaron** en **Chromium ${versionChromium} headless**. No se usa Edge, Chrome instalado ni jsdom.
- Se conservaron los ${conservados.frontend} casos originales del frontend. Se verifica su identidad contra \`casos-originales.json\`; solo se renombra el grupo inicial Karma + Jasmine a Vitest + Chromium.
- Sin casos omitidos ni pendientes. Un caso frontend verifica la configuración; los otros cubren comportamiento de la aplicación.

## Cobertura del frontend

${tablaCobertura(coberturaFrontend.total)}

Informe HTML: [frontend](../coverage/frontend/index.html). Umbrales mantenidos: 90% de sentencias, funciones y líneas; 85% de ramas. Si no se alcanzan, la prueba falla. [Alcance y análisis](COBERTURA.md).

## Evidencia verificable

- [Resultados frontend](resultados-vitest-chromium.json): salida JSON de Vitest con cada caso y su estado.
- [Metadatos de ejecución](resultados-migracion.json): versiones, navegador, cantidades y cobertura.

## Casos del frontend

${listar(frontend, 'FE')}
`);

await writeFile('docs/COBERTURA.md', `# Cobertura de testing

Ejecución: ${fecha} (America/Santiago). Herramientas: Vitest ${metadata.versiones.vitest}, proveedor de navegador Playwright y cobertura V8. Los resultados proceden de los mismos casos que se ejecutan con \`npm test\`.

## Frontend en Chromium

${tablaCobertura(coberturaFrontend.total)}

El alcance incluye los archivos JS y JSX de \`src/\`, también los no importados por la suite. Se excluyen las pruebas, \`src/test/\` y \`src/main.jsx\` (arranque). No se miden CSS, SVG, JSON, dependencias, servicios externos ni una auditoría visual. Los informes HTML y LCOV se regeneran en \`coverage/frontend/\`.

Se comprueban renderizado, props, estado, DOM, eventos, navegación, permisos, formularios, CRUD, stock y persistencia. Los mocks de fetch evitan usar redes externas; los de Storage y diálogos reproducen fallos y confirmaciones. Los umbrales globales de 90/85/90/90 se mantienen, no se rebajan para hacer pasar la migración.

El checkout se verifica con validaciones, autocompletado, entrega, totales, aprobación, rechazo, persistencia, reintentos y carrito vacío. También se prueban categorías públicas, búsqueda combinada, ofertas administrables, compatibilidad con datos antiguos y precio consistente desde catálogo hasta pedido recargado. Quedan rutas de error y alternativas sin ejecutar: revisar el informe HTML. La cobertura no demuestra ausencia de errores. El proveedor V8 y sus mapas de código pueden producir denominadores distintos a los informes históricos de Istanbul; usar las cifras actuales, sin interpretar esa diferencia como nuevos casos.

## Reproducir

\`\`\`powershell
npm ci
npm run test:browser:install
npm test
\`\`\`

\`npm test\` ejecuta la suite del navegador, genera JSON/HTML/LCOV y actualiza este documento, \`RESULTADOS.md\` y \`resultados-migracion.json\`. El generador falla si hay casos fallidos/omitidos o falta un caso original.
`);
console.log(`Resultados actualizados: ${frontend.numPassedTests} casos en Chromium ${versionChromium}; todos los casos originales conservados.`);
