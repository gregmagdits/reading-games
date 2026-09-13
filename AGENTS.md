# AGENTS.md

## Project Shape

This is a static reading-game prototype. There is no build system, package manager, or backend.

- `shooting-words.html` is the main game and settings app. It contains HTML, CSS, and JavaScript in one file.
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
node -e 'const fs=require("fs"); const html=fs.readFileSync("shooting-words.html","utf8"); const scripts=[...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m=>m[1]); for (const script of scripts) new Function(script); console.log("script parse ok");'
git diff --check -- shooting-words.html
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

When changing import validation in `shooting-words.html`, keep it aligned with the CSV schema and existing IndexedDB normalization for older imported rows.

## Shooting Game Notes

The settings UI, game state, IndexedDB access, metrics, shooter artwork, and game loop all live in `shooting-words.html`.

When adding a shooter option, update every relevant hook:

- `SHOOTER_TYPES`
- in-game `[data-shooter-choice]` button
- settings radio button and visibility checkbox
- shooter DOM inside `#gun`
- CSS display rules for hiding/showing the shooter
- scene background class on `.arena`
- `applyShooterType()`
- `shootAt()`
- projectile function
- `updateAim()`
- `getAimPivot()`
- pivot/tip helpers

Shooter art should remain static and self-contained, using CSS and inline SVG data URLs. Keep the first screen the game itself, not a landing page.

## Settings And Storage

Settings are stored in `localStorage` under `shootingWordsSettings`. Word data and metrics are stored in IndexedDB `shootingWordsReadingDb`.

The settings password is intentionally hardcoded as `password`; this is a child-focused local game, not a security boundary.

When changing filters, preserve both source modes:

- Book source: `Section(s)` and `Lesson(s)`.
- Poster source: `Phoneme(s)` and `letter_combination(s)`.

## Style

Keep the app lightweight, playful, and readable for a young child. Avoid adding external dependencies for small UI changes. Match the existing dense single-file style rather than introducing a new architecture.

