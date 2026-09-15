# Graph Report - reading  (2026-09-15)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 286 nodes · 576 edges · 16 communities (9 shown, 7 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 9 edges (avg confidence: 0.89)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `27cd00d3`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- startGameApp
- game-controller.mjs
- applySelectedSettings
- shooter-tools.mjs
- ReadingRepository
- Shooter Integration Seam
- word-catalog.mjs
- applyCurrentFilters
- ShooterRegistry
- init
- Start Missing-Letter Round
- start-server.sh
- Browser-Native Self-Contained Design
- Static Reading Game Project Shape
- Settings and Storage Contract
- Teaching Reading Words CSV Data Contract

## God Nodes (most connected - your core abstractions)
1. `startGameApp()` - 141 edges
2. `ShooterRegistry` - 19 edges
3. `applySelectedSettings()` - 18 edges
4. `defineShooter()` - 16 edges
5. `applyCurrentFilters()` - 13 edges
6. `rebuildSettingsControls()` - 13 edges
7. `ReadingRepository` - 12 edges
8. `startRound()` - 12 edges
9. `init()` - 11 edges
10. `InMemoryReadingAdapter` - 10 edges

## Surprising Connections (you probably didn't know these)
- `Garbage Truck Background` --semantically_similar_to--> `Garbage Truck Scene`  [INFERRED] [semantically similar]
  graphify-out/memory/query_20260914_231350_581aa647_add_a_new_shooter_option_where_the_shooter_is_a_ga.md → shooting-words.html
- `Shooter Integration Seam` --references--> `Apply Shooter Type`  [EXTRACTED]
  graphify-out/memory/query_20260914_230253_3577ac6a_add_a_new_shooter_option_where_the_shooter_is_a_ba.md → shooting-words.html
- `Shooter Integration Seam` --references--> `Get Active Shooter Aim Pivot`  [EXTRACTED]
  graphify-out/memory/query_20260914_230253_3577ac6a_add_a_new_shooter_option_where_the_shooter_is_a_ba.md → shooting-words.html
- `Shooter Integration Seam` --references--> `Dispatch Shot`  [EXTRACTED]
  graphify-out/memory/query_20260914_230253_3577ac6a_add_a_new_shooter_option_where_the_shooter_is_a_ba.md → shooting-words.html
- `Shooter Integration Seam` --references--> `Shooter Types`  [EXTRACTED]
  graphify-out/memory/query_20260914_230253_3577ac6a_add_a_new_shooter_option_where_the_shooter_is_a_ba.md → shooting-words.html

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Garbage Can Shooter Integration** — shooting_words_shooter_types, shooting_words_garbagecan_shooter_choice, shooting_words_garbagecan_settings_controls, shooting_words_garbagecan_figure, shooting_words_garbagecan_artwork, shooting_words_garbage_scene, shooting_words_apply_shooter_type, shooting_words_shoot_at, shooting_words_shoot_garbage, shooting_words_update_aim, shooting_words_get_aim_pivot, shooting_words_get_garbagecan_pivot, shooting_words_get_garbagecan_tip [INFERRED 0.95]
- **Shooter Option Extension Contract** — agents_shooter_option_hooks, shooting_words_shooter_types, shooting_words_apply_shooter_type, shooting_words_shoot_at, shooting_words_update_aim, shooting_words_get_aim_pivot [INFERRED 0.95]

## Communities (16 total, 7 thin omitted)

### Community 0 - "startGameApp"
Cohesion: 0.06
Nodes (58): startGameApp(), addMetric(), animateWords(), clamp(), clearFireworks(), closeSettingsPanel(), correctRoundDelay(), createMetricsBar() (+50 more)

### Community 1 - "game-controller.mjs"
Cohesion: 0.07
Nodes (8): Effects, GameController, SettingsController, createSettingsNormalizer(), MemoryStorage, SettingsStore, REQUIRED_FIELDS, shooterDefinitions

