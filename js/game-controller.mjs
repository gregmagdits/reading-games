import { ShooterRegistry } from "./shooter-registry.mjs";
import { shooterDefinitions } from "./shooters/index.mjs";
import { ReadingRepository } from "./reading-repository.mjs";
import { SettingsStore, createSettingsNormalizer } from "./settings-store.mjs";
import { ALL_SOURCES, WordCatalog, normalizeRows as normalizeCatalogRows, selectRoundWords, uniqueWords as uniqueCatalogWords, validateTeachingCsv as validateCatalogCsv } from "./word-catalog.mjs";
import { Effects } from "./effects.mjs";
import { SettingsController } from "./settings-controller.mjs";
import { PRESET_DEFINITIONS, filterRowsByPresets, getPresetSelections, isPresetApplicable, normalizePresetIds } from "./presets.mjs";
import { CUSTOM_RULE_DEFINITIONS, hasMagicEContrast, isCustomRuleApplicable, isMagicEContrastActive, normalizeCustomRuleIds, selectMagicERoundWords } from "./round-rules.mjs";
export class GameController {
  constructor({ registry, repository, catalog, effects, random = Math.random, timer = globalThis.setTimeout } = {}) {
    this.registry = registry; this.repository = repository; this.catalog = catalog; this.effects = effects; this.random = random; this.timer = timer;
    this.state = { running:false, paused:false, activeWords:[], target:null, pointer:{x:0,y:0}, correctStreak:0 };
  }
  aimAt(point) { this.state.pointer = { ...point }; this.registry.aimAt(point); }
  shootAt(point) { if (!this.state.running || this.state.paused) return false; this.registry.shootAt(point); return true; }
  pause() { this.state.paused = true; }
  resume() { this.state.paused = false; }
}


