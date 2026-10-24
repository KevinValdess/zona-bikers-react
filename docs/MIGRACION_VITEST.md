# Pruebas con Vitest y Chromium

Las pruebas de la tienda se ejecutan con Vitest Browser Mode, React Testing Library y Chromium de Playwright. La limpieza entre casos desmonta el DOM, restaura espías y vacía localStorage y sessionStorage.

Los casos de tienda conservados se enumeran en `casos-originales.json`. El generador de resultados falla si falta uno o existe un resultado fallido, omitido o pendiente.

## Reproducir

```powershell
npm ci
npm run test:browser:install
npm test
npm run lint
npm run build
```

En Linux/CI, instalar Chromium y sus bibliotecas con `npx playwright install --with-deps chromium`. Los resultados vigentes se generan con `npm test`.