### Community 2 - "applySelectedSettings"
Cohesion: 0.08
Nodes (33): applySelectedSettings(), applyShooterType(), chooseShooterFromPicker(), defaultShooterVisibility(), getSelectedCapitalization(), getSelectedPrefixRange(), getSelectedShooterType(), getSelectedShooterVisibility() (+25 more)

### Community 3 - "shooter-tools.mjs"
Cohesion: 0.19
Nodes (6): add(), defineShooter(), fireProjectile(), injectedStyles, injectStyleOnce(), removeAfter()

### Community 5 - "Shooter Integration Seam"
Cohesion: 0.14
Nodes (20): Shooter Option Integration Hooks, Backpack Book Shooter Request, Library Background, Shooter Integration Seam, Garbage Can Shooter Request, Garbage Truck Background, Apply Shooter Type, Garbage Projectile and Impact Styles (+12 more)

### Community 6 - "word-catalog.mjs"
Cohesion: 0.18
Nodes (12): capitalize(), EXPECTED_HEADERS, filterRows(), LEGACY_WORD_SOURCE, normalizeRow(), normalizeRows(), parseCsv(), prefixGroups() (+4 more)

### Community 7 - "applyCurrentFilters"
Cohesion: 0.24
Nodes (18): applyCurrentFilters(), filterRows(), getSelectedSource(), normalizeSelectedSource(), normalizeStoredValues(), rebuildLessonOptions(), rebuildLetterCombinationOptions(), rebuildSettingsControls() (+10 more)

### Community 9 - "init"
Cohesion: 0.18
Nodes (12): init(), normalizeDbRows(), openDatabase(), openSettingsPanel(), pauseGameForSettings(), readAllRows(), setPasswordStatus(), setSettingsStatus() (+4 more)

### Community 10 - "Start Missing-Letter Round"
Cohesion: 0.25
Nodes (8): Check Missing-Letter Answer, Create Letter Choices, Initialize Missing-Letter Game, Parse Three-Letter Words CSV, Pick Word, Render Letter Choices, Render Word, Start Missing-Letter Round

## Knowledge Gaps
- **17 isolated node(s):** `REQUIRED_FIELDS`, `start-server.sh script`, `injectedStyles`, `LEGACY_WORD_SOURCE`, `rows` (+12 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 71 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **7 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Work-memory lessons

**Preferred sources** — corroborated by past sessions; start here.
- `Apply Shooter Type` (2× useful, score=1.974484002) _(code changed — re-verify)_
- `Get Active Shooter Aim Pivot` (2× useful, score=1.974484002) _(code changed — re-verify)_
- `Dispatch Shot` (2× useful, score=1.974484002) _(code changed — re-verify)_
- `Update Shooter Aim` (2× useful, score=1.974484002) _(code changed — re-verify)_

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `startGameApp()` connect `startGameApp` to `game-controller.mjs`, `applySelectedSettings`, `ReadingRepository`, `word-catalog.mjs`, `applyCurrentFilters`, `ShooterRegistry`, `init`?**
  _High betweenness centrality (0.598) - this node is a cross-community bridge._
- **Why does `ShooterRegistry` connect `ShooterRegistry` to `startGameApp`, `game-controller.mjs`?**
  _High betweenness centrality (0.099) - this node is a cross-community bridge._
- **Why does `ReadingRepository` connect `ReadingRepository` to `startGameApp`, `game-controller.mjs`?**
  _High betweenness centrality (0.072) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `startGameApp()` (e.g. with `drawFireworks()` and `randomInt()`) actually correct?**
  _`startGameApp()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `REQUIRED_FIELDS`, `start-server.sh script`, `injectedStyles` to the rest of the system?**
  _17 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `startGameApp` be split into smaller, more focused modules?**
  _Cohesion score 0.06169772256728778 - nodes in this community are weakly interconnected._
- **Should `game-controller.mjs` be split into smaller, more focused modules?**
  _Cohesion score 0.06906906906906907 - nodes in this community are weakly interconnected._