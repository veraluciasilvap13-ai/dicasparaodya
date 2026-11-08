import { it } from "node:test";
import assert from "node:assert/strict";
import { explicitAdvertisingAllowed, visitorTimeZone } from "./advertising-consent";
it("advertising scripts require explicit acceptance in every region", () => {
  assert.equal(explicitAdvertisingAllowed(null, false), false);
  assert.equal(explicitAdvertisingAllowed(true, false), true);
  assert.equal(explicitAdvertisingAllowed(true, true), false);
  assert.equal(explicitAdvertisingAllowed(false, false), false);
});
it("reads the visitor timezone locally without using it to grant consent", () => {
  assert.equal(visitorTimeZone(() => "Europe/Rome"), "Europe/Rome");
  assert.equal(explicitAdvertisingAllowed(null, false), false);
});
it("an unavailable timezone stays unknown", () => {
  assert.equal(visitorTimeZone(() => { throw new Error("Unavailable"); }), null);
});