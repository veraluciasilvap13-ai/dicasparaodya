import { describe, expect, test } from "bun:test";
import { hasReachedOfferTime, OFFER_DELAY_SECONDS } from "./offer-timing";

describe("delayed checkout offer", () => {
  test("reveals at video time 34:28, not before", () => {
    expect(OFFER_DELAY_SECONDS).toBe(2068);
    expect(hasReachedOfferTime(2067.999)).toBe(false);
    expect(hasReachedOfferTime(2068)).toBe(true);
    expect(hasReachedOfferTime(2100)).toBe(true);
    expect(hasReachedOfferTime(0)).toBe(false);
    expect(hasReachedOfferTime(Number.NaN)).toBe(false);
  });
});