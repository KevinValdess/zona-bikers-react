# Zona Bikers React

Tienda de motocicletas y accesorios para DSY1104, Evaluación Parcial 2. React, Bootstrap, React Router y almacenamiento local.

## Ejecutar

Requiere Node.js 24 y npm.

```powershell
npm ci
npm run test:browser:install
npm run dev
```

Abrir la URL de Vite. Los datos JSON se cargan por HTTP.

## Funciones

- Catálogo con categorías, búsqueda, ofertas y detalles.
- Carrito con cantidades, stock, totales y persistencia.
- Registro, login y rutas según rol.
- Administración de productos y cuentas.
- Checkout con dirección, entrega y resultado persistente.
- Equipo, noticias, menú adaptable y contacto por WhatsApp.

Los datos se guardan en el navegador; no hay backend de tienda. La compra es simulada y el formulario de contacto valida sin enviar correos. Las cuentas educativas y rutas protegidas no sustituyen una autenticación de producción.

## Cuentas de prueba

| Rol | Correo | Contraseña |
|---|---|---|
| Administrador | admin@duoc.cl | 12345 |
| Vendedor | vende@profesor.duoc.cl | vende |
| Cliente | cliente@gmail.com | moto1 |

Usar datos ficticios. Para restablecer datos, borrar productosBikers, usuariosBikers y carritoBikers de localStorage.

## Verificación

```powershell
npm run lint
npm test
npm run build
```

Vitest ejecuta las pruebas en Chromium headless de Playwright. Los umbrales son 90% de sentencias, funciones y líneas y 85% de ramas. `npm test` genera cobertura y actualiza los documentos de resultados; también verifica los casos de tienda conservados en `docs/casos-originales.json`.

- [Plan de pruebas](docs/PLAN_PRUEBAS.md).
- [Resultados](docs/RESULTADOS.md).
- [Cobertura](docs/COBERTURA.md).
- [Categorías y ofertas](docs/CATEGORIAS_OFERTAS.md).
- [Entrega](docs/ENTREGA.md).
- Informe HTML local: `coverage/frontend/index.html`.

## Demostrar props y state desde F12

Abrir la web normalmente y entrar a F12 → Console. Filtrar por `React demo`.
Los mensajes aparecen automáticamente al cargar el catálogo y al agregar, cambiar cantidades o eliminar productos.
Si se abrió la consola después de cargar la página, recargar para ver también los mensajes iniciales.

- `[PROPS] TarjetaProducto`: objeto `producto` recibido desde el catálogo.
- `[STATE] Productos`: estados `productos`, `cargando` y `error` después de actualizarse.
- `[STATE] CarritoProvider`: estado del carrito al agregar, cambiar cantidades o eliminar productos.

Los mensajes muestran copias de los valores reales después del render. No se necesita una extensión.
En desarrollo, StrictMode puede repetir los mensajes iniciales.

## Publicación en GitHub Pages

En [Settings → Pages](https://github.com/KevinValdess/zona-bikers-react/settings/pages), seleccionar **GitHub Actions** como fuente. Después volver a ejecutar el flujo **Verificar y publicar** desde Actions.

El flujo comprueba código, pruebas y compilación. La publicación solo se ejecuta desde `main`; las pull requests ejecutan la verificación. HashRouter y la base relativa permiten recargar rutas dentro de la subcarpeta del repositorio.
