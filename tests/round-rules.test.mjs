import test from "node:test";
import assert from "node:assert/strict";
import { ALL_SOURCES } from "../js/word-catalog.mjs";
import {
  CUSTOM_RULE_DEFINITIONS,
  MAGIC_E_CONTRAST_RULE_ID,
  analyzeMagicEContrast,
  hasMagicEContrast,
  isCustomRuleApplicable,
  isMagicEContrastActive,
  normalizeCustomRuleIds,
  selectMagicERoundWords
} from "../js/round-rules.mjs";

const row = (word, phonetic_symbol, letter_combination, source = "poster") => ({ word, phonetic_symbol, letter_combination, source });

test("custom rule ids normalize and apply only to Poster and All", () => {
  const [rule] = CUSTOM_RULE_DEFINITIONS;
  assert.equal(rule.id, MAGIC_E_CONTRAST_RULE_ID);
  assert.equal(rule.label, "Show a short/long magic-e pair each round");
  assert.deepEqual(normalizeCustomRuleIds([rule.id, "unknown", rule.id]), [rule.id]);
  assert.equal(isCustomRuleApplicable(rule, "poster"), true);
  assert.equal(isCustomRuleApplicable(rule, ALL_SOURCES), true);
  assert.equal(isCustomRuleApplicable(rule, "OPG_Revised_Instructor.pdf"), false);
  assert.equal(isMagicEContrastActive([rule.id], "poster"), true);
  assert.equal(isMagicEContrastActive([rule.id], "OPG_Revised_Instructor.pdf"), false);
});

test("exact base plus e pairs are preferred and preserve display capitalization", () => {
  const rows = [
    row("pet", "/ĕ/", "e"),
    row("Pete", "/ē/", "e_e"),
    row("bed", "/ĕ/", "e"),
    row("theme", "/ē/", "e_e")
  ];
  const analysis = analyzeMagicEContrast(rows, ["pet", "Pete", "bed", "theme", "bonus"]);
  assert.deepEqual(analysis.exactPairs.map((pair) => pair.words), [["pet", "Pete"]]);
  assert.deepEqual(
    selectMagicERoundWords(rows, ["pet", "Pete", "bed", "theme", "bonus"], { count: 2, minPrefix: 1, maxPrefix: 1, random: () => 0 }),
    ["pet", "Pete"]
  );
});

test("same-vowel words are used when no exact variant survives", () => {
  const rows = [
    row("cap", "/ă/", "a"),
    row("made", "/ā/", "a_e"),
    row("sit", "/ĭ/", "i")
  ];
  assert.equal(hasMagicEContrast(rows, ["cap", "made", "sit"]), true);
  assert.deepEqual(
    selectMagicERoundWords(rows, ["cap", "made", "sit"], { count: 2, random: () => 0 }),
    ["cap", "made"]
  );
  assert.equal(hasMagicEContrast(rows, ["cap", "sit"]), false);
});

test("rounds retain the requested size, unique words, and prefix-preferred fillers", () => {
  const rows = [row("hop", "/ŏ/", "o"), row("hope", "/ō/", "o_e")];
  const selected = selectMagicERoundWords(rows, ["hop", "hope", "hot", "hat", "dog"], {
    count: 4,
    minPrefix: 1,
    maxPrefix: 1,
    random: () => 0
  });
  assert.deepEqual(selected.slice(0, 2), ["hop", "hope"]);
  assert.deepEqual(new Set(selected.slice(2)), new Set(["hot", "hat"]));
  assert.equal(new Set(selected.map((word) => word.toLowerCase())).size, 4);
});

test("book rows cannot supply magic-e classifications", () => {
  const rows = [
    row("hop", "/ŏ/", "o", "OPG_Revised_Instructor.pdf"),
    row("hope", "/ō/", "o_e", "OPG_Revised_Instructor.pdf")
  ];
  assert.equal(hasMagicEContrast(rows, ["hop", "hope"]), false);
  assert.deepEqual(selectMagicERoundWords(rows, ["hop", "hope"], { count: 2 }), []);
});
