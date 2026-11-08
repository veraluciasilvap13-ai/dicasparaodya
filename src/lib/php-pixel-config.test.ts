import { it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

it("PHP sends events to the Meta Graph events endpoint", () => {
  const source = readFileSync(new URL("../../public/api-pixel.php", import.meta.url), "utf8");
  assert.equal(source.includes('curl_init("https://graph.facebook.com/v26.0/{$pixel_id}/events?access_token={$access_token}")'), true);
});

it("PHP does not send production events with a test event code", () => {
  const source = readFileSync(new URL("../../public/api-pixel.php", import.meta.url), "utf8");
  assert.equal(source.includes("test_event_code"), false);
});