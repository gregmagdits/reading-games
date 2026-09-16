import test from "node:test";
import assert from "node:assert/strict";
import { ALL_SOURCES } from "../js/word-catalog.mjs";
import { PRESET_DEFINITIONS, filterRowsByPresets, getPresetSelections, isPresetApplicable, normalizePresetIds } from "../js/presets.mjs";

const PRESET_ID = "silent_e_long_vowel";
const EXPECTED_PAIRS = [
  ["/ā/", "a_e"],
  ["/ă/", "a"],
  ["/ē/", "ee"],
  ["/ē/", "ea"],
  ["/ĕ/", "e"],
  ["/ī/", "i_e"],
  ["/ĭ/", "i"],
  ["/ō/", "o_e"],
  ["/ŏ/", "o"],
  ["/ū/", "u_e"],
  ["/ŭ/", "u"]
];

test("the long-vowel preset exposes the requested label and exact pairs", () => {
  const [preset] = PRESET_DEFINITIONS;
  assert.equal(preset.id, PRESET_ID);
  assert.equal(preset.label, "'e' -> long vowel rule");
  assert.deepEqual(
    preset.criteria.phonemeLetterPairs.map(({ phoneme, letterCombination }) => [phoneme, letterCombination]),
    EXPECTED_PAIRS
  );
});

test("the preset is enabled for Poster and All but not book sources", () => {
  const [preset] = PRESET_DEFINITIONS;
  assert.equal(isPresetApplicable(preset, "poster"), true);
  assert.equal(isPresetApplicable(preset, ALL_SOURCES), true);
  assert.equal(isPresetApplicable(preset, "OPG_Revised_Instructor.pdf"), false);
  assert.deepEqual(normalizePresetIds([PRESET_ID, "unknown", PRESET_ID]), [PRESET_ID]);
});

test("preset selections contain the requested multiselect values", () => {
  assert.deepEqual(getPresetSelections([PRESET_ID], "poster"), {
    sections: [],
    lessons: [],
    phonemes: ["/ā/", "/ă/", "/ē/", "/ĕ/", "/ī/", "/ĭ/", "/ō/", "/ŏ/", "/ū/", "/ŭ/"],
    letterCombinations: ["a_e", "a", "ee", "ea", "e", "i_e", "i", "o_e", "o", "u_e", "u"]
  });
});

test("preset filtering preserves exact pairs and is inert for inapplicable sources", () => {
  const rows = [
    { word: "cake", source: "poster", phonetic_symbol: "/ā/", letter_combination: "a_e" },
    { word: "day", source: "poster", phonetic_symbol: "/ā/", letter_combination: "ay" },
    { word: "wrong cross-product", source: "poster", phonetic_symbol: "/ā/", letter_combination: "a" },
    { word: "seed", source: "poster", phonetic_symbol: "/ē/", letter_combination: "ee" },
    { word: "book word", source: "OPG_Revised_Instructor.pdf", section: 1, lesson: 1 }
  ];

  const posterRows = rows.filter((row) => row.source === "poster");
  assert.deepEqual(filterRowsByPresets(posterRows, [PRESET_ID], "poster").map((row) => row.word), ["cake", "seed"]);
  assert.deepEqual(filterRowsByPresets(rows, [PRESET_ID], ALL_SOURCES).map((row) => row.word), ["cake", "seed"]);
  assert.deepEqual(filterRowsByPresets(rows, [PRESET_ID], "OPG_Revised_Instructor.pdf"), rows);
});
