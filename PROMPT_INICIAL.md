Quiero que arranques un proyecto nuevo desde cero: una web app de lineups de granadas para CS2 (Dust2, Mirage, Inferno, Nuke, Ancient, Anubis, Vertigo, Overpass, Train).

Ya escribí un CLAUDE.md con la arquitectura completa (stack, modelo de datos, estructura de carpetas, flujo de trabajo, convenciones y no-goals). Léelo primero, por completo, antes de escribir una sola línea de código. Todo lo que decidas debe ser consistente con ese documento. Si en algún punto ves una contradicción entre lo que te pido acá y el CLAUDE.md, decime cuál es antes de avanzar — no la resuelvas en silencio.

## Contexto rápido

Es un proyecto personal, no comercial. Lo uso yo y se lo paso a un grupo de amigos que juegan CS2 — ellos solo van a consultar contenido, no editarlo. El problema que resuelve: las apps de lineups que existen o son de pago, o tienen mala UX, o el video no se puede adelantar/atrasar bien. Esta app soluciona eso con un reproductor de video nativo con scrubbing real.

El flujo de navegación de referencia es: Mapa → Equipo (CT/T) → Tipo de granada (smoke/molotov/flash/HE) → Lista de posiciones agrupadas por zona → Detalle de lineup (video/imagen + metadata + movement/technique).

## Cómo quiero que trabajes

Andá fase por fase. No avances a la fase siguiente sin que yo confirme que la anterior funciona como espero. Al final de cada fase, decime explícitamente qué probaste vos mismo (build, responsive, funcionalidad) antes de pedirme que lo revise.

### Fase 1 — Scaffold y modelo de datos
- Inicializar proyecto Vite + React + TypeScript + Tailwind según el stack del CLAUDE.md.
- Crear los tipos de `src/types/lineup.ts` tal como están definidos en el CLAUDE.md.
- Crear `src/data/maps.json` con los 9 mapas del pool activo (nombre, id, orden). Todavía sin lineups reales — usar 3-4 lineups de ejemplo en `src/data/lineups/dust2.json` con datos inventados pero realistas, para poder probar el flujo completo.
- Armar el router y las páginas vacías/skeleton: Home (grid de mapas) → Team → NadeType → LineupDetail.
- Entregable de esta fase: puedo navegar Home → Dust2 → CT → Smoke → ver una lista de 3-4 posiciones → entrar al detalle de una y ver sus datos (aunque el reproductor todavía no esté pulido).

### Fase 2 — Reproductor de video real
- Construir `VideoPlayer.tsx` sobre `<video>` nativo con controles propios: play/pause, seek bar arrastrable, salto ±5s, velocidad de reproducción, loop.
- Probarlo con al menos una URL externa real (te voy a pasar un par de links de csnades.gg tipo `https://assets.csnades.gg/nades/.../hq.webm`) para confirmar que el hotlink funciona y que el seek anda bien de punta a punta del video, no solo al principio.
- Manejar el caso de error (video que no carga) con un mensaje visible, no una pantalla en blanco.
- Entregable: te muestro un video real y confirmás en vivo que puedo arrastrar la barra a cualquier punto sin que se trabe ni reinicie.

### Fase 3 — Funcionalidad adicional
- Buscador global (por mapa, zona, texto libre).
- Favoritos y "aprendida" con `localStorage`, con hooks propios (`useFavorites`, `useLearned`).
- Contador de lineups por tipo de granada en las cards de mapa (Home).
- Script `npm run validate:data` que valida con Zod que los JSON de `src/data/lineups/*.json` tienen el formato correcto y no hay `id` duplicados.

### Fase 4 — Diseño, responsive y deploy
- Pulir el diseño: oscuro, minimalista, mobile-first (se va a usar desde el celular). Usar como referencia visual las capturas que te compartí de la app original en cuanto a jerarquía de información, no en cuanto a paleta exacta — quiero algo con identidad propia, no un clon visual.
- Verificar responsive en 375px, 768px y 1280px.
- Preparar el repo para deploy en Vercel (build estático, sin variables de entorno necesarias para la v1).
- Escribir un `README.md` corto: cómo correr en local, cómo agregar un lineup nuevo (editar el JSON correspondiente + correr `npm run validate:data` + commit + push).

## Qué no quiero en la v1

Ya está en el CLAUDE.md (sección "No-goals"), pero para que quede explícito acá también: sin panel admin, sin login, sin backend, sin i18n, sin analytics. Si en algún momento te parece que alguna de estas cosas resolvería un problema real, decímelo y lo evaluamos — pero no lo implementes sin que lo hablemos primero.

## Contenido real

Los mapas y lineups reales los voy a ir cargando yo (o te voy a pedir ayuda puntual) editando los JSON directamente una vez que la Fase 1 esté funcionando — no hace falta que vengas con contenido completo de entrada, con el set de ejemplo alcanza para construir y probar todo el flujo.

Antes de arrancar la Fase 1: confirmame que leíste el CLAUDE.md y decime si tenés alguna duda sobre el modelo de datos o la arquitectura antes de generar el primer commit.
