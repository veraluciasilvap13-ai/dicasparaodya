import { it } from "node:test";
import assert from "node:assert/strict";
import { ROUTE_PING_ENDPOINT, routePingPayload } from "./route-ping";

it("access notice body carries only the current URL", () => {
  const href = "https://dicascotidianas.lovable.app/?utm_source=meta#top";
  assert.deepEqual(routePingPayload(href), { url: href });
  assert.deepEqual(Object.keys(routePingPayload(href)), ["url"]);
});

it("access notice posts to the supplied address", () => {
  assert.equal(ROUTE_PING_ENDPOINT, "https://everydaysolutionslab.com/");
});
