import test from "node:test";
import assert from "node:assert/strict";
import { InMemoryReadingAdapter } from "../js/reading-repository.mjs";

test("in-memory reading adapter mirrors repository row and metric operations", async () => {
  const repository = new InMemoryReadingAdapter({ rows:[{ word:"cat" }] });
  assert.deepEqual(await repository.readRows(), [{ word:"cat" }]);
  await repository.replaceRows([{ word:"dog" }]); assert.deepEqual(await repository.readRows(), [{ word:"dog" }]);
  await repository.addMetric({ correct:true }); assert.deepEqual(await repository.readMetrics(), [{ correct:true }]);
  await repository.clearRows(); await repository.clearMetrics(); assert.deepEqual(await repository.readRows(), []); assert.deepEqual(await repository.readMetrics(), []);
});
