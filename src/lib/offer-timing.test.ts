import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { hasReachedOfferTime, OFFER_DELAY_SECONDS } from "./offer-timing";

describe("delayed checkout offer", () => {
  it("reveals at video time 33:08, not before", () => {
    assert.equal(OFFER_DELAY_SECONDS, 1988);
    assert.equal(hasReachedOfferTime(1987.999), false);
    assert.equal(hasReachedOfferTime(1988), true);
    assert.equal(hasReachedOfferTime(2100), true);
    assert.equal(hasReachedOfferTime(0), false);
    assert.equal(hasReachedOfferTime(Number.NaN), false);
  });
});