import test from "node:test";
import assert from "node:assert/strict";
import { ShooterRegistry } from "../js/shooter-registry.mjs";
import { shooterDefinitions } from "../js/shooters/index.mjs";
import { MemoryStorage, SettingsStore, createSettingsNormalizer } from "../js/settings-store.mjs";

test("settings round-trip through an in-memory storage adapter", () => {
  const storage = new MemoryStorage();
  const registry = new ShooterRegistry(shooterDefinitions);
  const store = new SettingsStore({ storage, normalize:createSettingsNormalizer(registry) });
  store.save({ shooterType:"wizard", shooterVisibility:{ laser:false }, wordSpeed:3, maximumWords:2, customRules:["magic_e_short_long_contrast"] });
  const saved = store.load();
  assert.equal(saved.shooterType, "wizard"); assert.equal(saved.shooterVisibility.laser, false); assert.equal(saved.shooterVisibility.dragon, true); assert.equal(saved.wordSpeed, 3); assert.equal(saved.maximumWords, 2); assert.deepEqual(saved.customRules, ["magic_e_short_long_contrast"]);
});

test("unknown stored shooter ids and malformed JSON are safe", () => {
  const registry = new ShooterRegistry(shooterDefinitions);
  const storage = new MemoryStorage({ shootingWordsSettings:'{"shooterType":"gone","shooterVisibility":{"dragon":false}}' });
  const store = new SettingsStore({ storage, normalize:createSettingsNormalizer(registry) });
  assert.equal(store.load().shooterType, "laser"); assert.equal(store.load().shooterVisibility.dragon, false); assert.equal(store.load().shooterVisibility.zeus, true);
  storage.setItem("shootingWordsSettings", "not json"); assert.equal(store.load().shooterType, "laser");
});
