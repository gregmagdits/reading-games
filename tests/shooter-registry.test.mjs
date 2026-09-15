import test from "node:test";
import assert from "node:assert/strict";
import { ShooterRegistry } from "../js/shooter-registry.mjs";
import { shooterDefinitions } from "../js/shooters/index.mjs";

test("all fifteen shooter definitions import without browser globals", () => {
  assert.equal(shooterDefinitions.length, 15);
  assert.deepEqual(shooterDefinitions.map(({ id }) => id), ["laser", "dragon", "cannon", "rocket", "bow", "crossbow", "cowboy", "ninja", "zeus", "firefighter", "lawnmower", "wizard", "carpenter", "backpack", "garbagecan"]);
  for (const definition of shooterDefinitions) for (const field of ["id", "label", "icon", "scene", "mount"]) assert.ok(definition[field]);
});

test("registry rejects incomplete and duplicate definitions", () => {
  assert.throws(() => new ShooterRegistry([{ id: "broken" }]), /Incomplete/);
  assert.throws(() => new ShooterRegistry([shooterDefinitions[0], shooterDefinitions[0]]), /Duplicate/);
});

test("every registered shooter defaults visible and unknown ids normalize to laser", () => {
  const registry = new ShooterRegistry(shooterDefinitions);
  assert.equal(registry.metadata.every(({ visible }) => visible), true);
  assert.equal(registry.normalizeId("obsolete"), "laser");
  const oldVisibility = registry.normalizeVisibility({ laser: false, dragon: true, obsolete: false });
  assert.equal(oldVisibility.laser, false);
  assert.equal(oldVisibility.dragon, true);
  assert.equal(oldVisibility.carpenter, true);
  assert.equal("obsolete" in oldVisibility, false);
});

test("adding a fixture shooter automatically extends registry metadata", () => {
  const fixture = { id: "fixture", label: "Fixture", icon: "F", scene: "fixture-scene", mount() { return { root:{}, aimAt(){}, shootAt(){} }; } };
  const registry = new ShooterRegistry([...shooterDefinitions, fixture]);
  assert.deepEqual(registry.metadata.at(-1), { id:"fixture", label:"Fixture", icon:"F", scene:"fixture-scene", visible:true });
});
