# Entrega de la Evaluación Parcial 2

Referencia vigente: rúbrica de la tienda online y Anexo 1. Se aplica la indicación expresa del profesor: Vitest con Chromium para las pruebas funcionales, en lugar de Jasmine/Karma.

## Implementado

- React modular, Bootstrap, props, estado y contexto.
- Persistencia local de catálogo, cuentas y carrito; CRUD conectado con tienda y login.
- Validaciones, permisos y control de cantidades y stock.
- Categorías públicas, búsqueda combinada y Ofertas con administración de precios; compatibilidad con almacenamiento anterior. Ver [detalle](CATEGORIAS_OFERTAS.md).
- Checkout con dirección y entrega, autocompletado y resultado persistente; simulación sin cobros.
- Pruebas de la tienda con Vitest y Chromium real.
- Plan, resultados, cobertura y comprobación automática de conservación de casos. Ver cifras actuales en RESULTADOS.md y COBERTURA.md.
- Automatización preparada para instalar Chromium y ejecutar pruebas en GitHub.

## Pendientes de la entrega completa

Los siguientes entregables siguen fuera de las ampliaciones del checkout, categorías y ofertas:

1. ERS V2 actualizado con alcance personalizado y herramientas vigentes.
2. Revisión del ERS contra los flujos comerciales implementados y su evidencia de pruebas.
3. Vistas administrativas comprometidas en el ERS: categorías, productos críticos, órdenes/boletas, historial, reportes y perfil. El diagrama del anexo es adaptable.
4. ZIP final y verificación de la URL pública del repositorio.
5. Presentación individual y preguntas. Encargo 40%, presentación 60%; el anexo propone 15 minutos de equipo y 5 de preguntas.

No se exige fotografía profesional ni tres proyectos independientes: pertenecían a la pauta formativa equivocada. GitHub Pages es opcional.

## Guion de defensa

1. Explicar arquitectura y migración de HTML a React.
2. Seguir un producto por props, estado, persistencia y carrito.
3. Mostrar CRUD, registro/login y permisos con datos ficticios.
4. Demostrar Bootstrap en móvil y escritorio, con comprobaciones directas en el navegador.
5. Ejecutar npm test y explicar diez casos relevantes en Chromium: escenario, acción y resultado esperado.
6. Mostrar un vi.spyOn, la limpieza entre casos y un fallo simulado.
7. Abrir la cobertura del frontend; explicar alcance y pendientes.
8. Responder individualmente sobre código y aportes reales en GitHub.