export function startGameApp() {
  
        const shooterRegistry = new ShooterRegistry(shooterDefinitions);
        const repository = new ReadingRepository({ indexedDB: window.indexedDB });
        const wordCatalog = new WordCatalog();
        const effects = new Effects({ windowRef: window });
        const settingsStore = new SettingsStore({ storage: window.localStorage, normalize: createSettingsNormalizer(shooterRegistry) });
        const settingsController = new SettingsController({ registry: shooterRegistry, store: settingsStore });
        const MIN_WORDS = 2;
        const MAX_WORDS = 4;
        const RESULT_DELAY_MS = 1200;
        const TIMEOUT_DELAY_MS = 260;
        const FIREWORK_SERIES_GAP_MS = 120;
        const CAPITALIZATION_MODES = new Set(["uppercase", "lowercase", "original"]);
        const SHOOTER_PICKER_STREAK_COUNT = 2;
        const MIN_WORD_SPEED = 1;
        const MAX_WORD_SPEED = 5;
        const MIN_PREFIX_LENGTH = 0;
        const DEFAULT_MIN_PREFIX_LENGTH = 1;
        const DEFAULT_MAX_PREFIX_LENGTH = 1;
        const WORD_SPEED_MULTIPLIERS = {
          1: 2.8,
          2: 2.25,
          3: 1.75,
          4: 1.35,
          5: 1
        };
        const ALLOWED_PHONETIC_SYMBOLS = new Set([
          "/ă/", "/ĕ/", "/ĭ/", "/ŏ/", "/ŭ/", "/ā/", "/ē/", "/ī/", "/ō/", "/ū/", "/o-o/", "/o˘o/",
          "/ô/", "/ö/", "/ü/", "/ou/", "/ow/", "/oi/", "/aw/", "/ar/", "/air/", "/ear/", "/er/",
          "/or/", "/är/", "/ôr/", "/âr/", "/ûr/", "/ə/", "/b/", "/d/", "/f/",
          "/g/", "/h/", "/j/", "/k/", "/l/", "/m/", "/n/", "/p/", "/kw/", "/r/", "/s/", "/t/",
          "/v/", "/w/", "/ks/", "/y/", "/z/", "/sh/", "/th/", "/zh/", "/ch/", "/ng/", "/hw/"
        ]);
        const FIREWORK_PALETTES = [
          ["#ffef6e", "#ff7a59", "#ff477e", "#68e1fd", "#7cff8e"],
          ["#fff4a3", "#ffd166", "#fca311", "#ff6b35", "#ffffff"],
          ["#70d6ff", "#00b4d8", "#90e0ef", "#b8f7ff", "#bdb2ff"],
          ["#39ff14", "#f72585", "#7209b7", "#4cc9f0", "#fff200"],
          ["#ffd6e0", "#caffbf", "#9bf6ff", "#bdb2ff", "#fdffb6"]
        ];
  
        const state = {
          words: [],
          selectedRows: [],
          wordLessons: new Map(),
          db: null,
          dbRows: [],
          currentFilters: {
            source: "",
            sections: [],
            lessons: [],
            phonemes: [],
            letterCombinations: [],
            presets: [],
            customRules: []
          },
          capitalization: "uppercase",
          shooterType: "laser",
          shooterVisibility: defaultShooterVisibility(),
          wordSpeed: MAX_WORD_SPEED,
          prefixMinLength: DEFAULT_MIN_PREFIX_LENGTH,
          prefixMaxLength: DEFAULT_MAX_PREFIX_LENGTH,
          wordFilterPrefix: "",
          wordFilterSuffix: "",
          settingsAuthenticated: false,
          activeWords: [],
          target: null,
          running: false,
          paused: false,
          pausedByPlayer: false,
          pausedForSettings: false,
          pauseStartedAt: 0,
          pausedNextRoundRemaining: 0,
          locked: true,
          roundOver: false,
          waitingForWordsToLeave: false,
          correctStreak: 0,
          shooterPickerBaseStreak: 0,
          roundId: 0,
          animationId: 0,
          pointer: {
            x: window.innerWidth / 2,
            y: window.innerHeight * 0.28
          },
          nextRoundTimer: 0,
          nextRoundDueAt: 0
        };
  
        const arenaEl = document.getElementById("arena");
        const wordLayerEl = document.getElementById("wordLayer");
        const projectileLayerEl = document.getElementById("projectileLayer");
        const fireworksCanvasEl = document.getElementById("fireworksCanvas");
        const fireworksCtx = fireworksCanvasEl.getContext("2d");
        const startScreenEl = document.getElementById("startScreen");
        const startButtonEl = document.getElementById("startButton");
        const soundButtonEl = document.getElementById("soundButton");
        const pauseOverlayEl = document.getElementById("pauseOverlay");
        const noMatchingWordsEl = document.getElementById("noMatchingWords");
        const shooterPickerEl = document.getElementById("shooterPicker");
        let shooterChoiceButtonEls = [];
        const errorEl = document.getElementById("error");
        const gunEl = document.getElementById("gun");
        const settingsToggleEl = document.getElementById("settingsToggle");
        const settingsPanelEl = document.getElementById("settingsPanel");
        const passwordFormEl = document.getElementById("passwordForm");
        const settingsPasswordEl = document.getElementById("settingsPassword");
        const passwordStatusEl = document.getElementById("passwordStatus");
        const settingsFormEl = document.getElementById("settingsForm");
        const fullscreenSettingsButtonEl = document.getElementById("fullscreenSettingsButton");
        const importButtonEl = document.getElementById("importButton");
        const clearDatabaseButtonEl = document.getElementById("clearDatabaseButton");
        const showMetricsButtonEl = document.getElementById("showMetricsButton");
        const clearMetricsButtonEl = document.getElementById("clearMetricsButton");
        const metricsChartPanelEl = document.getElementById("metricsChartPanel");
        const metricsChartOutputEl = document.getElementById("metricsChartOutput");
        const importFileInputEl = document.getElementById("importFileInput");
        const confirmClearEl = document.getElementById("confirmClear");
        const confirmClearYesEl = document.getElementById("confirmClearYes");
        const confirmClearCancelEl = document.getElementById("confirmClearCancel");
        const sourceOptionsEl = document.getElementById("sourceOptions");
        const presetOptionsEl = document.getElementById("presetOptions");
        const customRuleOptionsEl = document.getElementById("customRuleOptions");
        const bookFilterControlsEl = document.getElementById("bookFilterControls");
        const posterFilterControlsEl = document.getElementById("posterFilterControls");
        const sectionSelectEl = document.getElementById("sectionSelect");
        const lessonSelectEl = document.getElementById("lessonSelect");
        const phonemeSelectEl = document.getElementById("phonemeSelect");
        const letterCombinationSelectEl = document.getElementById("letterCombinationSelect");
        const applySettingsButtonEl = document.getElementById("applySettingsButton");
        const cancelSettingsButtonEl = document.getElementById("cancelSettingsButton");
        const settingsStatusEl = document.getElementById("settingsStatus");
        const shooterSettingsChoicesEl = document.getElementById("shooterSettingsChoices");
        const shooterVisibilityChoicesEl = document.getElementById("shooterVisibilityChoices");
        const capitalizationEls = [...document.querySelectorAll("input[name='capitalization']")];
        let shooterTypeEls = [];
        let shooterVisibilityEls = [];
        const minPrefixLengthInputEl = document.getElementById("minPrefixLengthInput");
        const maxPrefixLengthInputEl = document.getElementById("maxPrefixLengthInput");
        const wordFilterPrefixInputEl = document.getElementById("wordFilterPrefixInput");
        const wordFilterSuffixInputEl = document.getElementById("wordFilterSuffixInput");
        const speedControlEl = document.getElementById("speedControl");
        const speedNeedleEl = document.getElementById("speedNeedle");
        const speedValueEl = document.getElementById("speedValue");
        shooterRegistry.mount({
          host: gunEl,
          projectileLayer: projectileLayerEl,
          arena: arenaEl,
          picker: shooterPickerEl,
          settings: shooterSettingsChoicesEl,
          visibilitySettings: shooterVisibilityChoicesEl,
          randomInt,
          timer: window.setTimeout.bind(window)
        });
        shooterChoiceButtonEls = [...document.querySelectorAll("[data-shooter-choice]")];
        shooterTypeEls = [...document.querySelectorAll("input[name='shooterType']")];
        shooterVisibilityEls = [...document.querySelectorAll("input[name='shooterVisible']")];
        const fireworkBursts = [];
        let fireworkWidth = 0;
        let fireworkHeight = 0;
        let lastFireworkFrame = performance.now();
  
        resizeFireworksCanvas();
        requestAnimationFrame(drawFireworks);
        init();
  
        async function init() {
          try {
            state.db = await openDatabase();
            state.dbRows = await readAllRows();
            wordCatalog.replace(state.dbRows);
            loadSavedSettings();
            applyCurrentFilters();
            rebuildSettingsControls();
            updateAim();
  
            if (state.dbRows.length === 0) {
              startButtonEl.disabled = true;
              openSettingsPanel();
              showPasswordForm();
              setPasswordStatus("Import teaching-reading-words.csv to choose words for the game.");
            }
          } catch (error) {
            showError(`${error.message} IndexedDB needs a normal browser page context; run this page from the local web server.`);
          }
        }
  
        startButtonEl.addEventListener("click", () => {
          if (!canStartGame()) {
            openSettingsPanel();
            showPasswordForm();
            setPasswordStatus(currentCustomRuleError() || "Import data and apply a word set before starting.");
            return;
          }
  
          state.running = true;
          state.correctStreak = 0;
          resetShooterPickerProgress();
          startScreenEl.hidden = true;
          soundButtonEl.hidden = false;
          unlockSpeech();
          startRound();
        });
  
        soundButtonEl.addEventListener("click", (event) => {
          event.stopPropagation();
          if (!state.paused && state.target) {
            speakWord(state.target.word);
          }
        });
  
        arenaEl.addEventListener("pointermove", (event) => {
          state.pointer.x = event.clientX;
          state.pointer.y = event.clientY;
          updateAim();
        });
  
        arenaEl.addEventListener("pointerdown", (event) => {
          if (
            !state.running ||
            state.paused ||
            state.locked ||
            !isAllowedShotPointer(event) ||
            isShotControlTarget(event.target)
          ) {
            return;
          }
  
          event.preventDefault();
          state.pointer.x = event.clientX;
          state.pointer.y = event.clientY;
          updateAim();
          shootAt(event.clientX, event.clientY);
  
          const hits = findHitWords(event.clientX, event.clientY);
          if (hits.length === 0) {
            return;
          }
  
          const correctHit = hits.find((token) => token.word === state.target.word);
          if (correctHit) {
            recordGuess(true);
            handleCorrectGuess(correctHit);
          } else {
            recordGuess(false);
            handleWrongGuess();
          }
        });
  
        arenaEl.addEventListener("contextmenu", (event) => {
          if (isGameShotTarget(event.target)) {
            event.preventDefault();
          }
        });
  
        window.addEventListener("keydown", (event) => {
          if (event.code !== "Space" || shouldIgnorePauseKey(event.target)) {
            return;
          }
  
          event.preventDefault();
          togglePlayerPause();
        });
  
        shooterPickerEl.addEventListener("click", (event) => {
          const button = event.target.closest("[data-shooter-choice]");
          if (!button) {
            return;
          }
  
          chooseShooterFromPicker(button.dataset.shooterChoice);
        });
  
        settingsToggleEl.addEventListener("click", () => {
          if (settingsPanelEl.classList.contains("open")) {
            closeSettingsPanel();
            return;
          }
  
          openSettingsPanel();
          if (state.settingsAuthenticated) {
            showSettingsForm();
          } else {
            showPasswordForm();
          }
        });
  
        passwordFormEl.addEventListener("submit", (event) => {
          event.preventDefault();
          if (settingsController.authenticate(settingsPasswordEl.value)) {
            state.settingsAuthenticated = true;
            settingsPasswordEl.value = "";
            showSettingsForm();
            return;
          }
  
          setPasswordStatus("Incorrect password.", true);
          settingsPasswordEl.select();
        });
  
        fullscreenSettingsButtonEl.addEventListener("click", () => {
          showFullscreenSettings();
        });
  
        importButtonEl.addEventListener("click", () => {
          importFileInputEl.value = "";
          importFileInputEl.click();
        });
  
        importFileInputEl.addEventListener("change", async () => {
          const [file] = importFileInputEl.files;
          if (!file) {
            return;
          }
  
          try {
            const text = await file.text();
            const rows = validateTeachingCsv(text);
            await replaceRows(rows);
            state.dbRows = rows;
            wordCatalog.replace(rows);
            state.words = [];
            state.selectedRows = [];
            state.wordLessons = new Map();
            state.currentFilters = {
              source: "",
              sections: [],
              lessons: [],
              phonemes: [],
              letterCombinations: [],
              presets: [],
              customRules: []
            };
            saveSettings();
            resetGameAfterDataChange();
            rebuildSettingsControls({ selectAll: true });
            setSettingsStatus(`Imported ${rows.length} rows. Choose sections and lessons, then Apply.`);
          } catch (error) {
            setSettingsStatus(error.message, true);
          }
        });
  
        clearDatabaseButtonEl.addEventListener("click", () => {
          confirmClearEl.hidden = false;
        });
  
        showMetricsButtonEl.addEventListener("click", async () => {
          try {
            const metrics = await readMetrics();
            renderMetricsChart(metrics);
            setSettingsStatus(metrics.length ? `Showing ${metrics.length} metrics.` : "No metrics recorded yet.");
          } catch (error) {
            setSettingsStatus(error.message, true);
          }
        });
  
        clearMetricsButtonEl.addEventListener("click", async () => {
          if (!window.confirm("Are you sure you want to clear the metrics?")) {
            return;
          }
  
          try {
            await clearMetrics();
            renderMetricsChart([]);
            setSettingsStatus("Metrics cleared.");
          } catch (error) {
            setSettingsStatus(error.message, true);
          }
        });
  
        confirmClearCancelEl.addEventListener("click", () => {
          confirmClearEl.hidden = true;
        });
  
        confirmClearYesEl.addEventListener("click", async () => {
          try {
            await clearRows();
            state.dbRows = [];
            wordCatalog.replace([]);
            state.words = [];
            state.selectedRows = [];
            state.wordLessons = new Map();
            state.currentFilters = {
              source: "",
              sections: [],
              lessons: [],
              phonemes: [],
              letterCombinations: [],
              presets: [],
              customRules: []
            };
            saveSettings();
            resetGameAfterDataChange();
            rebuildSettingsControls();
            confirmClearEl.hidden = true;
            setSettingsStatus("Database cleared. Import data to play.");
          } catch (error) {
            setSettingsStatus(error.message, true);
          }
        });
  
        sectionSelectEl.addEventListener("change", () => {
          clearApplicablePresetChecks(getSelectedSource());
          rebuildLessonOptions(getSelectedSource(), getSelectedValues(sectionSelectEl), getSelectedValues(lessonSelectEl));
        });

        lessonSelectEl.addEventListener("change", () => {
          clearApplicablePresetChecks(getSelectedSource());
        });
  
        sourceOptionsEl.addEventListener("change", () => {
          const source = getSelectedSource();
          const selectedPresets = getSelectedPresetIds();
          const selectedCustomRules = getSelectedCustomRuleIds();
          rebuildPresetOptions({ source, selectedPresets });
          rebuildCustomRuleOptions({ source, selectedCustomRules });
          rebuildSourceFilterControls({
            source,
            selectAll: selectedPresets.length === 0,
            selectedPresets
          });
        });

        presetOptionsEl.addEventListener("change", () => {
          const selectedPresets = getSelectedPresetIds();
          rebuildSourceFilterControls({
            source: getSelectedSource(),
            selectAll: selectedPresets.length === 0,
            selectedPresets
          });
        });
  
        phonemeSelectEl.addEventListener("change", () => {
          clearApplicablePresetChecks(getSelectedSource());
          rebuildLetterCombinationOptions(
            getSelectedSource(),
            getSelectedValues(phonemeSelectEl),
            getSelectedValues(letterCombinationSelectEl)
          );
        });

        letterCombinationSelectEl.addEventListener("change", () => {
          clearApplicablePresetChecks(getSelectedSource());
        });
  
        speedControlEl.addEventListener("input", () => {
          setSpeedSelection(getSelectedWordSpeed());
        });
  
        minPrefixLengthInputEl.addEventListener("change", () => {
          setPrefixRangeSelection(getSelectedPrefixRange());
        });
  
        maxPrefixLengthInputEl.addEventListener("change", () => {
          setPrefixRangeSelection(getSelectedPrefixRange());
        });
  
        settingsFormEl.addEventListener("submit", (event) => {
          event.preventDefault();
          if (applySelectedSettings()) {
            closeSettingsPanel();
          }
        });
  
        cancelSettingsButtonEl.addEventListener("click", () => {
          rebuildSettingsControls();
          closeSettingsPanel();
        });
  
        window.addEventListener("resize", () => {
          updateAim();
          resizeFireworksCanvas();
        });
  
        function openSettingsPanel() {
          settingsPanelEl.classList.add("open");
          settingsPanelEl.setAttribute("aria-hidden", "false");
        }
  
        function showFullscreenSettings() {
          pauseGameForSettings();
          settingsPanelEl.classList.add("fullscreen");
          openSettingsPanel();
          if (state.settingsAuthenticated) {
            showSettingsForm();
          } else {
            showPasswordForm();
          }
        }
  
        function closeSettingsPanel() {
          const wasFullscreen = settingsPanelEl.classList.contains("fullscreen");
          settingsPanelEl.classList.remove("open");
          settingsPanelEl.classList.remove("fullscreen");
          settingsPanelEl.setAttribute("aria-hidden", "true");
          confirmClearEl.hidden = true;
          state.settingsAuthenticated = false;
          settingsPasswordEl.value = "";
          if (wasFullscreen) {
            resumeGameFromSettings();
          }
        }
  
        function showPasswordForm() {
          passwordFormEl.hidden = false;
          settingsFormEl.hidden = true;
          window.setTimeout(() => settingsPasswordEl.focus(), 80);
        }
  
        function showSettingsForm() {
          passwordFormEl.hidden = true;
          settingsFormEl.hidden = false;
          rebuildSettingsControls();
          const ruleError = currentCustomRuleError();
          setSettingsStatus(ruleError || (state.dbRows.length ? `${state.dbRows.length} rows loaded.` : "No data loaded."), Boolean(ruleError));
        }
  
        function setPasswordStatus(message, isError = false) {
          passwordStatusEl.textContent = message;
          passwordStatusEl.classList.toggle("error-text", isError);
        }
  
        function setSettingsStatus(message, isError = false) {
          settingsStatusEl.textContent = message;
          settingsStatusEl.classList.toggle("error-text", isError);
        }
  
        function openDatabase() {
          if (!("indexedDB" in window)) return Promise.reject(new Error("This browser does not support IndexedDB."));
          return repository.open();
        }

        async function readAllRows() { return normalizeDbRows(await repository.readRows()); }
        function replaceRows(rows) { return repository.replaceRows(rows); }
        function clearRows() { return repository.clearRows(); }
        function clearMetrics() { return repository.clearMetrics(); }
        function readMetrics() { return repository.readMetrics(); }
        function addMetric(metric) { return repository.addMetric(metric); }

        function normalizeDbRows(rows) {
          return normalizeCatalogRows(rows);
        }
  
        function validateTeachingCsv(text) {
          return validateCatalogCsv(text, { allowedPhoneticSymbols: ALLOWED_PHONETIC_SYMBOLS });
        }

        function loadSavedSettings() {
          try {
            const saved = settingsController.load();
  
            state.currentFilters = {
              source: normalizeSavedSource(saved.source),
              sections: Array.isArray(saved.sections) ? saved.sections.map(String) : [],
              lessons: Array.isArray(saved.lessons) ? saved.lessons.map(String) : [],
              phonemes: Array.isArray(saved.phonemes) ? saved.phonemes.map(String) : [],
              letterCombinations: Array.isArray(saved.letterCombinations) ? saved.letterCombinations.map(String) : [],
              presets: normalizePresetIds(saved.presets),
              customRules: normalizeCustomRuleIds(saved.customRules)
            };
            if (CAPITALIZATION_MODES.has(saved.capitalization)) {
              state.capitalization = saved.capitalization;
            }
            state.shooterType = normalizeShooterType(saved.shooterType);
            state.shooterVisibility = normalizeShooterVisibility(saved.shooterVisibility);
            state.wordSpeed = normalizeWordSpeed(saved.wordSpeed);
            const prefixRange = normalizeSavedPrefixRange(saved);
            state.prefixMinLength = prefixRange.min;
            state.prefixMaxLength = prefixRange.max;
            state.wordFilterPrefix = normalizeWordTextFilter(saved.wordFilterPrefix);
            state.wordFilterSuffix = normalizeWordTextFilter(saved.wordFilterSuffix);
          } catch {
            state.currentFilters = {
              source: "",
              sections: [],
              lessons: [],
              phonemes: [],
              letterCombinations: [],
              presets: [],
              customRules: []
            };
            state.capitalization = "uppercase";
            state.shooterType = "laser";
            state.shooterVisibility = defaultShooterVisibility();
            state.wordSpeed = MAX_WORD_SPEED;
            state.prefixMinLength = DEFAULT_MIN_PREFIX_LENGTH;
            state.prefixMaxLength = DEFAULT_MAX_PREFIX_LENGTH;
            state.wordFilterPrefix = "";
            state.wordFilterSuffix = "";
          }
        }
  
        function saveSettings() {
          settingsController.apply({
            sections: state.currentFilters.sections,
            lessons: state.currentFilters.lessons,
            source: state.currentFilters.source,
            phonemes: state.currentFilters.phonemes,
            letterCombinations: state.currentFilters.letterCombinations,
            presets: state.currentFilters.presets,
            customRules: state.currentFilters.customRules,
            capitalization: state.capitalization,
            shooterType: state.shooterType,
            shooterVisibility: state.shooterVisibility,
            wordSpeed: state.wordSpeed,
            prefixMinLength: state.prefixMinLength,
            prefixMaxLength: state.prefixMaxLength,
            wordFilterPrefix: state.wordFilterPrefix,
            wordFilterSuffix: state.wordFilterSuffix
          });
        }
  
        function rebuildSettingsControls(options = {}) {
          const hasData = state.dbRows.length > 0;
          rebuildSourceOptions(options);
          rebuildPresetOptions({
            source: getSelectedSource(),
            selectedPresets: state.currentFilters.presets
          });
          rebuildCustomRuleOptions({
            source: getSelectedSource(),
            selectedCustomRules: state.currentFilters.customRules
          });
          rebuildSourceFilterControls({
            source: getSelectedSource(),
            selectAll: options.selectAll,
            selectedPresets: state.currentFilters.presets
          });
          setCapitalizationSelection(state.capitalization);
          setPrefixRangeSelection({
            min: state.prefixMinLength,
            max: state.prefixMaxLength
          });
          setWordTextFilterSelection(state.wordFilterPrefix, state.wordFilterSuffix);
          setShooterTypeSelection(state.shooterType);
          setShooterVisibilitySelection(state.shooterVisibility);
          applyShooterType();
          setSpeedSelection(state.wordSpeed);
  
          sourceOptionsEl.querySelectorAll("input").forEach((input) => {
            input.disabled = !hasData;
          });
          presetOptionsEl.querySelectorAll("input").forEach((input) => {
            input.disabled = !hasData || !isPresetApplicable(PRESET_DEFINITIONS.find((preset) => preset.id === input.value), getSelectedSource());
          });
          customRuleOptionsEl.querySelectorAll("input").forEach((input) => {
            input.disabled = !hasData || !isCustomRuleApplicable(CUSTOM_RULE_DEFINITIONS.find((rule) => rule.id === input.value), getSelectedSource());
          });
          sectionSelectEl.disabled = !hasData;
          lessonSelectEl.disabled = !hasData;
          phonemeSelectEl.disabled = !hasData;
          letterCombinationSelectEl.disabled = !hasData;
          applySettingsButtonEl.disabled = !hasData;
          clearDatabaseButtonEl.disabled = !hasData;
        }
  
        function rebuildSourceOptions(options = {}) {
          const sources = uniqueSources();
          const selectedSource = normalizeSelectedSource(
            options.source || state.currentFilters.source,
            sources
          );
  
          sourceOptionsEl.innerHTML = "";
          [ALL_SOURCES, ...sources].forEach((source) => {
            const label = document.createElement("label");
            label.className = "radio-option";
  
            const input = document.createElement("input");
            input.type = "radio";
            input.name = "wordSource";
            input.value = source;
            input.checked = source === selectedSource;
  
            const text = document.createTextNode(sourceLabel(source));
            label.append(input, text);
            sourceOptionsEl.appendChild(label);
          });
        }

        function rebuildPresetOptions(options = {}) {
          const source = normalizeSelectedSource(options.source, uniqueSources());
          const selectedSet = new Set(normalizePresetIds(options.selectedPresets));
          presetOptionsEl.innerHTML = "";
          PRESET_DEFINITIONS.forEach((preset) => {
            const label = document.createElement("label");
            label.className = "preset-option";

            const input = document.createElement("input");
            input.type = "checkbox";
            input.name = "wordPreset";
            input.value = preset.id;
            input.checked = selectedSet.has(preset.id);
            input.disabled = !isPresetApplicable(preset, source);

            label.append(input, document.createTextNode(preset.label));
            presetOptionsEl.appendChild(label);
          });
        }

        function getSelectedPresetIds() {
          return normalizePresetIds([...presetOptionsEl.querySelectorAll("input[name='wordPreset']:checked")].map((input) => input.value));
        }

        function clearApplicablePresetChecks(source) {
          presetOptionsEl.querySelectorAll("input[name='wordPreset']:checked").forEach((input) => {
            const preset = PRESET_DEFINITIONS.find((item) => item.id === input.value);
            if (preset && isPresetApplicable(preset, source)) input.checked = false;
          });
        }

        function rebuildCustomRuleOptions(options = {}) {
          const source = normalizeSelectedSource(options.source, uniqueSources());
          const selectedSet = new Set(normalizeCustomRuleIds(options.selectedCustomRules));
          customRuleOptionsEl.innerHTML = "";
          CUSTOM_RULE_DEFINITIONS.forEach((rule) => {
            const label = document.createElement("label");
            label.className = "settings-checkbox-option";

            const input = document.createElement("input");
            input.type = "checkbox";
            input.name = "customRule";
            input.value = rule.id;
            input.checked = selectedSet.has(rule.id);
            input.disabled = !isCustomRuleApplicable(rule, source);

            label.append(input, document.createTextNode(rule.label));
            customRuleOptionsEl.appendChild(label);
          });
        }

        function getSelectedCustomRuleIds() {
          return normalizeCustomRuleIds([...customRuleOptionsEl.querySelectorAll("input[name='customRule']:checked")].map((input) => input.value));
        }
  
        function rebuildSourceFilterControls(options = {}) {
          const source = normalizeSelectedSource(options.source, uniqueSources());
          const isAll = source === ALL_SOURCES;
          const isPoster = source === "poster";
          const selectedPresets = normalizePresetIds(options.selectedPresets);
          const presetSelections = getPresetSelections(selectedPresets, source);
          const hasPresetSelections = selectedPresets.some((id) => {
            const preset = PRESET_DEFINITIONS.find((item) => item.id === id);
            return preset && isPresetApplicable(preset, source);
          });
          bookFilterControlsEl.hidden = isAll || isPoster;
          posterFilterControlsEl.hidden = isAll || !isPoster;

          if (isAll) {
            populatePosterFilterControls(
              presetSelections.phonemes,
              presetSelections.letterCombinations,
              hasPresetSelections
            );
            return;
          }
  
          if (isPoster) {
            populatePosterFilterControls(
              hasPresetSelections ? presetSelections.phonemes : options.selectAll ? [] : state.currentFilters.phonemes,
              hasPresetSelections ? presetSelections.letterCombinations : options.selectAll ? [] : state.currentFilters.letterCombinations,
              hasPresetSelections
            );
            return;
          }
  
          const sections = uniqueSections(source);
          const selectedSections = hasPresetSelections
            ? presetSelections.sections.filter((section) => sections.includes(section))
            : options.selectAll || state.currentFilters.sections.length === 0
            ? sections
            : state.currentFilters.sections.filter((section) => sections.includes(section));
  
          sectionSelectEl.innerHTML = "";
          sections.forEach((section) => {
            const option = document.createElement("option");
            option.value = section;
            option.textContent = section;
            option.selected = selectedSections.includes(section);
            sectionSelectEl.appendChild(option);
          });
  
          rebuildLessonOptions(
            source,
            selectedSections,
            hasPresetSelections ? presetSelections.lessons : options.selectAll ? [] : state.currentFilters.lessons
          );
        }

        function populatePosterFilterControls(selectedPhonemes, selectedLetterCombinations, useExactSelections) {
          const source = "poster";
          const phonemes = uniquePhonemes(source);
          const selected = useExactSelections
            ? selectedPhonemes.filter((phoneme) => phonemes.includes(phoneme))
            : selectedPhonemes.length === 0
              ? phonemes
              : selectedPhonemes.filter((phoneme) => phonemes.includes(phoneme));

          phonemeSelectEl.innerHTML = "";
          phonemes.forEach((phoneme) => {
            const option = document.createElement("option");
            option.value = phoneme;
            option.textContent = phoneme;
            option.selected = selected.includes(phoneme);
            phonemeSelectEl.appendChild(option);
          });

          rebuildLetterCombinationOptions(
            source,
            selected,
            selectedLetterCombinations
          );
        }
  
        function rebuildLessonOptions(source, selectedSections, selectedLessons) {
          const sectionSet = new Set(selectedSections.map(String));
          const rows = rowsForSource(source).filter((row) => sectionSet.size === 0 || sectionSet.has(String(row.section)));
          const lessons = uniqueLessons(rows);
          const selectedSet = new Set(selectedLessons.map(String).filter((lesson) => lessons.some((item) => item.value === lesson)));
          const shouldSelectAll = selectedSet.size === 0;
  
          lessonSelectEl.innerHTML = "";
          lessons.forEach((lesson) => {
            const option = document.createElement("option");
            option.value = lesson.value;
            option.textContent = lesson.label;
            option.selected = shouldSelectAll || selectedSet.has(lesson.value);
            lessonSelectEl.appendChild(option);
          });
        }
  
        function rebuildLetterCombinationOptions(source, selectedPhonemes, selectedLetterCombinations) {
          const phonemeSet = new Set(selectedPhonemes.map(String));
          const combinations = uniqueLetterCombinations(
            rowsForSource(source).filter((row) => phonemeSet.size === 0 || phonemeSet.has(row.phonetic_symbol))
          );
          const selectedSet = new Set(
            selectedLetterCombinations.map(String).filter((combination) => combinations.includes(combination))
          );
          const shouldSelectAll = selectedSet.size === 0;
  
          letterCombinationSelectEl.innerHTML = "";
          combinations.forEach((combination) => {
            const option = document.createElement("option");
            option.value = combination;
            option.textContent = combination;
            option.selected = shouldSelectAll || selectedSet.has(combination);
            letterCombinationSelectEl.appendChild(option);
          });
        }
  
        function applySelectedSettings() {
          if (state.dbRows.length === 0) {
            setSettingsStatus("Import data before applying settings.", true);
            return false;
          }
  
          const source = getSelectedSource();
          const isAll = source === ALL_SOURCES;
          const isPoster = source === "poster";
          const presets = getSelectedPresetIds();
          const customRules = getSelectedCustomRuleIds();
          const presetSelections = getPresetSelections(presets, source);
          const sections = isAll ? presetSelections.sections : isPoster ? [] : getSelectedValues(sectionSelectEl);
          const lessons = isAll ? presetSelections.lessons : isPoster ? [] : getSelectedValues(lessonSelectEl);
          const phonemes = isAll ? presetSelections.phonemes : isPoster ? getSelectedValues(phonemeSelectEl) : [];
          const letterCombinations = isAll ? presetSelections.letterCombinations : isPoster ? getSelectedValues(letterCombinationSelectEl) : [];
          if (!source) {
            setSettingsStatus("Choose a source.", true);
            return false;
          }
  
          if (!isAll && !isPoster && (sections.length === 0 || lessons.length === 0)) {
            setSettingsStatus("Choose at least one section and one lesson.", true);
            return false;
          }
  
          if (isPoster && (phonemes.length === 0 || letterCombinations.length === 0)) {
            setSettingsStatus("Choose at least one phoneme and one letter combination.", true);
            return false;
          }
  
          const selectedRows = filterRows({ source, sections, lessons, phonemes, letterCombinations, presets });
          const selectedWords = uniqueWords(selectedRows);
          const capitalization = getSelectedCapitalization();
          const shooterType = getSelectedShooterType();
          const shooterVisibility = getSelectedShooterVisibility();
          const wordSpeed = getSelectedWordSpeed();
          const prefixRange = getSelectedPrefixRange();
          const wordTextFilters = getSelectedWordTextFilters();
          if (selectedWords.length < MIN_WORDS) {
            setSettingsStatus("The selected data must contain at least two unique words.", true);
            return false;
          }

          const prospectiveWords = filterWordsByText(selectedWords, wordTextFilters);
          if (
            isMagicEContrastActive(customRules, source) &&
            !hasMagicEContrast(selectedRows, prospectiveWords)
          ) {
            setSettingsStatus("The current filters do not contain a short and long magic-e pair from the same vowel family.", true);
            return false;
          }
  
          state.currentFilters = { source, sections, lessons, phonemes, letterCombinations, presets, customRules };
          state.capitalization = capitalization;
          state.shooterType = shooterType;
          state.shooterVisibility = shooterVisibility;
          state.wordSpeed = wordSpeed;
          state.prefixMinLength = prefixRange.min;
          state.prefixMaxLength = prefixRange.max;
          state.wordFilterPrefix = wordTextFilters.prefix;
          state.wordFilterSuffix = wordTextFilters.suffix;
          setSelectedWordRows(selectedRows);
          saveSettings();
          applyShooterType();
          updateAim();
          startButtonEl.disabled = !canStartGame();
          setSettingsStatus(settingsWordCountMessage(selectedWords));
          if (state.running && state.roundOver && state.activeWords.length === 0) {
            startRound();
          }
          return true;
        }
  
        function applyCurrentFilters() {
          if (state.dbRows.length === 0) {
            state.words = [];
            state.selectedRows = [];
            state.wordLessons = new Map();
            startButtonEl.disabled = true;
            return;
          }
  
          const source = normalizeSelectedSource(state.currentFilters.source, uniqueSources());
          const isAll = source === ALL_SOURCES;
          const isPoster = source === "poster";
          const presets = normalizePresetIds(state.currentFilters.presets);
          const customRules = normalizeCustomRuleIds(state.currentFilters.customRules);
          const presetSelections = getPresetSelections(presets, source);
          const hasApplicablePresets = presets.some((id) => {
            const preset = PRESET_DEFINITIONS.find((item) => item.id === id);
            return preset && isPresetApplicable(preset, source);
          });
          const hasApplicableCustomRules = customRules.some((id) => {
            const rule = CUSTOM_RULE_DEFINITIONS.find((item) => item.id === id);
            return rule && isCustomRuleApplicable(rule, source);
          });
          const sections = isAll ? presetSelections.sections : isPoster ? [] : normalizeStoredValues(state.currentFilters.sections, uniqueSections(source));
          const lessons = isAll ? presetSelections.lessons : isPoster ? [] : normalizeStoredValues(
            state.currentFilters.lessons,
            uniqueLessons(rowsForSource(source)).map((lesson) => lesson.value)
          );
          const phonemes = isAll ? presetSelections.phonemes : isPoster ? normalizeStoredValues(state.currentFilters.phonemes, uniquePhonemes(source)) : [];
          const letterCombinations = isAll ? presetSelections.letterCombinations : isPoster ? normalizeStoredValues(
            state.currentFilters.letterCombinations,
            uniqueLetterCombinations(rowsForSource(source).filter((row) => phonemes.length === 0 || phonemes.includes(row.phonetic_symbol)))
          ) : [];
  
          state.currentFilters = { source, sections, lessons, phonemes, letterCombinations, presets, customRules };
          let selectedRows = filterRows({ source, sections, lessons, phonemes, letterCombinations, presets });
          let selectedWords = uniqueWords(selectedRows);
  
          if (selectedWords.length < MIN_WORDS && !hasApplicablePresets && !hasApplicableCustomRules) {
            state.currentFilters = {
              source,
              sections: isAll || isPoster ? [] : uniqueSections(source),
              lessons: isAll || isPoster ? [] : uniqueLessons(rowsForSource(source)).map((lesson) => lesson.value),
              phonemes: isPoster && !isAll ? uniquePhonemes(source) : [],
              letterCombinations: isPoster && !isAll ? uniqueLetterCombinations(rowsForSource(source)) : [],
              presets,
              customRules
            };
            selectedRows = rowsForSource(source);
            selectedWords = uniqueWords(selectedRows);
          }
  
          setSelectedWordRows(selectedRows);
          startButtonEl.disabled = !canStartGame();
        }
  
        function filterRows(filters) {
          const source = normalizeSelectedSource(filters.source, uniqueSources());
          let rows;
          if (source === ALL_SOURCES) {
            rows = wordCatalog.filter({ source });
          } else if (source === "poster") {
            if (!filters.phonemes.length || !filters.letterCombinations.length) return [];
            rows = wordCatalog.filter({ source, phonemes: filters.phonemes, letterCombinations: filters.letterCombinations });
          } else {
            if (!filters.sections.length || !filters.lessons.length) return [];
            rows = wordCatalog.filter({ source, sections: filters.sections, lessons: filters.lessons });
          }
          return filterRowsByPresets(rows, filters.presets, source);
        }
  
        function rowsForSource(source) {
          const selectedSource = normalizeSelectedSource(source, uniqueSources());
          if (selectedSource === ALL_SOURCES) {
            return state.dbRows;
          }
          return state.dbRows.filter((row) => row.source === selectedSource);
        }
  
        function uniqueSources() {
          return [...new Set(state.dbRows.map((row) => row.source).filter(Boolean))]
            .sort((a, b) => {
              if (a === "poster") {
                return 1;
              }
              if (b === "poster") {
                return -1;
              }
              return sourceLabel(a).localeCompare(sourceLabel(b), undefined, { sensitivity: "base" });
            });
        }
  
        function sourceLabel(source) {
          if (source === ALL_SOURCES) {
            return "All";
          }
          if (source === "poster") {
            return "Poster";
          }
  
          return source;
        }
  
        function normalizeSavedSource(source) {
          return typeof source === "string" ? source : "";
        }
  
        function normalizeSelectedSource(source, sources) {
          const allowedSources = sources.length ? sources : uniqueSources();
          if (source === ALL_SOURCES) {
            return ALL_SOURCES;
          }
          if (allowedSources.includes(source)) {
            return source;
          }
  
          return allowedSources[0] || "";
        }
  
        function getSelectedSource() {
          return normalizeSelectedSource(
            sourceOptionsEl.querySelector("input[name='wordSource']:checked")?.value,
            uniqueSources()
          );
        }
  
        function uniqueSections(source) {
          return [...new Set(rowsForSource(source).map((row) => String(row.section)))]
            .sort((a, b) => Number(a) - Number(b));
        }
  
        function uniqueLessons(rows) {
          const lessons = new Map();
          rows.forEach((row) => {
            const key = String(row.lesson);
            if (!lessons.has(key)) {
              lessons.set(key, {
                value: key,
                label: `#${row.lesson} - ${row.lesson_description}`
              });
            }
          });
  
          return [...lessons.values()].sort((a, b) => Number(a.value) - Number(b.value));
        }
  
        function uniquePhonemes(source) {
          const present = new Set(rowsForSource(source).map((row) => row.phonetic_symbol).filter(Boolean));
          const allowedOrder = [...ALLOWED_PHONETIC_SYMBOLS].filter((phoneme) => present.has(phoneme));
          const remaining = [...present].filter((phoneme) => !ALLOWED_PHONETIC_SYMBOLS.has(phoneme)).sort();
          return allowedOrder.concat(remaining);
        }
  
        function uniqueLetterCombinations(rows) {
          return [...new Set(rows.map((row) => row.letter_combination).filter(Boolean))]
            .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base", numeric: true }));
        }
  
        function uniqueWords(rows) {
          return uniqueCatalogWords(rows);
        }
  
        function setSelectedWordRows(rows) {
          state.selectedRows = rows;
          state.words = uniqueWords(rows);
          state.wordLessons = lessonLookup(rows);
        }
  
        function lessonLookup(rows) {
          const lessons = new Map();
  
          rows.forEach((row) => {
            const word = row.word.trim();
            if (!word || lessons.has(word)) {
              return;
            }
  
            lessons.set(word, row.lesson);
          });
  
          return lessons;
        }
  
        function lessonForWord(word) {
          return state.wordLessons.get(word) || null;
        }
  
        function normalizeStoredValues(values, allowedValues) {
          const allowedSet = new Set(allowedValues.map(String));
          return values.map(String).filter((value) => allowedSet.has(value));
        }
  
        function getSelectedValues(select) {
          return [...select.selectedOptions].map((option) => option.value);
        }
  
        function getSelectedCapitalization() {
          return capitalizationEls.find((input) => input.checked)?.value || "uppercase";
        }
  
        function setCapitalizationSelection(mode) {
          const selectedMode = CAPITALIZATION_MODES.has(mode) ? mode : "uppercase";
          capitalizationEls.forEach((input) => {
            input.checked = input.value === selectedMode;
          });
        }
  
        function normalizePrefixLength(length, fallback = DEFAULT_MIN_PREFIX_LENGTH) {
          const numericLength = Number(length);
          if (!Number.isFinite(numericLength)) {
            return fallback;
          }
  
          return Math.max(MIN_PREFIX_LENGTH, Math.floor(numericLength));
        }
  
        function normalizePrefixRange(minLength, maxLength) {
          const min = normalizePrefixLength(minLength, DEFAULT_MIN_PREFIX_LENGTH);
          const max = Math.max(min, normalizePrefixLength(maxLength, min));
  
          return { min, max };
        }
  
        function normalizeSavedPrefixRange(saved) {
          if (
            Object.prototype.hasOwnProperty.call(saved, "prefixMinLength") ||
            Object.prototype.hasOwnProperty.call(saved, "prefixMaxLength")
          ) {
            return normalizePrefixRange(saved.prefixMinLength, saved.prefixMaxLength);
          }
  
          const prefixLength = normalizePrefixLength(saved.prefixLength, DEFAULT_MIN_PREFIX_LENGTH);
          return { min: prefixLength, max: prefixLength };
        }
  
        function getSelectedPrefixRange() {
          return normalizePrefixRange(minPrefixLengthInputEl.value, maxPrefixLengthInputEl.value);
        }
  
        function setPrefixRangeSelection(range) {
          const normalizedRange = normalizePrefixRange(range.min, range.max);
          minPrefixLengthInputEl.value = String(normalizedRange.min);
          maxPrefixLengthInputEl.value = String(normalizedRange.max);
          maxPrefixLengthInputEl.min = String(normalizedRange.min);
        }
  
        function normalizeWordTextFilter(value) {
          return String(value ?? "").trim().toLocaleLowerCase();
        }
  
        function getSelectedWordTextFilters() {
          return {
            prefix: normalizeWordTextFilter(wordFilterPrefixInputEl.value),
            suffix: normalizeWordTextFilter(wordFilterSuffixInputEl.value)
          };
        }
  
        function setWordTextFilterSelection(prefix, suffix) {
          wordFilterPrefixInputEl.value = normalizeWordTextFilter(prefix);
          wordFilterSuffixInputEl.value = normalizeWordTextFilter(suffix);
        }
  
        function filteredGameWords(words = state.words) {
          return filterWordsByText(words, {
            prefix: state.wordFilterPrefix,
            suffix: state.wordFilterSuffix
          });
        }

        function filterWordsByText(words, filters) {
          const prefix = normalizeWordTextFilter(filters.prefix);
          const suffix = normalizeWordTextFilter(filters.suffix);
          if (!prefix && !suffix) {
            return words;
          }
  
          return words.filter((word) => {
            const normalizedWord = normalizeWordTextFilter(word);
            return (
              (!prefix || normalizedWord.startsWith(prefix)) &&
              (!suffix || normalizedWord.endsWith(suffix))
            );
          });
        }

        function canStartGame() {
          const candidateWords = filteredGameWords();
          if (candidateWords.length < MIN_WORDS) return false;
          const source = normalizeSelectedSource(state.currentFilters.source, uniqueSources());
          if (!isMagicEContrastActive(state.currentFilters.customRules, source)) return true;
          return hasMagicEContrast(state.selectedRows, candidateWords);
        }

        function currentCustomRuleError() {
          if (state.dbRows.length === 0) return "";
          const source = normalizeSelectedSource(state.currentFilters.source, uniqueSources());
          if (
            isMagicEContrastActive(state.currentFilters.customRules, source) &&
            !hasMagicEContrast(state.selectedRows, filteredGameWords())
          ) {
            return "The current filters do not contain a short and long magic-e pair from the same vowel family.";
          }
          return "";
        }
  
        function settingsWordCountMessage(words) {
          const matchingCount = filteredGameWords(words).length;
          if (!state.wordFilterPrefix && !state.wordFilterSuffix) {
            return `${words.length} words selected.`;
          }
  
          return `${words.length} words selected. ${matchingCount} match the prefix/suffix filters.`;
        }
  
        function normalizeShooterType(shooterType) {
          return shooterRegistry.normalizeId(shooterType);
        }
  
        function defaultShooterVisibility() {
          return shooterRegistry.normalizeVisibility();
        }
  
        function normalizeShooterVisibility(visibility) {
          return shooterRegistry.normalizeVisibility(visibility);
        }
  
        function getSelectedShooterType() {
          return normalizeShooterType(shooterTypeEls.find((input) => input.checked)?.value);
        }
  
        function setShooterTypeSelection(shooterType) {
          const selectedShooterType = normalizeShooterType(shooterType);
          shooterTypeEls.forEach((input) => {
            input.checked = input.value === selectedShooterType;
          });
        }
  
        function getSelectedShooterVisibility() {
          const visibility = defaultShooterVisibility();
          shooterVisibilityEls.forEach((input) => {
            visibility[normalizeShooterType(input.value)] = input.checked;
          });
          return visibility;
        }
  
        function setShooterVisibilitySelection(visibility) {
          const selectedVisibility = normalizeShooterVisibility(visibility);
          shooterRegistry.setVisibility(selectedVisibility);
          shooterVisibilityEls.forEach((input) => {
            input.checked = selectedVisibility[normalizeShooterType(input.value)] !== false;
          });
        }
  
        function isShooterVisible(shooterType) {
          return shooterRegistry.isVisible(shooterType);
        }
  
        function applyShooterType() {
          state.shooterType = shooterRegistry.select(state.shooterType);
          state.shooterVisibility = shooterRegistry.setVisibility(state.shooterVisibility);
          updateShooterChoiceButtons();
          updateShooterPickerVisibility();
        }
  
        function chooseShooterFromPicker(shooterType) {
          if (!isShooterVisible(shooterType)) {
            return;
          }
  
          state.shooterType = normalizeShooterType(shooterType);
          state.shooterPickerBaseStreak = state.correctStreak;
          setShooterTypeSelection(state.shooterType);
          applyShooterType();
          saveSettings();
          updateAim();
          hideShooterPicker();
        }
  
        function updateShooterChoiceButtons() {
          shooterChoiceButtonEls.forEach((button) => {
            const shooterType = button.dataset.shooterChoice;
            const isVisible = isShooterVisible(shooterType);
            const isActive = shooterType === state.shooterType;
            button.hidden = !isVisible;
            button.classList.toggle("is-active", isActive);
            button.setAttribute("aria-pressed", String(isActive));
          });
        }
  
        function updateShooterPickerVisibility() {
          const earnedChoices = state.correctStreak - state.shooterPickerBaseStreak;
          const hasVisibleChoices = shooterChoiceButtonEls.some((button) => isShooterVisible(button.dataset.shooterChoice));
          shooterPickerEl.hidden = !state.running || earnedChoices < SHOOTER_PICKER_STREAK_COUNT || !hasVisibleChoices;
        }
  
        function hideShooterPicker() {
          shooterPickerEl.hidden = true;
        }
  
        function resetShooterPickerProgress() {
          state.shooterPickerBaseStreak = 0;
          hideShooterPicker();
        }
  
        function pauseGameForSettings() {
          pauseGame("settings");
        }
  
        function resumeGameFromSettings() {
          resumeGame("settings");
        }
  
        function togglePlayerPause() {
          if (!state.running || !noMatchingWordsEl.hidden) {
            return;
          }
  
          if (state.pausedByPlayer) {
            resumeGame("player");
          } else {
            pauseGame("player");
          }
        }
  
        function pauseGame(reason) {
          if (!state.running) {
            return;
          }
  
          setPauseReason(reason, true);
          updatePauseOverlay();
  
          if (state.paused) {
            return;
          }
  
          const now = performance.now();
          state.paused = true;
          state.pauseStartedAt = now;
          state.pausedNextRoundRemaining = 0;
          window.cancelAnimationFrame(state.animationId);
          window.speechSynthesis?.cancel();
  
          if (state.nextRoundTimer) {
            clearTimeout(state.nextRoundTimer);
            state.nextRoundTimer = 0;
            state.pausedNextRoundRemaining = Math.max(1, state.nextRoundDueAt - now);
            state.nextRoundDueAt = 0;
          }
        }
  
        function resumeGame(reason) {
          setPauseReason(reason, false);
          updatePauseOverlay();
  
          if (!state.paused || state.pausedByPlayer || state.pausedForSettings) {
            return;
          }
  
          const pausedFor = performance.now() - state.pauseStartedAt;
          state.activeWords.forEach((token) => {
            if (!token.done && !token.exploding) {
              token.startTime += pausedFor;
            }
          });
  
          state.paused = false;
          state.pauseStartedAt = 0;
  
          if (!state.running) {
            state.pausedNextRoundRemaining = 0;
            return;
          }
  
          if (state.pausedNextRoundRemaining > 0) {
            scheduleNextRound(state.pausedNextRoundRemaining);
            state.pausedNextRoundRemaining = 0;
            return;
          }
  
          state.pausedNextRoundRemaining = 0;
          if (!state.roundOver) {
            state.animationId = window.requestAnimationFrame(animateWords);
          }
        }
  
        function setPauseReason(reason, isPaused) {
          if (reason === "player") {
            state.pausedByPlayer = isPaused;
          } else if (reason === "settings") {
            state.pausedForSettings = isPaused;
          }
        }
  
        function updatePauseOverlay() {
          pauseOverlayEl.hidden = !state.pausedByPlayer;
        }
  
        function shouldIgnorePauseKey(target) {
          return (
            target instanceof Element &&
            (
              target.closest("input") ||
              target.closest("textarea") ||
              target.closest("select") ||
              target.closest("button") ||
              target.closest(".settings-panel") ||
              target.isContentEditable
            )
          );
        }
  
        function scheduleNextRound(delay) {
          clearTimeout(state.nextRoundTimer);
          state.nextRoundDueAt = performance.now() + delay;
          state.nextRoundTimer = window.setTimeout(() => {
            state.nextRoundTimer = 0;
            state.nextRoundDueAt = 0;
            startRound();
          }, delay);
        }
  
        function normalizeWordSpeed(speed) {
          const numericSpeed = Number(speed);
          if (!Number.isFinite(numericSpeed)) {
            return MAX_WORD_SPEED;
          }
  
          return clamp(Math.round(numericSpeed), MIN_WORD_SPEED, MAX_WORD_SPEED);
        }
  
        function getSelectedWordSpeed() {
          return normalizeWordSpeed(speedControlEl.value);
        }
  
        function setSpeedSelection(speed) {
          const normalizedSpeed = normalizeWordSpeed(speed);
          const speedAngle = -72 + (normalizedSpeed - MIN_WORD_SPEED) * 36;
  
          speedControlEl.value = String(normalizedSpeed);
          speedValueEl.textContent = `Speed ${normalizedSpeed}`;
          speedNeedleEl.style.transform = `translateX(-50%) rotate(${speedAngle}deg)`;
        }
  
        function getWordSpeedMultiplier() {
          return WORD_SPEED_MULTIPLIERS[state.wordSpeed] || WORD_SPEED_MULTIPLIERS[MAX_WORD_SPEED];
        }
  
        function formatDisplayWord(word) {
          if (state.capitalization === "lowercase") {
            return word.toLocaleLowerCase();
          }
  
          if (state.capitalization === "original") {
            return word;
          }
  
          return word.toLocaleUpperCase();
        }
  
        function showNoMatchingWords() {
          clearTimeout(state.nextRoundTimer);
          window.cancelAnimationFrame(state.animationId);
          window.speechSynthesis?.cancel();
          state.nextRoundTimer = 0;
          state.nextRoundDueAt = 0;
          state.locked = true;
          state.roundOver = true;
          state.waitingForWordsToLeave = false;
          state.activeWords = [];
          state.target = null;
          state.correctStreak = 0;
          soundButtonEl.hidden = true;
          resetShooterPickerProgress();
          wordLayerEl.innerHTML = "";
          projectileLayerEl.innerHTML = "";
          noMatchingWordsEl.hidden = false;
        }
  
        function hideNoMatchingWords() {
          noMatchingWordsEl.hidden = true;
        }
  
        function resetGameAfterDataChange() {
          clearTimeout(state.nextRoundTimer);
          window.cancelAnimationFrame(state.animationId);
          window.speechSynthesis?.cancel();
          state.running = false;
          state.paused = false;
          state.pausedByPlayer = false;
          state.pausedForSettings = false;
          state.pauseStartedAt = 0;
          state.pausedNextRoundRemaining = 0;
          updatePauseOverlay();
          state.locked = true;
          state.roundOver = true;
          state.waitingForWordsToLeave = false;
          state.activeWords = [];
          state.target = null;
          state.correctStreak = 0;
          resetShooterPickerProgress();
          wordLayerEl.innerHTML = "";
          projectileLayerEl.innerHTML = "";
          hideNoMatchingWords();
          clearFireworks();
          state.nextRoundDueAt = 0;
          startScreenEl.hidden = false;
          soundButtonEl.hidden = true;
          startButtonEl.disabled = !canStartGame();
        }
  
        function startRound() {
          clearTimeout(state.nextRoundTimer);
          window.cancelAnimationFrame(state.animationId);
          state.nextRoundTimer = 0;
          state.nextRoundDueAt = 0;
  
          state.roundId += 1;
          state.locked = false;
          state.roundOver = false;
          state.waitingForWordsToLeave = false;
          state.activeWords = [];
          wordLayerEl.innerHTML = "";
          projectileLayerEl.innerHTML = "";
          hideNoMatchingWords();
          clearFireworks();
  
          const roundWords = pickRoundWords();
          if (roundWords.length === 0) {
            showNoMatchingWords();
            return;
          }
  
          soundButtonEl.hidden = false;
          const now = performance.now();
  
          roundWords.forEach((entry, index) => {
            const token = createWordToken(entry.word, entry.lesson, index, roundWords.length, now);
            state.activeWords.push(token);
            placeWord(token, 0);
            wordLayerEl.appendChild(token.el);
          });
  
          state.target = state.activeWords[randomInt(0, state.activeWords.length - 1)];
          state.animationId = window.requestAnimationFrame(animateWords);
          speakWord(state.target.word);
        }
  
        function pickRoundWords() {
          const candidateWords = filteredGameWords();
          if (candidateWords.length === 0) {
            return [];
          }
  
          const minCount = Math.min(MIN_WORDS, candidateWords.length);
          const maxCount = Math.min(MAX_WORDS, candidateWords.length);
          const count = randomInt(minCount, maxCount);
  
          const prefixRange = normalizePrefixRange(state.prefixMinLength, state.prefixMaxLength);
          const source = normalizeSelectedSource(state.currentFilters.source, uniqueSources());
          const words = isMagicEContrastActive(state.currentFilters.customRules, source)
            ? selectMagicERoundWords(state.selectedRows, candidateWords, {
                count,
                minPrefix: prefixRange.min,
                maxPrefix: prefixRange.max
              })
            : selectRoundWords(candidateWords, { count, minPrefix: prefixRange.min, maxPrefix: prefixRange.max });
          return words.map((word) => ({
            word,
            lesson: lessonForWord(word)
          }));
        }
  
        function createWordToken(word, lesson, index, total, now) {
          const width = window.innerWidth;
          const height = window.innerHeight;
          const margin = Math.max(82, width * 0.08);
          const usableWidth = Math.max(1, width - margin * 2);
          const laneWidth = usableWidth / total;
          const bottomY = height + randomInt(58, 108);
          const apexY = randomInt(72, Math.max(96, Math.min(178, Math.floor(height * 0.27))));
          const laneCenter = margin + laneWidth * index + laneWidth / 2;
          const startX = clamp(laneCenter + randomInt(-Math.floor(laneWidth * 0.22), Math.floor(laneWidth * 0.22)), margin, width - margin);
          const apexX = randomInt(margin, Math.max(margin + 1, width - margin));
          const endX = clamp(startX + randomInt(-Math.floor(width * 0.34), Math.floor(width * 0.34)), margin, width - margin);
          const duration = Math.round(randomInt(5600, 7300) * getWordSpeedMultiplier());
          const delay = index * randomInt(80, 180);
          const el = document.createElement("div");
  
          el.className = "word-token";
          el.textContent = formatDisplayWord(word);
          el.dataset.word = word;
          el.setAttribute("role", "button");
          el.setAttribute("aria-label", word);
  
          return {
            word,
            lesson,
            el,
            startTime: now + delay,
            duration,
            bottomY,
            apexY,
            startX,
            apexX,
            endX,
            done: false,
            exploding: false
          };
        }
  
        function animateWords(now) {
          if (state.roundOver || state.paused) {
            return;
          }
  
          let remaining = 0;
  
          state.activeWords.forEach((token) => {
            if (token.done || token.exploding) {
              return;
            }
  
            const rawProgress = (now - token.startTime) / token.duration;
            if (rawProgress < 0) {
              remaining += 1;
              placeWord(token, 0);
              return;
            }
  
            if (rawProgress >= 1) {
              token.done = true;
              token.el.remove();
              return;
            }
  
            remaining += 1;
            placeWord(token, rawProgress);
          });
  
          if (remaining > 0) {
            state.animationId = window.requestAnimationFrame(animateWords);
          } else {
            finishRound(state.waitingForWordsToLeave ? "wrong-timeout" : "timeout");
          }
        }
  
        function placeWord(token, progress) {
          const t = clamp(progress, 0, 1);
          const oneMinusT = 1 - t;
          const x = oneMinusT * oneMinusT * token.startX + 2 * oneMinusT * t * token.apexX + t * t * token.endX;
          const y = token.apexY + (token.bottomY - token.apexY) * Math.pow(2 * t - 1, 2);
  
          token.el.style.left = `${x}px`;
          token.el.style.top = `${y}px`;
        }
  
        function handleCorrectGuess(hit) {
          if (state.roundOver || hit.done || hit.exploding) {
            return;
          }
  
          window.speechSynthesis?.cancel();
          state.correctStreak += 1;
          explodeWord(hit, state.correctStreak);
          updateShooterPickerVisibility();
  
          const nextTarget = pickVisibleTargetWord();
          if (nextTarget) {
            state.target = nextTarget;
            speakWord(state.target.word);
            return;
          }
  
          finishRound("cleared");
        }
  
        function pickVisibleTargetWord() {
          const candidates = state.activeWords.filter((token) => (
            !token.done &&
            !token.exploding &&
            token.el.isConnected &&
            isTokenOnScreen(token)
          ));
  
          if (candidates.length === 0) {
            return null;
          }
  
          return candidates[randomInt(0, candidates.length - 1)];
        }
  
        function isTokenOnScreen(token) {
          const rect = token.el.getBoundingClientRect();
          return (
            rect.right > 0 &&
            rect.left < window.innerWidth &&
            rect.bottom > 0 &&
            rect.top < window.innerHeight
          );
        }
  
        function finishRound(result) {
          if (state.roundOver) {
            return;
          }
  
          state.roundOver = true;
          state.locked = true;
          window.cancelAnimationFrame(state.animationId);
          window.speechSynthesis?.cancel();
  
          let delay = TIMEOUT_DELAY_MS;
  
          if (result === "cleared") {
            delay = correctRoundDelay(state.correctStreak);
          } else {
            state.correctStreak = 0;
            resetShooterPickerProgress();
          }
  
          scheduleNextRound(delay);
        }
  
        function handleWrongGuess() {
          state.locked = true;
          state.waitingForWordsToLeave = true;
          state.correctStreak = 0;
          resetShooterPickerProgress();
          window.speechSynthesis?.cancel();
  
          state.activeWords.forEach((token) => {
            if (!token.done && !token.exploding) {
              token.el.classList.add("flash");
            }
          });
        }
  
        function recordGuess(correct) {
          if (!state.db || !state.target) {
            return;
          }
  
          const lesson = state.target.lesson ?? lessonForWord(state.target.word);
          const lessonNumber = Number(lesson);
          const metric = {
            timestamp: new Date().toISOString(),
            word: state.target.word,
            lesson: lesson !== null && lesson !== "" && Number.isInteger(lessonNumber) ? lessonNumber : null,
            correct: Boolean(correct)
          };
  
          addMetric(metric).catch((error) => {
            console.warn(error.message || "Could not save metric.");
          });
        }
  
        function renderMetricsChart(metrics) {
          const summaries = summarizeMetricsByLesson(metrics);
          metricsChartPanelEl.hidden = false;
          metricsChartOutputEl.innerHTML = "";
  
          if (summaries.length === 0) {
            const empty = document.createElement("p");
            empty.className = "metrics-empty";
            empty.textContent = "No lesson metrics to show yet.";
            metricsChartOutputEl.appendChild(empty);
            return;
          }
  
          const chartWidth = Math.max(520, 120 + summaries.length * 78);
          const chartHeight = 410;
          const margin = {
            top: 78,
            right: 28,
            bottom: 68,
            left: 54
          };
          const plotWidth = chartWidth - margin.left - margin.right;
          const plotHeight = chartHeight - margin.top - margin.bottom;
          const maxCount = Math.max(1, ...summaries.map((summary) => Math.max(summary.correct, summary.incorrect)));
          const yMax = niceMax(maxCount);
          const groupWidth = plotWidth / summaries.length;
          const barWidth = Math.min(22, Math.max(12, groupWidth * 0.28));
          const svg = createSvgElement("svg", {
            class: "metrics-chart",
            width: chartWidth,
            height: chartHeight,
            viewBox: `0 0 ${chartWidth} ${chartHeight}`,
            role: "img",
            "aria-label": "Metrics by lesson"
          });
  
          drawChartAxes(svg, margin, plotWidth, plotHeight, yMax, chartWidth, chartHeight);
          summaries.forEach((summary, index) => {
            const centerX = margin.left + groupWidth * index + groupWidth / 2;
            const redX = centerX - barWidth - 3;
            const blueX = centerX + 3;
            const correctHeight = (summary.correct / yMax) * plotHeight;
            const incorrectHeight = (summary.incorrect / yMax) * plotHeight;
            const baselineY = margin.top + plotHeight;
            const percentY = Math.min(
              baselineY - Math.max(correctHeight, incorrectHeight) - 12,
              margin.top + plotHeight - 8
            );
  
            svg.appendChild(createMetricsBar(summary, "incorrect", {
              x: redX,
              y: baselineY - incorrectHeight,
              width: barWidth,
              height: incorrectHeight,
              fill: "#ef2424",
              stroke: "#17202a",
              "stroke-width": 1.5
            }));
            svg.appendChild(createMetricsBar(summary, "correct", {
              x: blueX,
              y: baselineY - correctHeight,
              width: barWidth,
              height: correctHeight,
              fill: "#14aee8",
              stroke: "#17202a",
              "stroke-width": 1.5
            }));
            svg.appendChild(createSvgText(`${summary.percent.toFixed(2)}%`, {
              x: centerX,
              y: Math.max(18, percentY),
              "text-anchor": "middle",
              "font-size": 12,
              "font-weight": 800,
              fill: "#17202a"
            }));
            svg.appendChild(createSvgText(String(summary.lesson), {
              x: centerX,
              y: baselineY + 28,
              "text-anchor": "middle",
              "font-size": 14,
              "font-weight": 900,
              fill: "#1f3fff"
            }));
          });
  
          drawChartLegend(svg, chartWidth, margin.top - 36);
  
          const scroll = document.createElement("div");
          scroll.className = "metrics-chart-scroll";
          const tooltip = document.createElement("div");
          tooltip.className = "metrics-chart-tooltip";
          tooltip.hidden = true;
          tooltip.setAttribute("role", "tooltip");
          scroll.appendChild(svg);
          scroll.appendChild(tooltip);
          metricsChartOutputEl.appendChild(scroll);
          wireMetricsTooltips(scroll, tooltip);
        }
  
        function summarizeMetricsByLesson(metrics) {
          const lessonGroups = new Map();
  
          metrics.forEach((metric) => {
            const lesson = Number(metric.lesson);
            if (!Number.isInteger(lesson)) {
              return;
            }
  
            if (!lessonGroups.has(lesson)) {
              lessonGroups.set(lesson, {
                lesson,
                correct: 0,
                incorrect: 0,
                correctWords: [],
                incorrectWords: []
              });
            }
  
            const group = lessonGroups.get(lesson);
            const word = normalizeMetricWord(metric.word);
            if (isCorrectMetric(metric.correct)) {
              group.correct += 1;
              group.correctWords.push(word);
            } else {
              group.incorrect += 1;
              group.incorrectWords.push(word);
            }
          });
  
          return [...lessonGroups.values()]
            .map((group) => {
              const total = group.correct + group.incorrect;
              return {
                ...group,
                total,
                percent: total === 0 ? 0 : (group.correct / total) * 100
              };
            })
            .sort((a, b) => a.percent - b.percent || a.lesson - b.lesson);
        }
  
        function createMetricsBar(summary, result, attributes) {
          const isCorrect = result === "correct";
          const count = isCorrect ? summary.correct : summary.incorrect;
          const words = isCorrect ? summary.correctWords : summary.incorrectWords;
          const wordSummary = formatMetricWordSummary(words);
          const label = `Lesson ${summary.lesson} ${result} guesses: ${count}. ${wordSummary}`;
          const bar = createSvgElement("rect", {
            ...attributes,
            class: "metrics-chart-bar",
            tabindex: "0",
            role: "img",
            "aria-label": label,
            "data-lesson": summary.lesson,
            "data-result": result,
            "data-count": count,
            "data-words": wordSummary
          });
          const title = createSvgElement("title");
          title.textContent = label;
          bar.appendChild(title);
          return bar;
        }
  
        function wireMetricsTooltips(scroll, tooltip) {
          scroll.querySelectorAll(".metrics-chart-bar").forEach((bar) => {
            bar.addEventListener("mouseenter", (event) => showMetricsTooltip(event, scroll, tooltip));
            bar.addEventListener("mousemove", (event) => positionMetricsTooltip(event, scroll, tooltip));
            bar.addEventListener("mouseleave", () => hideMetricsTooltip(tooltip));
            bar.addEventListener("focus", (event) => showMetricsTooltip(event, scroll, tooltip));
            bar.addEventListener("blur", () => hideMetricsTooltip(tooltip));
          });
        }
  
        function showMetricsTooltip(event, scroll, tooltip) {
          const bar = event.currentTarget;
          const resultLabel = bar.dataset.result === "correct" ? "Correct" : "Incorrect";
          const title = document.createElement("div");
          const words = document.createElement("div");
  
          title.className = "metrics-tooltip-title";
          title.textContent = `Lesson ${bar.dataset.lesson}: ${resultLabel} (${bar.dataset.count})`;
          words.textContent = bar.dataset.words;
          tooltip.replaceChildren(title, words);
          tooltip.hidden = false;
          positionMetricsTooltip(event, scroll, tooltip);
        }
  
        function positionMetricsTooltip(event, scroll, tooltip) {
          const scrollRect = scroll.getBoundingClientRect();
          const sourceRect = event.currentTarget.getBoundingClientRect();
          const clientX = Number.isFinite(event.clientX)
            ? event.clientX
            : sourceRect.left + sourceRect.width / 2;
          const clientY = Number.isFinite(event.clientY)
            ? event.clientY
            : sourceRect.top;
          const minLeft = scroll.scrollLeft + 130;
          const maxLeft = scroll.scrollLeft + scroll.clientWidth - 130;
          const left = clientX - scrollRect.left + scroll.scrollLeft;
          const top = clientY - scrollRect.top + scroll.scrollTop;
  
          tooltip.style.left = `${clamp(left, minLeft, Math.max(minLeft, maxLeft))}px`;
          tooltip.style.top = `${Math.max(scroll.scrollTop + 42, top)}px`;
        }
  
        function hideMetricsTooltip(tooltip) {
          tooltip.hidden = true;
        }
  
        function normalizeMetricWord(word) {
          const value = String(word ?? "").trim();
          return value || "(unknown word)";
        }
  
        function formatMetricWordSummary(words) {
          if (words.length === 0) {
            return "No words.";
          }
  
          const counts = new Map();
          words.forEach((word) => {
            counts.set(word, (counts.get(word) || 0) + 1);
          });
  
          return [...counts.entries()]
            .sort((a, b) => a[0].localeCompare(b[0], undefined, { sensitivity: "base" }))
            .map(([word, count]) => count > 1 ? `${word} (${count})` : word)
            .join(", ");
        }
  
        function isCorrectMetric(value) {
          return value === true || value === "true" || value === "T" || value === "1" || value === 1;
        }
  
        function drawChartAxes(svg, margin, plotWidth, plotHeight, yMax, chartWidth, chartHeight) {
          const baselineY = margin.top + plotHeight;
          const axisEndX = margin.left + plotWidth;
          const tickCount = Math.min(5, yMax);
  
          svg.appendChild(createSvgElement("line", {
            x1: margin.left,
            y1: margin.top - 10,
            x2: margin.left,
            y2: baselineY,
            stroke: "#17202a",
            "stroke-width": 2
          }));
          svg.appendChild(createSvgElement("line", {
            x1: margin.left,
            y1: baselineY,
            x2: axisEndX + 12,
            y2: baselineY,
            stroke: "#17202a",
            "stroke-width": 2
          }));
          svg.appendChild(createSvgElement("path", {
            d: `M${margin.left - 5} ${margin.top - 6} L${margin.left} ${margin.top - 18} L${margin.left + 5} ${margin.top - 6}`,
            fill: "#17202a"
          }));
          svg.appendChild(createSvgElement("path", {
            d: `M${axisEndX + 18} ${baselineY} L${axisEndX + 6} ${baselineY - 5} L${axisEndX + 6} ${baselineY + 5}`,
            fill: "#17202a"
          }));
  
          for (let index = 0; index <= tickCount; index += 1) {
            const value = Math.round((yMax / tickCount) * index);
            const y = baselineY - (plotHeight / tickCount) * index;
  
            svg.appendChild(createSvgElement("line", {
              x1: margin.left - 7,
              y1: y,
              x2: margin.left,
              y2: y,
              stroke: "#17202a",
              "stroke-width": 1.5
            }));
            svg.appendChild(createSvgText(String(value), {
              x: margin.left - 12,
              y: y + 4,
              "text-anchor": "end",
              "font-size": 12,
              "font-weight": 700,
              fill: "#17202a"
            }));
          }
  
          svg.appendChild(createSvgText("Count", {
            x: 18,
            y: margin.top + plotHeight / 2,
            transform: `rotate(-90 18 ${margin.top + plotHeight / 2})`,
            "text-anchor": "middle",
            "font-size": 16,
            "font-weight": 900,
            fill: "#ef2424"
          }));
          svg.appendChild(createSvgText("Lesson", {
            x: margin.left + plotWidth / 2,
            y: chartHeight - 18,
            "text-anchor": "middle",
            "font-size": 16,
            "font-weight": 900,
            fill: "#ef2424"
          }));
          svg.appendChild(createSvgText("Percent labels show percent correct", {
            x: chartWidth / 2,
            y: 20,
            "text-anchor": "middle",
            "font-size": 13,
            "font-weight": 800,
            fill: "#17202a"
          }));
        }
  
        function drawChartLegend(svg, chartWidth, y) {
          const legendX = Math.max(110, chartWidth - 210);
  
          svg.appendChild(createSvgElement("rect", {
            x: legendX,
            y,
            width: 12,
            height: 12,
            fill: "#ef2424",
            stroke: "#17202a"
          }));
          svg.appendChild(createSvgText("Incorrect", {
            x: legendX + 18,
            y: y + 11,
            "font-size": 12,
            "font-weight": 800,
            fill: "#17202a"
          }));
          svg.appendChild(createSvgElement("rect", {
            x: legendX + 86,
            y,
            width: 12,
            height: 12,
            fill: "#14aee8",
            stroke: "#17202a"
          }));
          svg.appendChild(createSvgText("Correct", {
            x: legendX + 104,
            y: y + 11,
            "font-size": 12,
            "font-weight": 800,
            fill: "#17202a"
          }));
        }
  
        function niceMax(value) {
          const magnitude = 10 ** Math.floor(Math.log10(value));
          const normalized = value / magnitude;
          const niceNormalized = normalized <= 2 ? 2 : normalized <= 5 ? 5 : 10;
  
          return niceNormalized * magnitude;
        }
  
        function createSvgElement(tagName, attributes = {}) {
          const element = document.createElementNS("http://www.w3.org/2000/svg", tagName);
          Object.entries(attributes).forEach(([name, value]) => {
            element.setAttribute(name, value);
          });
          return element;
        }
  
        function createSvgText(text, attributes = {}) {
          const element = createSvgElement("text", attributes);
          element.textContent = text;
          return element;
        }
  
        function correctRoundDelay(streak) {
          return Math.min(3400, RESULT_DELAY_MS + streak * FIREWORK_SERIES_GAP_MS);
        }
  
        function explodeWord(token, fireworkCount) {
          token.exploding = true;
          token.done = true;
  
          const rect = token.el.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
  
          token.el.remove();
          spawnFireworkSeries(centerX, centerY, fireworkCount);
        }
  
        function resizeFireworksCanvas() {
          const ratio = Math.min(window.devicePixelRatio || 1, 2);
          const rect = arenaEl.getBoundingClientRect();
  
          fireworkWidth = rect.width || window.innerWidth;
          fireworkHeight = rect.height || window.innerHeight;
          fireworksCanvasEl.width = Math.floor(fireworkWidth * ratio);
          fireworksCanvasEl.height = Math.floor(fireworkHeight * ratio);
          fireworksCtx.setTransform(ratio, 0, 0, ratio, 0, 0);
          fireworksCtx.clearRect(0, 0, fireworkWidth, fireworkHeight);
        }
  
        function clearFireworks() {
          effects.clear();
          fireworkBursts.length = 0;
          fireworksCtx.globalCompositeOperation = "source-over";
          fireworksCtx.globalAlpha = 1;
          fireworksCtx.clearRect(0, 0, fireworkWidth, fireworkHeight);
        }
  
        function spawnFireworkSeries(centerX, centerY, count) {
          const palette = FIREWORK_PALETTES[randomInt(0, FIREWORK_PALETTES.length - 1)];
          const spread = Math.min(180, 44 + count * 10);
  
          for (let index = 0; index < count; index += 1) {
            effects.later(() => {
              const angle = count === 1 ? 0 : (Math.PI * 2 * index) / count + randomBetween(-0.28, 0.28);
              const distance = count === 1 ? 0 : randomBetween(24, spread);
              const x = clamp(centerX + Math.cos(angle) * distance, 36, fireworkWidth - 36);
              const y = clamp(centerY + Math.sin(angle) * distance, 52, fireworkHeight - 120);
  
              spawnFireworkBurst(x, y, palette);
            }, index * FIREWORK_SERIES_GAP_MS);
          }
        }
  
        function spawnFireworkBurst(centerX, centerY, colors) {
          const particleCount = Math.floor(randomBetween(52, 86));
          const particles = [];
  
          for (let index = 0; index < particleCount; index += 1) {
            const angle = (Math.PI * 2 * index) / particleCount + randomBetween(-0.1, 0.1);
            const speed = randomBetween(1.4, 5.2);
  
            particles.push({
              x: centerX,
              y: centerY,
              vx: Math.cos(angle) * speed,
              vy: Math.sin(angle) * speed,
              drag: randomBetween(0.982, 0.991),
              gravity: randomBetween(0.024, 0.044),
              size: randomBetween(1.2, 2.8),
              life: 0,
              maxLife: randomBetween(70, 112),
              color: colors[randomInt(0, colors.length - 1)]
            });
          }
  
          fireworkBursts.push({ particles });
        }
  
        function drawFireworks(now) {
          const delta = Math.min((now - lastFireworkFrame) / 16.67, 2);
          lastFireworkFrame = now;
  
          fireworksCtx.globalCompositeOperation = "source-over";
          fireworksCtx.globalAlpha = 1;
          fireworksCtx.clearRect(0, 0, fireworkWidth, fireworkHeight);
          fireworksCtx.globalCompositeOperation = "lighter";
  
          for (let index = fireworkBursts.length - 1; index >= 0; index -= 1) {
            const burst = fireworkBursts[index];
            let aliveParticles = 0;
  
            for (const particle of burst.particles) {
              if (particle.life >= particle.maxLife) {
                continue;
              }
  
              particle.life += delta;
              particle.vx *= particle.drag;
              particle.vy = particle.vy * particle.drag + particle.gravity * delta;
              particle.x += particle.vx * delta;
              particle.y += particle.vy * delta;
  
              const fade = Math.max(0, 1 - particle.life / particle.maxLife);
              fireworksCtx.globalAlpha = fade;
              fireworksCtx.fillStyle = particle.color;
              fireworksCtx.beginPath();
              fireworksCtx.arc(particle.x, particle.y, particle.size * fade + 0.35, 0, Math.PI * 2);
              fireworksCtx.fill();
  
              aliveParticles += 1;
            }
  
            if (aliveParticles === 0) {
              fireworkBursts.splice(index, 1);
            }
          }
  
          window.requestAnimationFrame(drawFireworks);
        }
  
        function isAllowedShotPointer(event) {
          return event.pointerType !== "mouse" || event.button === 0 || event.button === 2;
        }
  
        function isShotControlTarget(target) {
          return (
            target instanceof Element &&
            (
              target.closest("button") ||
              target.closest(".shooter-picker") ||
              target.closest(".settings-panel") ||
              target.closest(".settings-toggle")
            )
          );
        }
  
        function isGameShotTarget(target) {
          return state.running && !isShotControlTarget(target);
        }
  
        function findHitWords(x, y) {
          const tolerance = 12;
  
          return state.activeWords.filter((token) => {
            if (token.done || token.exploding) {
              return false;
            }
  
            const rect = token.el.getBoundingClientRect();
            return (
              x >= rect.left - tolerance &&
              x <= rect.right + tolerance &&
              y >= rect.top - tolerance &&
              y <= rect.bottom + tolerance
            );
          });
        }
  
        function shootAt(x, y) {
          shooterRegistry.shootAt({ x, y });
        }
  
        function updateAim() {
          shooterRegistry.aimAt(state.pointer);
        }
  
        function speakWord(word) {
          effects.speak(word);
        }
  
        function unlockSpeech() {
          effects.unlockSpeech();
        }
  
        function showError(message) {
          errorEl.hidden = false;
          errorEl.textContent = message;
          startButtonEl.disabled = true;
        }
  
        function shuffle(items) {
          const copy = [...items];
          for (let index = copy.length - 1; index > 0; index -= 1) {
            const swapIndex = randomInt(0, index);
            [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
          }
          return copy;
        }
  
        function randomInt(min, max) {
          return Math.floor(Math.random() * (max - min + 1)) + min;
        }
  
        function randomBetween(min, max) {
          return Math.random() * (max - min) + min;
        }
  
        function clamp(value, min, max) {
          return Math.min(Math.max(value, min), max);
        }
  
}
