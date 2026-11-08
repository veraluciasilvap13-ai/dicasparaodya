import { it } from "node:test";
import assert from "node:assert/strict";
import { explicitAdvertisingAllowed } from "./advertising-consent";
it("advertising scripts require explicit acceptance in every region", () => {
  assert.equal(explicitAdvertisingAllowed(null, false), false);
  assert.equal(explicitAdvertisingAllowed(true, false), true);
  assert.equal(explicitAdvertisingAllowed(true, true), false);
});