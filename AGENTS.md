# AGENTS.md

## Project Shape

This is a static reading-game prototype. There is no build system, package manager, or backend.

- `shooting-words.html` is the stable page URL and semantic application shell.
- `js/app.mjs` is the composition root. Game, settings, storage, catalog, effects, and shooter behavior live in focused native ES modules under `js/`.
- `js/shooters/` contains one self-contained definition per shooter plus the single registration list in `js/shooters/index.mjs`.
- `styles/` contains shared base-game, settings, and effects styles. Shooter-specific art, scene, and projectile CSS belongs in its shooter module.
- `index.html` is the earlier missing-letter picture game.
- `teaching-reading-words.csv` is the primary word database for the shooting game.
- `phoneme_examples.csv` is source data that was imported into `teaching-reading-words.csv` with `source=poster`.
- `three_letter_words.csv` is data for the earlier picture game.

Keep changes self-contained and browser-native unless the user explicitly asks for a framework or build step.

## Running

Use a local static server from the repo root:

```bash
python3 -m http.server 8000 --bind 127.0.0.1
```

Open:

```text
http://127.0.0.1:8000/shooting-words.html
```

The app uses IndexedDB, so prefer serving through HTTP over opening the file directly.

## Validation

Before reporting a browser-file change complete, run:

```bash
find js -name '*.mjs' -print0 | xargs -0 -n1 node --check
node --test tests/*.test.mjs
git diff --check
curl --max-time 2 -I http://127.0.0.1:8000/shooting-words.html
```

If port `8000` is not responding, restart the static server. If a visual/browser provider is available, also smoke-test the settings panel and the changed shooter or game flow.

## Data Contract

`teaching-reading-words.csv` must keep this exact header:

```csv
section,lesson,lesson_description,word,is_sight_word,phonetic_symbol,letter_combination,source
```

Rules:

- `is_sight_word` is `T` or `F`.
- Book rows use their real section and lesson data with `source=OPG_Revised_Instructor.pdf`.
- Poster rows use `source=poster`; currently they use `section=0`, `lesson=0`, and `lesson_description=Phoneme poster examples`.
- `phoneme_examples.csv` maps `phoneme` to `phonetic_symbol`.
- Keep CSV edits append/transform-safe. Do not delete existing data unless the user explicitly asks.

When changing import validation in `js/word-catalog.mjs`, keep it aligned with the CSV schema and existing IndexedDB normalization for older imported rows.

## Shooting Game Notes

To add a shooter, create one definition module in `js/shooters/` and add one import/entry in `js/shooters/index.mjs`. The registry derives picker/settings controls and delegates scene, aiming, and projectile behavior; do not add shooter-specific branches to game or settings modules.

Shooter art should remain static and self-contained, using CSS and inline SVG data URLs. Keep the first screen the game itself, not a landing page.

## Settings And Storage

Settings are stored in `localStorage` under `shootingWordsSettings`. Word data and metrics are stored in IndexedDB `shootingWordsReadingDb`.

The settings password is intentionally hardcoded as `password`; this is a child-focused local game, not a security boundary.

When changing filters, preserve both source modes:

- Book source: `Section(s)` and `Lesson(s)`.
- Poster source: `Phoneme(s)` and `letter_combination(s)`.

## Style

Keep the app lightweight, playful, and readable for a young child. Avoid external dependencies and preserve the native-module architecture.

Use Graphify for explicit architecture, dependency, or code-navigation work. Do not rebuild it for routine feature edits; refresh it only when the architecture materially changes or the user asks.
