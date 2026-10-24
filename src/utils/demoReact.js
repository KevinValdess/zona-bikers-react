/** Muestra automáticamente props y state para la demostración desde F12. */
export function registrarReact(tipo, componente, datos) {
  // Copia fija: la consola muestra los valores de este momento, no referencias vivas.
  console.log(`[React demo][${tipo}] ${componente}`, JSON.parse(JSON.stringify(datos)));
}
