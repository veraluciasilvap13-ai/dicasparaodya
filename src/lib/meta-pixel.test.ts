import { it } from "node:test";
import assert from "node:assert/strict";
import { META_PIXEL_ID, startMetaPixel } from "./meta-pixel";

it("initializes pixel 2660709101023593 and sends PageView once on repeated startup", () => {
  const calls: unknown[][] = [];
  const browser = { fbq: (...args: unknown[]) => calls.push(args) };
  const previous = Object.getOwnPropertyDescriptor(globalThis, "window");
  Object.defineProperty(globalThis, "window", { configurable: true, value: browser });
  try {
    assert.equal(META_PIXEL_ID, "2660709101023593");
    startMetaPixel();
    startMetaPixel();
    assert.deepEqual(calls.filter(call => call[0] === "init"), [
      ["init", "2660709101023593", {}, { agent: "lovable" }],
    ]);
    assert.equal(calls.filter(call => call[0] === "track" && call[1] === "PageView").length, 1);
  } finally {
    if (previous) Object.defineProperty(globalThis, "window", previous);
    else Reflect.deleteProperty(globalThis, "window");
  }
});