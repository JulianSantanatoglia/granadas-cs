# CLAUDE.md — CS2 Lineups (proyecto personal)

Este archivo es la fuente de verdad del proyecto para Claude Code. Leerlo antes de tocar cualquier archivo. Si algo en el código contradice este documento, el documento manda salvo que el usuario diga lo contrario explícitamente.

## 1. Qué es esto

Una web app para consultar lineups de granadas de CS2 (humo, molotov/incendiaria, flash, HE) por mapa, lado (CT/T), tipo de granada y posición — igual en concepto a apps como csnades.gg o Prime, pero:

- Sin paywall, sin contenido bloqueado.
- Con reproductor de video nativo con scrubbing real (adelantar/atrasar funciona siempre — este es el motivo #1 por el que existe este proyecto).

Uso: Julián es el único editor de contenido (carga lineups editando los JSON directamente en el repo). La app se deploya en Vercel y se comparte por link con amigos, que la usan en modo solo-lectura. **No es un producto comercial** — no hay planes de monetizarla, cobrar, ni distribuirla públicamente más allá del grupo de amigos. No tiene autenticación (no hace falta: nadie más edita contenido). Optimizar para "se usa antes/durante una partida, desde el celular o la PC", no para escala.

## 2. Stack

- **React 18 + Vite + TypeScript** — strict mode activado en `tsconfig.json`, sin `any` salvo justificación en comentario.
- **Tailwind CSS** — única fuente de estilos. Sin CSS-in-JS, sin archivos `.css` sueltos salvo `index.css` con las directivas de Tailwind.
- **React Router** para navegación (`Maps → Team → Nade type → Position → Lineup detail`).
- **Zustand o Context+useReducer** para estado global liviano (favoritos, filtros). Preferir Zustand si el estado crece; empezar con Context si alcanza.
- **Sin backend persistente en producción.** Los datos son JSON estáticos importados en build time. El "backend" del admin solo existe en modo desarrollo (ver sección 5).
- Deploy: **Vercel**, plan free, build estático (Vite `build` → `dist/`).

No agregar librerías de UI pesadas (Material UI, Ant, etc.). Componentes propios con Tailwind. Si hace falta algo puntual (iconos), usar `lucide-react`.

## 3. Flujo de la app (según referencia)

1. **Home / Maps**: grid de mapas activos del pool competitivo (Dust2, Mirage, Inferno, Nuke, Ancient, Anubis, Vertigo, Overpass, Train). Cada card muestra thumbnail, nombre y conteo de lineups por tipo de granada (smoke/molotov/flash/HE).
2. **Selección de equipo**: CT o T.
3. **Selección de tipo de granada**: tabs con ícono (smoke, molotov, flash, HE).
4. **Lista de posiciones/zonas**: agrupadas por zona del mapa (ej. "B Site", "Mid", "Long", "Ramp to Long"). Sin candados — acá todo está desbloqueado (a diferencia de la app de referencia).
5. **Detalle de lineup**: título (`FROM <posición origen>`), metadata (Map / Side / Nade / Pos), reproductor de video o imagen, badges de Movement (Stationary/Walking/Running/Jump) y Technique (Normal/Jumpthrow/Left click/Right click), botón de favorito, notas propias opcionales.

Funcionalidad adicional que no está en la referencia pero sí en esta app:
- Buscador global (por mapa, zona o texto libre).
- Favoritos (persistidos en `localStorage` del navegador de cada visitante, no requieren backend ni cuenta).
- Marcar lineup como "aprendida" (checklist personal de práctica, también en `localStorage`).

Sin panel admin en la v1: el contenido se carga editando directamente los archivos `src/data/lineups/*.json`. Si más adelante hace falta un admin (por volumen de contenido o para que un amigo también pueda cargar lineups), se evalúa como v2 — no construir de más ahora.

## 4. Modelo de datos

Los datos viven en JSON estático, uno por mapa, en `src/data/lineups/<mapa>.json`. Tipos en `src/types/lineup.ts`:

```ts
export type MapId = "dust2" | "mirage" | "inferno" | "nuke" | "ancient" | "anubis" | "vertigo" | "overpass" | "train";
export type Side = "CT" | "T";
export type NadeType = "smoke" | "molotov" | "flash" | "he";
export type Movement = "stationary" | "walking" | "running" | "jump";
export type Technique = "normal" | "jumpthrow" | "leftclick" | "rightclick";

export interface LineupMedia {
  kind: "video" | "image";
  source: "external" | "upload"; // external = hotlink (ej. csnades.gg), upload = archivo propio en /public/videos
  url: string;
  thumbnailUrl?: string;
}

export interface Lineup {
  id: string;                // slug único: "dust2-ct-mid-smoke-back-platform"
  map: MapId;
  side: Side;
  nadeType: NadeType;
  zone: string;               // "B Site", "Mid", "Long", etc. — agrupador de la lista de posiciones
  title: string;              // "FROM CT Mid"
  position: string;           // "Back Platform"
  movement: Movement;
  technique: Technique;
  media: LineupMedia;
  notes?: string;
  learned: boolean;
  createdAt: string;          // ISO date
  updatedAt: string;          // ISO date
}
```

Reglas:
- `id` es estable y determinístico (no UUID random) para que los diffs de git sean legibles.
- `media.source: "external"` es válido, pero **siempre** verificar antes de guardar que la URL responde con `Content-Type: video/*` y soporta `Range` requests (si no, el scrubbing no va a andar bien). Si un hotlink falla, avisar a Julián en vez de guardarlo silenciosamente.
- Favoritos y "learned" para MVP pueden vivir en `localStorage` (`useFavorites` hook) en vez de en el JSON, para no ensuciar el dataset versionado. Reevaluar si en algún momento se migra a DB.

## 5. Persistencia de contenido — "Git como base de datos"

No hay backend en producción, ni falta. El flujo de carga de contenido es:

1. Julián edita a mano (o le pide a Claude Code que edite) los archivos `src/data/lineups/<mapa>.json`.
2. `git add / commit / push`.
3. Vercel redeploya automático con el JSON actualizado — los amigos ven el contenido nuevo en la misma URL, sin hacer nada.

Para que editar a mano sea cómodo, es clave que:
- Los JSON tengan formato consistente y ordenado (mismo orden de keys, indentación de 2 espacios) para que los diffs de git sean legibles.
- Exista un script simple de validación (`npm run validate:data` o similar) que chequee con Zod (o validación manual) que cada lineup tiene los campos requeridos, que `nadeType`/`side`/`movement`/`technique` son valores válidos del enum, y que no hay `id` duplicados. Correrlo antes de cada commit evita romper el build por un typo en el JSON.

Si en el futuro hace falta edición remota (ej. un amigo carga sus propias lineups sin pasar por git) o un panel admin, es una v2 explícita — no construirlo ahora.

## 6. Reproductor de video (el requisito crítico)

El motivo de este proyecto es que otras apps no dejan adelantar/atrasar el video. No usar embeds de YouTube/Vimeo para esto. Usar siempre `<video>` nativo de HTML5:

- Controles completos: play/pause, seek bar arrastrable, salto ±5s, velocidad de reproducción (0.5x/1x/1.5x), loop.
- Componente propio `VideoPlayer.tsx` (no el control nativo del navegador a secas) para tener estilo consistente con el resto de la UI, pero construido sobre el elemento `<video>` real — nada de reinventar el decode/seek.
- Preload `metadata` (no `auto`) para no gastar ancho de banda de más en la lista.
- Si `media.kind === "image"`, renderizar imagen simple con zoom on click.
- Manejar el estado de error (video que no carga, ej. si csnades.gg bloquea el hotlink) con un fallback visible, no una pantalla en blanco.

## 7. Estructura de carpetas

```
src/
  types/
    lineup.ts
  data/
    maps.json                 # metadata de mapas: nombre, thumbnail, orden
    lineups/
      dust2.json
      mirage.json
      ...
  lib/
    loadLineups.ts             # import estático + agregaciones (conteos por tipo, etc.)
    validateData.ts            # validación de esquema (Zod) usada por el script npm run validate:data
  hooks/
    useFavorites.ts
    useLearned.ts
    useLineupFilters.ts
  components/
    layout/
    MapCard.tsx
    SideSelector.tsx
    NadeTypeTabs.tsx
    ZoneList.tsx
    LineupCard.tsx
    LineupDetail.tsx
    VideoPlayer.tsx
    Badge.tsx
    SearchBar.tsx
  pages/
    HomeMapsPage.tsx
    TeamPage.tsx
    NadeTypePage.tsx
    LineupDetailPage.tsx
  router.tsx
  App.tsx
  main.tsx
```

## 8. Convenciones de código

- Componentes funcionales, un componente por archivo, export default solo para páginas; componentes reutilizables con named export.
- Props tipadas explícitamente, sin `React.FC`. Sin props opcionales sin valor por defecto cuando tenga sentido uno.
- Mobile-first: diseñar primero para pantalla de celular (se va a usar en el teléfono en medio de una partida/pausa), luego escalar con breakpoints de Tailwind (`sm:`, `md:`, `lg:`).
- Diseño moderno, minimalista, oscuro (consistente con la estética de referencia: fondo oscuro, acentos en azul/celeste para texto interactivo, íconos de granada en amarillo/dorado).
- Sin `console.log` en código final. Errores de carga de datos o de video van a un componente de error visible, no a la consola.
- Commits chicos y descriptivos en español o inglés (consistencia, no mezclar en el mismo commit).

## 9. No-goals (evitar sobre-ingeniería)

- Nada de autenticación/login — el contenido lo edita solo Julián por git, los amigos solo leen.
- Nada de panel admin ni backend persistente en producción en la v1 (ver sección 5).
- Nada de monetización, paywall ni features pensadas para uso comercial — es un proyecto para Julián y su grupo de amigos.
- Nada de i18n — la app es en español o inglés, a elección de Julián, pero no ambos.
- Nada de PWA/offline en la v1 salvo que se pida explícitamente.
- No integrar analytics ni tracking de ningún tipo.

## 10. Definición de "hecho" para cada feature

Antes de dar una tarea por terminada:
1. Corre `npm run build` sin errores de TypeScript.
2. Se probó en viewport mobile (375px) y desktop.
3. Si toca el reproductor de video: se verificó que el seek/scrub funciona arrastrando la barra, no solo con play/pause.
4. Si toca datos: `npm run validate:data` pasa sin errores.
5. Sin warnings de ESLint sin resolver o justificados en comentario.
