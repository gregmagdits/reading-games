import test from "node:test";
import assert from "node:assert/strict";
import { EXPECTED_HEADERS, WordCatalog, capitalize, filterRows, normalizeRow, prefixGroups, selectRoundWords, validateTeachingCsv } from "../js/word-catalog.mjs";

const rows = [
  { section:1, lesson:2, lesson_description:"Short a", word:"cat", is_sight_word:"F", phonetic_symbol:"/ă/", letter_combination:"a", source:"book.csv" },
  { section:1, lesson:3, lesson_description:"Short a", word:"cap", is_sight_word:"F", phonetic_symbol:"/ă/", letter_combination:"a", source:"book.csv" },
  { section:0, lesson:0, lesson_description:"Phoneme poster examples", word:"ship", is_sight_word:"F", phonetic_symbol:"/sh/", letter_combination:"sh", source:"poster" }
];

test("CSV validation enforces the exact schema and normalizes values", () => {
  const text = `${EXPECTED_HEADERS.join(",")}\n1,2,Short a,cat,F,/ă/,a,book.csv\n`;
  assert.deepEqual(validateTeachingCsv(text, { allowedPhoneticSymbols:new Set(["/ă/"]) }), [rows[0]]);
  assert.throws(() => validateTeachingCsv(text.replace("section,", "chapter,")), /header/i);
  assert.throws(() => validateTeachingCsv(text.replace(",F,", ",X,")), /is_sight_word/);
});

test("legacy normalization and source-specific filtering remain compatible", () => {
  assert.equal(normalizeRow({ word:" old " }).source, "legacy-import");
  assert.equal(normalizeRow({ section:0, lesson:0, lesson_description:"Phoneme poster examples", word:"ship" }).source, "poster");
  assert.deepEqual(filterRows(rows, { source:"book.csv", sections:["1"], lessons:["2"] }).map((row) => row.word), ["cat"]);
  assert.deepEqual(filterRows(rows, { source:"poster", phonemes:["/sh/"], letterCombinations:["sh"] }).map((row) => row.word), ["ship"]);
  const catalog = new WordCatalog(rows); assert.deepEqual(catalog.sources(), ["book.csv", "poster"]); assert.equal(catalog.lessonLookup().get("cat").lesson, 2);
});

test("prefix ranges, capitalization, and round selection are deterministic", () => {
  const groups = prefixGroups(["cat", "cap", "dog"], 2);
  assert.deepEqual(groups.get("ca"), ["cat", "cap"]);
  assert.equal(capitalize("Cat", "uppercase"), "CAT"); assert.equal(capitalize("Cat", "lowercase"), "cat"); assert.equal(capitalize("Cat", "original"), "Cat");
  const randomValues = [0, 0, .9]; let index = 0;
  assert.deepEqual(selectRoundWords(["cat", "cap", "dog"], { count:2, minPrefix:2, maxPrefix:2, random:() => randomValues[index++] ?? 0 }), ["cat", "cap"]);
});
