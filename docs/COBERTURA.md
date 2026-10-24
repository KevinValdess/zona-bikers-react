# Cobertura de pruebas

La suite mide JS y JSX de `src/`, excluyendo pruebas, `src/test/` y `src/main.jsx`. No mide CSS, SVG, JSON ni una auditoría visual.

Umbrales: 90% de sentencias, funciones y líneas; 85% de ramas. `npm test` genera las cifras actuales y el informe HTML en `coverage/frontend/`.

En GitHub Actions, descargar `cobertura-y-resultados` para consultar el informe de esa ejecución.
