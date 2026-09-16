import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { parseCsv, validateTeachingCsv } from "../js/word-catalog.mjs";
import { analyzeMagicEContrast } from "../js/round-rules.mjs";

const sourceText = fs.readFileSync(new URL("../magic_e_phoneme_examples.csv", import.meta.url), "utf8").replace(/^\uFEFF/, "");
const teachingText = fs.readFileSync(new URL("../teaching-reading-words.csv", import.meta.url), "utf8");
const [, ...sourceRows] = parseCsv(sourceText).filter((row) => row.some((value) => value.trim()));
const teachingRows = validateTeachingCsv(teachingText);

function logicalKey(word, letterCombination, phoneticSymbol, source = "poster") {
  return `${word.toLocaleLowerCase()}\u0000${letterCombination}\u0000${phoneticSymbol}\u0000${source}`;
}

test("every magic-e source row is represented once in the teaching database", () => {
  assert.equal(sourceRows.length, 144);
  const teachingByKey = new Map();
  teachingRows.forEach((row) => {
    const key = logicalKey(row.word, row.letter_combination, row.phonetic_symbol, row.source);
    if (!teachingByKey.has(key)) teachingByKey.set(key, []);
    teachingByKey.get(key).push(row);
  });

  sourceRows.forEach(([word, letterCombination, phoneme]) => {
    const matches = teachingByKey.get(logicalKey(word, letterCombination, phoneme)) || [];
    assert.equal(matches.length, 1, `${word}/${letterCombination}/${phoneme} should occur once`);
    assert.deepEqual(
      { section: matches[0].section, lesson: matches[0].lesson, description: matches[0].lesson_description, sight: matches[0].is_sight_word },
      { section: 0, lesson: 0, description: "Phoneme poster examples", sight: "F" }
    );
  });
});

test("the merged data supplies 72 exact magic-e pairs across all vowel families", () => {
  const candidateWords = sourceRows.map(([word]) => word);
  const analysis = analyzeMagicEContrast(teachingRows, candidateWords);
  assert.equal(analysis.exactPairs.length, 72);
  assert.deepEqual(new Set(analysis.exactPairs.map((pair) => pair.family)), new Set(["a", "e", "i", "o", "u"]));
});
