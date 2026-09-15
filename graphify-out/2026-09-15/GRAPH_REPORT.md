# Graph Report - reading  (2026-09-15)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 289 nodes · 582 edges · 22 communities (15 shown, 7 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 9 edges (avg confidence: 0.89)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `27cd00d3`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- game-controller.mjs
- startRound
- startGameApp
- shooter-tools.mjs
- ReadingRepository
- Shooter Integration Seam
- word-catalog.mjs
- applyCurrentFilters
- rebuildSettingsControls
- applySelectedSettings
- init
- Start Missing-Letter Round
- renderMetricsChart
- GameController
- resumeGame
- loadSavedSettings
- normalizePrefixRange
- start-server.sh
- Browser-Native Self-Contained Design
- Static Reading Game Project Shape
- Settings and Storage Contract
- Teaching Reading Words CSV Data Contract

## God Nodes (most connected - your core abstractions)
1. `startGameApp()` - 144 edges
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

## Communities (22 total, 7 thin omitted)

### Community 0 - "game-controller.mjs"
Cohesion: 0.06
Nodes (8): Effects, SettingsController, createSettingsNormalizer(), MemoryStorage, SettingsStore, REQUIRED_FIELDS, ShooterRegistry, shooterDefinitions

### Community 1 - "startRound"
Cohesion: 0.10
Nodes (31): animateWords(), clamp(), clearFireworks(), correctRoundDelay(), createWordToken(), explodeWord(), finishRound(), formatDisplayWord() (+23 more)

### Community 2 - "startGameApp"
Cohesion: 0.11
Nodes (13): startGameApp(), addMetric(), hideMetricsTooltip(), isCorrectMetric(), isGameShotTarget(), isShotControlTarget(), lessonForWord(), normalizeMetricWord() (+5 more)

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
Cohesion: 0.27
Nodes (16): applyCurrentFilters(), filterRows(), getSelectedSource(), normalizeSelectedSource(), normalizeStoredValues(), rebuildLessonOptions(), rebuildLetterCombinationOptions(), rebuildSourceFilterControls() (+8 more)

### Community 8 - "rebuildSettingsControls"
Cohesion: 0.20
Nodes (14): applyShooterType(), chooseShooterFromPicker(), isShooterVisible(), normalizeShooterType(), normalizeShooterVisibility(), rebuildSettingsControls(), saveSettings(), setCapitalizationSelection() (+6 more)

### Community 9 - "applySelectedSettings"
Cohesion: 0.20
Nodes (12): applySelectedSettings(), filteredGameWords(), getSelectedCapitalization(), getSelectedShooterType(), getSelectedValues(), getSelectedWordTextFilters(), lessonLookup(), normalizeWordTextFilter() (+4 more)

### Community 10 - "init"
Cohesion: 0.22
Nodes (10): init(), normalizeDbRows(), openDatabase(), openSettingsPanel(), pauseGameForSettings(), readAllRows(), setPasswordStatus(), showError() (+2 more)

### Community 11 - "Start Missing-Letter Round"
Cohesion: 0.25
Nodes (8): Check Missing-Letter Answer, Create Letter Choices, Initialize Missing-Letter Game, Parse Three-Letter Words CSV, Pick Word, Render Letter Choices, Render Word, Start Missing-Letter Round

### Community 12 - "renderMetricsChart"
Cohesion: 0.46
Nodes (8): createMetricsBar(), createSvgElement(), createSvgText(), drawChartAxes(), drawChartLegend(), formatMetricWordSummary(), niceMax(), renderMetricsChart()

### Community 14 - "resumeGame"
Cohesion: 0.38
Nodes (7): closeSettingsPanel(), pauseGame(), resumeGame(), resumeGameFromSettings(), setPauseReason(), togglePlayerPause(), updatePauseOverlay()

### Community 15 - "loadSavedSettings"
Cohesion: 0.29
Nodes (7): defaultShooterVisibility(), getSelectedShooterVisibility(), getSelectedWordSpeed(), loadSavedSettings(), normalizeSavedSource(), normalizeWordSpeed(), setSpeedSelection()

### Community 16 - "normalizePrefixRange"
Cohesion: 0.50
Nodes (5): getSelectedPrefixRange(), normalizePrefixLength(), normalizePrefixRange(), normalizeSavedPrefixRange(), setPrefixRangeSelection()

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

- **Why does `startGameApp()` connect `startGameApp` to `game-controller.mjs`, `startRound`, `ReadingRepository`, `word-catalog.mjs`, `applyCurrentFilters`, `rebuildSettingsControls`, `applySelectedSettings`, `init`, `renderMetricsChart`, `GameController`, `resumeGame`, `loadSavedSettings`, `normalizePrefixRange`?**
  _High betweenness centrality (0.606) - this node is a cross-community bridge._
- **Why does `ShooterRegistry` connect `game-controller.mjs` to `startGameApp`?**
  _High betweenness centrality (0.098) - this node is a cross-community bridge._
- **Why does `ReadingRepository` connect `ReadingRepository` to `game-controller.mjs`, `startGameApp`?**
  _High betweenness centrality (0.072) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `startGameApp()` (e.g. with `drawFireworks()` and `randomInt()`) actually correct?**
  _`startGameApp()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `REQUIRED_FIELDS`, `start-server.sh script`, `injectedStyles` to the rest of the system?**
  _17 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `game-controller.mjs` be split into smaller, more focused modules?**
  _Cohesion score 0.060129509713228495 - nodes in this community are weakly interconnected._
- **Should `startRound` be split into smaller, more focused modules?**
  _Cohesion score 0.0989247311827957 - nodes in this community are weakly interconnected._