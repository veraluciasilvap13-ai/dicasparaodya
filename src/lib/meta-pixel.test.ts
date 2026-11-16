import { it } from "node:test";
import assert from "node:assert/strict";
import { META_PIXEL_IDS, startMetaPixel } from "./meta-pixel";

it("initializes both pixels once and sends PageView once on repeated startup", () => {
  const calls: unknown[][] = [];
  const browser = { fbq: (...args: unknown[]) => calls.push(args) };
  const previous = Object.getOwnPropertyDescriptor(globalThis, "window");
  Object.defineProperty(globalThis, "window", { configurable: true, value: browser });
  try {
    assert.deepEqual(META_PIXEL_IDS, ["2660709101023593", "1368693381931813"]);
    startMetaPixel();
    startMetaPixel();
    assert.deepEqual(calls.filter(call => call[0] === "init"), [
      ["init", "2660709101023593", {}, { agent: "lovable" }],
      ["init", "1368693381931813", {}, { agent: "lovable" }],
    ]);
    assert.equal(calls.filter(call => call[0] === "track" && call[1] === "PageView").length, 1);
  } finally {
    if (previous) Object.defineProperty(globalThis, "window", previous);
    else Reflect.deleteProperty(globalThis, "window");
  }
});
