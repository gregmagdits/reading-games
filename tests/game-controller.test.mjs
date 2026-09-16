import test from "node:test";
import assert from "node:assert/strict";
import { normalizeMaximumWordCount } from "../js/game-controller.mjs";

test("maximum word count defaults to four and stays within the supported range", () => {
  assert.equal(normalizeMaximumWordCount(undefined), 4);
  assert.equal(normalizeMaximumWordCount("2"), 2);
  assert.equal(normalizeMaximumWordCount(3.4), 3);
  assert.equal(normalizeMaximumWordCount(1), 2);
  assert.equal(normalizeMaximumWordCount(12), 4);
});
