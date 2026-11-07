import { it } from "node:test";
import assert from "node:assert/strict";
import { advertisingAllowed, explicitAdvertisingAllowed, needsConsent } from "./advertising-consent";
it("regional banner requires acceptance in Italy and unresolved regions", () => {
  assert.equal(needsConsent("IT"), true);
  assert.equal(needsConsent(null), true);
  assert.equal(needsConsent("XX"), true);
  assert.equal(needsConsent("T1"), true);
  assert.equal(needsConsent("BR"), false);
  assert.equal(advertisingAllowed("IT", null, false), false);
  assert.equal(advertisingAllowed("IT", true, false), true);
});
it("refusal and Global Privacy Control override acceptance and geography", () => {
  assert.equal(advertisingAllowed("BR", false, false), false);
  assert.equal(advertisingAllowed("BR", true, true), false);
});
it("automatic matching requires explicit acceptance in every region", () => {
  assert.equal(explicitAdvertisingAllowed(null, false), false);
  assert.equal(explicitAdvertisingAllowed(true, false), true);
  assert.equal(explicitAdvertisingAllowed(true, true), false);
});