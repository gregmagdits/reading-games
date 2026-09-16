import { ALL_SOURCES } from "./word-catalog.mjs";

export const PRESET_DEFINITIONS = Object.freeze([
  Object.freeze({
    id: "silent_e_long_vowel",
    label: "'e' -> long vowel rule",
    sources: Object.freeze(["poster"]),
    criteria: Object.freeze({
      phonemeLetterPairs: Object.freeze([
        Object.freeze({ phoneme: "/ā/", letterCombination: "a_e" }),
        Object.freeze({ phoneme: "/ă/", letterCombination: "a" }),
        Object.freeze({ phoneme: "/ē/", letterCombination: "ee" }),
        Object.freeze({ phoneme: "/ē/", letterCombination: "ea" }),
        Object.freeze({ phoneme: "/ĕ/", letterCombination: "e" }),
        Object.freeze({ phoneme: "/ī/", letterCombination: "i_e" }),
        Object.freeze({ phoneme: "/ĭ/", letterCombination: "i" }),
        Object.freeze({ phoneme: "/ō/", letterCombination: "o_e" }),
        Object.freeze({ phoneme: "/ŏ/", letterCombination: "o" }),
        Object.freeze({ phoneme: "/ū/", letterCombination: "u_e" }),
        Object.freeze({ phoneme: "/ŭ/", letterCombination: "u" })
      ])
    })
  })
]);

const definitionsById = new Map(PRESET_DEFINITIONS.map((preset) => [preset.id, preset]));

export function normalizePresetIds(ids) {
  if (!Array.isArray(ids)) return [];
  return [...new Set(ids.map(String).filter((id) => definitionsById.has(id)))];
}

export function isPresetApplicable(preset, source) {
  return source === ALL_SOURCES || preset.sources.includes(source);
}

export function getPresetSelections(ids, source) {
  const presets = normalizePresetIds(ids)
    .map((id) => definitionsById.get(id))
    .filter((preset) => isPresetApplicable(preset, source));
  const pairs = presets.flatMap((preset) => preset.criteria.phonemeLetterPairs || []);
  return {
    sections: [...new Set(presets.flatMap((preset) => preset.criteria.sections || []).map(String))],
    lessons: [...new Set(presets.flatMap((preset) => preset.criteria.lessons || []).map(String))],
    phonemes: [...new Set(pairs.map((pair) => pair.phoneme))],
    letterCombinations: [...new Set(pairs.map((pair) => pair.letterCombination))]
  };
}

export function filterRowsByPresets(rows, ids, selectedSource) {
  const activePresets = normalizePresetIds(ids)
    .map((id) => definitionsById.get(id))
    .filter((preset) => isPresetApplicable(preset, selectedSource));
  if (activePresets.length === 0) return rows;

  return rows.filter((row) => {
    return activePresets.some((preset) => matchesPreset(row, preset));
  });
}

function matchesPreset(row, preset) {
  const criteria = preset.criteria;
  const pairs = criteria.phonemeLetterPairs || [];
  if (pairs.length && !pairs.some((pair) => pair.phoneme === row.phonetic_symbol && pair.letterCombination === row.letter_combination)) return false;
  if (criteria.sections?.length && !criteria.sections.map(String).includes(String(row.section))) return false;
  if (criteria.lessons?.length && !criteria.lessons.map(String).includes(String(row.lesson))) return false;
  return true;
}
