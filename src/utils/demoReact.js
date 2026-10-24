/** Activa la evidencia de React con ?demoReact=1 antes del # de la URL. */
export function registrarReact(tipo, componente, datos) {
  if (new URLSearchParams(window.location.search).get('demoReact') !== '1') return;
  // Copia fija: la consola muestra los valores de este momento, no referencias vivas.
  console.log(`[React demo][${tipo}] ${componente}`, JSON.parse(JSON.stringify(datos)));
}
