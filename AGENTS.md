# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.

## Durable design decisions — 2026-09-21

- Do not add media assets: preserve configurable image/video slots.
- Remove the main world CTA and the entire webtoon review screen/navigation.
- Portrait hover only brightens; click expands image width to 1.5× and uses logo/right-gutter space for details.
- More characters opens a categorized horizontal character shelf, not a modal.
- All novel parts use identical spine width. Hover brightens/lifts a spine and reveals its adjacent cover.
- Novel detail follows supplied reference: cover, top excerpt panel, chapter list, bottom-right link. No back-to-bookshelf button; use shelf scroll arrows and a discreet close control.
- Movie/novel/goods CTAs fill left-to-right on hover/focus. Goods automatically slides every 3 seconds, with pause controls and reduced-motion support.

- Character catalogue taxonomy is defined by the two user-supplied tables (not the earlier simplified wiki taxonomy): 김독자 컴퍼니 16, 화신 7, 성좌 / 마왕 12, 도깨비 4, 기타 4, 외전 10. Preserve row-major order, titles, hidden names (■■■), and separate IDs for side-story/round variants.

- Latest interaction revision: novel detail expands inline immediately after the clicked spine without reordering books or resetting horizontal scroll. Goods carousel holds for 4 seconds after each completed slide and transitions over 1 second. Bright central frame/dimming mask is fixed to the viewport, never the incoming card.

## Latest browser feedback — 2026-09-22

- Novel and character catalogue details expand inline at their original ordered position; automatically scroll the shelf to reveal the complete expanded entry.
- World copy must paginate to its measured available height; no internal scrolling or dropped overflow text.
- Poster return button is absolutely positioned at the movie panel bottom-right. Header webtoon CTA uses the same left-to-right fill interaction.
- Goods emphasis belongs to the moving card, not a fixed overlay. Auto motion brings the left card into the center with gradual brightness/border interpolation; retain 4 seconds dwell and 1 second motion. This supersedes the previous fixed-frame preference.
