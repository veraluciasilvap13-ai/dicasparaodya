import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { hasReachedOfferTime, OFFER_DELAY_SECONDS } from "./offer-timing";

describe("delayed checkout offer", () => {
  it("reveals at video time 34:28, not before", () => {
    assert.equal(OFFER_DELAY_SECONDS, 2068);
    assert.equal(hasReachedOfferTime(2067.999), false);
    assert.equal(hasReachedOfferTime(2068), true);
    assert.equal(hasReachedOfferTime(2100), true);
    assert.equal(hasReachedOfferTime(0), false);
    assert.equal(hasReachedOfferTime(Number.NaN), false);
  });
});