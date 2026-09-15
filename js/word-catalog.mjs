export const EXPECTED_HEADERS = ["section", "lesson", "lesson_description", "word", "is_sight_word", "phonetic_symbol", "letter_combination", "source"];
export const LEGACY_WORD_SOURCE = "legacy-import";
export const ALL_SOURCES = "all";

export function parseCsv(text) {
  const rows = []; let row = []; let value = ""; let quoted = false;
  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    if (quoted) {
      if (char === '"' && text[i + 1] === '"') { value += '"'; i += 1; }
      else if (char === '"') quoted = false;
      else value += char;
    } else if (char === '"') quoted = true;
    else if (char === ",") { row.push(value); value = ""; }
    else if (char === "\n") { row.push(value); rows.push(row); row = []; value = ""; }
    else if (char !== "\r") value += char;
  }
  if (value || row.length) { row.push(value); rows.push(row); }
  return rows;
}

export function normalizeRow(row) {
  const section = Number.isInteger(Number(row.section)) ? Number(row.section) : 0;
  const lesson = Number.isInteger(Number(row.lesson)) ? Number(row.lesson) : 0;
  const description = String(row.lesson_description ?? "").trim() || "Imported words";
  const source = String(row.source ?? "").trim() || (section === 0 && lesson === 0 && (description === "Phoneme poster examples" || row.letter_combination) ? "poster" : LEGACY_WORD_SOURCE);
  return {
    section, lesson, lesson_description: description, word: String(row.word ?? "").trim(),
    is_sight_word: String(row.is_sight_word ?? "F").trim().toUpperCase(),
    phonetic_symbol: String(row.phonetic_symbol ?? "").trim(), letter_combination: String(row.letter_combination ?? "").trim(),
    source
  };
}

export function normalizeRows(rows) { return rows.map(normalizeRow).filter((row) => row.word); }

export function validateTeachingCsv(text, { allowedPhoneticSymbols } = {}) {
  const parsed = parseCsv(text).filter((row) => row.some((value) => value.trim()));
  if (!parsed.length) throw new Error("The CSV is empty.");
  const headers = parsed[0].map((header) => header.trim());
  if (headers.length !== EXPECTED_HEADERS.length || headers.some((header, index) => header !== EXPECTED_HEADERS[index])) throw new Error(`CSV header must be: ${EXPECTED_HEADERS.join(",")}`);
  const rows = parsed.slice(1).map((values, index) => {
    if (values.length !== headers.length) throw new Error(`CSV row ${index + 2} has ${values.length} columns; expected ${headers.length}.`);
    if (!String(values[7] ?? "").trim()) throw new Error(`CSV row ${index + 2} has no source.`);
    const row = normalizeRow(Object.fromEntries(headers.map((header, column) => [header, values[column]])));
    const section = row.section; const lesson = row.lesson;
    if (!Number.isInteger(section) || section < 0) throw new Error(`CSV row ${index + 2} has an invalid section.`);
    if (!Number.isInteger(lesson) || lesson < 0) throw new Error(`CSV row ${index + 2} has an invalid lesson.`);
    if (!row.lesson_description) throw new Error(`CSV row ${index + 2} has no lesson_description.`);
    if (!row.word) throw new Error(`CSV row ${index + 2} has no word.`);
    if (!new Set(["T", "F"]).has(row.is_sight_word)) throw new Error(`CSV row ${index + 2} has invalid is_sight_word.`);
    if (allowedPhoneticSymbols && row.phonetic_symbol && !allowedPhoneticSymbols.has(row.phonetic_symbol)) throw new Error(`CSV row ${index + 2} has an unknown phonetic_symbol.`);
    return { ...row, section, lesson };
  });
  if (!rows.length) throw new Error("The CSV has no word rows.");
  return rows;
}

export function filterRows(rows, filters = {}) {
  return rows.filter((row) => {
    if (filters.source === ALL_SOURCES) return true;
    if (filters.source && row.source !== filters.source) return false;
    if (row.source === "poster") return (!filters.phonemes?.length || filters.phonemes.map(String).includes(String(row.phonetic_symbol))) && (!filters.letterCombinations?.length || filters.letterCombinations.map(String).includes(String(row.letter_combination)));
    return (!filters.sections?.length || filters.sections.map(String).includes(String(row.section))) && (!filters.lessons?.length || filters.lessons.map(String).includes(String(row.lesson)));
  });
}

export function capitalize(word, mode) { return mode === "lowercase" ? word.toLowerCase() : mode === "original" ? word : word.toUpperCase(); }
export function prefixGroups(words, length) {
  const groups = new Map();
  for (const word of words) { const key = word.slice(0, Math.max(0, length)).toLowerCase(); if (!groups.has(key)) groups.set(key, []); groups.get(key).push(word); }
  return groups;
}
export function selectRoundWords(words, { count, minPrefix = 1, maxPrefix = minPrefix, random = Math.random } = {}) {
  const wanted = Math.min(count ?? words.length, words.length);
  const length = minPrefix + Math.floor(random() * (maxPrefix - minPrefix + 1));
  const shuffle = (values) => {
    const shuffled = [...values];
    for (let index = shuffled.length - 1; index > 0; index -= 1) {
      const other = Math.floor(random() * (index + 1));
      [shuffled[index], shuffled[other]] = [shuffled[other], shuffled[index]];
    }
    return shuffled;
  };
  if (length === 0) return shuffle(words).slice(0, wanted);
  const groups = [...prefixGroups(words, length).values()].filter((group) => group.length);
  if (!groups.length) return shuffle(words).slice(0, wanted);
  const complete = groups.filter((group) => group.length >= wanted);
  if (complete.length) return shuffle(complete[Math.floor(random() * complete.length)]).slice(0, wanted);
  const largestSize = Math.max(...groups.map((group) => group.length));
  const largest = groups.filter((group) => group.length === largestSize);
  const selected = shuffle(largest[Math.floor(random() * largest.length)]);
  const selectedSet = new Set(selected);
  return selected.concat(shuffle(words.filter((word) => !selectedSet.has(word))).slice(0, wanted - selected.length));
}

export class WordCatalog {
  constructor(rows = []) { this.rows = normalizeRows(rows); }
  replace(rows) { this.rows = normalizeRows(rows); return this; }
  filter(filters) { return filterRows(this.rows, filters); }
  sources() { return [...new Set(this.rows.map((row) => row.source))]; }
  values(field, rows = this.rows) { return [...new Set(rows.map((row) => row[field]).filter(Boolean))]; }
  lessonLookup(rows = this.rows) { return new Map(rows.map((row) => [row.word, { section: row.section, lesson: row.lesson, description: row.lesson_description }])); }
}
