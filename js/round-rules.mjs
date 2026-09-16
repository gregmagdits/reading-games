import { ALL_SOURCES, uniqueWords } from "./word-catalog.mjs";

export const MAGIC_E_CONTRAST_RULE_ID = "magic_e_short_long_contrast";

export const CUSTOM_RULE_DEFINITIONS = Object.freeze([
  Object.freeze({
    id: MAGIC_E_CONTRAST_RULE_ID,
    label: "Show a short/long magic-e pair each round",
    sources: Object.freeze(["poster"])
  })
]);

const definitionsById = new Map(CUSTOM_RULE_DEFINITIONS.map((rule) => [rule.id, rule]));
const MAGIC_E_ROW_TYPES = new Map([
  ["/ă/\u0000a", { family: "a", kind: "short" }],
  ["/ā/\u0000a_e", { family: "a", kind: "long" }],
  ["/ĕ/\u0000e", { family: "e", kind: "short" }],
  ["/ē/\u0000e_e", { family: "e", kind: "long" }],
  ["/ĭ/\u0000i", { family: "i", kind: "short" }],
  ["/ī/\u0000i_e", { family: "i", kind: "long" }],
  ["/ŏ/\u0000o", { family: "o", kind: "short" }],
  ["/ō/\u0000o_e", { family: "o", kind: "long" }],
  ["/ŭ/\u0000u", { family: "u", kind: "short" }],
  ["/ū/\u0000u_e", { family: "u", kind: "long" }]
]);

export function normalizeCustomRuleIds(ids) {
  if (!Array.isArray(ids)) return [];
  return [...new Set(ids.map(String).filter((id) => definitionsById.has(id)))];
}

export function isCustomRuleApplicable(rule, source) {
  return source === ALL_SOURCES || rule.sources.includes(source);
}

export function isMagicEContrastActive(ids, source) {
  return normalizeCustomRuleIds(ids).some((id) => {
    const rule = definitionsById.get(id);
    return id === MAGIC_E_CONTRAST_RULE_ID && isCustomRuleApplicable(rule, source);
  });
}

export function analyzeMagicEContrast(rows, candidateWords) {
  const candidates = new Map(uniqueWords(candidateWords).map((word) => [normalizeWord(word), word]));
  const families = new Map();

  for (const row of rows) {
    if (row.source !== "poster") continue;
    const type = MAGIC_E_ROW_TYPES.get(`${row.phonetic_symbol}\u0000${row.letter_combination}`);
    const word = candidates.get(normalizeWord(row.word));
    if (!type || !word) continue;
    if (!families.has(type.family)) families.set(type.family, { short: new Map(), long: new Map() });
    families.get(type.family)[type.kind].set(normalizeWord(word), word);
  }

  const viableFamilies = [];
  const exactPairs = [];
  for (const [family, words] of families) {
    if (words.short.size === 0 || words.long.size === 0) continue;
    viableFamilies.push({ family, short: [...words.short.values()], long: [...words.long.values()] });
    for (const [shortKey, shortWord] of words.short) {
      const longWord = words.long.get(`${shortKey}e`);
      if (longWord) exactPairs.push({ family, words: [shortWord, longWord] });
    }
  }

  return { valid: exactPairs.length > 0 || viableFamilies.length > 0, exactPairs, families: viableFamilies };
}

export function hasMagicEContrast(rows, candidateWords) {
  return analyzeMagicEContrast(rows, candidateWords).valid;
}

export function selectMagicERoundWords(rows, candidateWords, options = {}) {
  const random = options.random || Math.random;
  const distinctWords = uniqueWords(candidateWords);
  const wanted = Math.min(Math.max(2, options.count ?? distinctWords.length), distinctWords.length);
  const analysis = analyzeMagicEContrast(rows, distinctWords);
  if (!analysis.valid || wanted < 2) return [];

  let pair;
  if (analysis.exactPairs.length > 0) {
    pair = choose(analysis.exactPairs, random).words;
  } else {
    const family = choose(analysis.families, random);
    pair = [choose(family.short, random), choose(family.long, random)];
  }

  const selected = uniqueWords(pair);
  const selectedKeys = new Set(selected.map(normalizeWord));
  const remaining = distinctWords.filter((word) => !selectedKeys.has(normalizeWord(word)));
  const minPrefix = Math.max(0, Number.isFinite(Number(options.minPrefix)) ? Math.floor(Number(options.minPrefix)) : 1);
  const maxPrefix = Math.max(minPrefix, Number.isFinite(Number(options.maxPrefix)) ? Math.floor(Number(options.maxPrefix)) : minPrefix);
  const prefixLength = minPrefix + Math.floor(random() * (maxPrefix - minPrefix + 1));
  const anchorPrefix = normalizeWord(selected[0]).slice(0, prefixLength);
  const matching = shuffle(remaining.filter((word) => normalizeWord(word).slice(0, prefixLength) === anchorPrefix), random);
  const matchingKeys = new Set(matching.map(normalizeWord));
  const others = shuffle(remaining.filter((word) => !matchingKeys.has(normalizeWord(word))), random);

  return selected.concat(matching, others).slice(0, wanted);
}

function normalizeWord(word) {
  return String(word ?? "").trim().toLocaleLowerCase();
}

function choose(values, random) {
  return values[Math.floor(random() * values.length)];
}

function shuffle(values, random) {
  const shuffled = [...values];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const other = Math.floor(random() * (index + 1));
    [shuffled[index], shuffled[other]] = [shuffled[other], shuffled[index]];
  }
  return shuffled;
}
