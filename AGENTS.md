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

- Latest refinements: remove speech tail without resizing bubble; increase only text by 10px. Mascot toggles 01/02 on click (and keyboard), replacing hover.
- Mobile portrait crops prioritize faces; novel detail covers and main video use contain. Character logo image is 50% within unchanged panel; header logo height is 40px.
- Main has a bottom scroll cue. Posters take 19 seconds per image (133-second full loop). Only second world video enters from outside top-left toward bottom-right.

- New exceptions to centered cover: book hover previews, movie posters, and mascot use contain so the full image remains visible. Movie letterboxing is black.
- World videos are absolutely sized to fill the full visual panel.
- Mobile primary characters stack as five horizontal strips fitting one viewport; selection expands vertically with details below.
- Movie posters move continuously right to left without dwell, with a bottom gradient behind the buttons.
- Mascot floats vertically and crossfades from mascot01 to mascot02 on hover/focus. Speech uses the supplied white angular outline with bottom-right tail and warm glowing italic text.

- Preserve source image aspect ratios. Fill media slots with centered `object-fit: cover`; cropping at the edges is acceptable. Do not stretch or use `contain` for content images.

- Latest revision: world backgrounds are videos, with separate thumbnail images (or video first frames). Inactive thumbnails are dark, hover brightens, selection stays bright with a cyan border.
- Main character portrait expands to 2× its resting width, superseding 1.5×.
- Movie cycles through 7 responsive landscape/portrait poster pairs from right to left, with slow transitions.
- Goods auto motion now travels right to left; after all 3 products, advance to the next category. Keep 4-second dwell and 1-second motion.
- Wheel navigation works at every viewport width and over world copy. Scroll long content to its boundary before navigating sections. Mobile expanded shelves must grow to fit all detail content.

- Novel and character catalogue details expand inline at their original ordered position; automatically scroll the shelf to reveal the complete expanded entry.
- World copy must paginate to its measured available height; no internal scrolling or dropped overflow text.
- Poster return button is absolutely positioned at the movie panel bottom-right. Header webtoon CTA uses the same left-to-right fill interaction.
- Goods emphasis belongs to the moving card, not a fixed overlay. Auto motion brings the left card into the center with gradual brightness/border interpolation; retain 4 seconds dwell and 1 second motion. This supersedes the previous fixed-frame preference.

## Latest media refinements — 2026-09-22
- Inactive world thumbnail buttons use a dark shade of the active cyan border; active borders remain bright cyan.
- Speech text is centered in the tailless bubble and scales with the bubble, never beyond its outline.
- Movie posters retain their native ratio and touch horizontally without letterbox gaps between slides.
- Character logo is 20% larger than the previous half-size version, with the panel unchanged.
- The second world video crops the source's right third, aligns the remaining two-thirds left, and animates that cropped region.

## Analytics Tracking — Mixpanel

## Browser revisions — 2026-09-23
- Speech bubble is behind the mascot; mascot background remains transparent.
- Book spines use supplied images with equal displayed heights and natural widths, superseding the earlier fixed-width rule. Spine filenames append `-1` to the cover filename: `public/media/books/partN-VV-1.png`.
- Trailer choices display thumbnails and play official YouTube embeds in the page. Bottom-right CTA is an external “영화 보러가기” link.
- Goods categories: 전체, 스페셜, 페이퍼, 아크릴, 피규어, 봉제, 패브릭, 기타. 전체 includes all supplied product images. Advance category after its actual product count; keep 4-second dwell and 1-second motion.

## Analytics implementation

- Platform: React 19 + Vite 6 web app; SDK: `mixpanel-browser` `^2.83.0`; direct client-side tracking with no CDP.
- Mixpanel is initialized once in `src/analytics.js`. Do not initialize it in components.
- Project token comes only from `VITE_MIXPANEL_TOKEN`; never hardcode it in tracked source files.
- Audience region is unknown, so consent is required. Initialization uses `opt_out_tracking_by_default: true`; events may fire only after `mixpanel.opt_in_tracking()`.
- The site has no authentication. Keep anonymous device identity and do not add profiles or PII.
- Value Moment: `external_link_clicked` for webtoon, web novel, movie, trailer, and goods destinations.
- Current events: `page_viewed`, `page_exited`, `internal_navigation`, `external_link_clicked`. Event and property names must remain stable `snake_case`.
- Before adding an event, check `MIXPANEL.md`, reuse existing properties, update both that document and this list, and verify in Mixpanel Live View.
