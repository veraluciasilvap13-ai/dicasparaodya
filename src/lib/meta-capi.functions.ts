import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { z } from "zod";

const input = z.object({
  eventId: z.string().uuid(),
  eventSourceUrl: z.string().url().max(2000),
  // Latest consent record, re-read in the browser right before sending.
  consent: z.object({ choice: z.literal(true), version: z.string().max(50), at: z.string().max(40) }),
});

/** Sends PageView via Conversions API, only after explicit advertising acceptance. */
export const sendMetaPageView = createServerFn({ method: "POST" })
  .inputValidator((data) => input.parse(data))
  .handler(async ({ data }) => {
    const pixelId = process.env["META_PIXEL_ID"];
    const token = process.env["META_ACCESS_TOKEN"];
    if (!pixelId || !token) return { ok: false, error: "not_configured" };
    const req = getRequest();
    const h = req.headers;
    if (h.get("sec-gpc") === "1") return { ok: false, error: "gpc" };
    const cookies = Object.fromEntries(
      (h.get("cookie") || "").split(";").map((c) => c.trim().split("=")).filter((p) => p.length >= 2).map(([k, ...v]) => [k, v.join("=")]),
    );
    const ip = h.get("cf-connecting-ip") || h.get("x-forwarded-for")?.split(",")[0]?.trim();
    const event = {
      event_name: "PageView",
      event_time: Math.floor(Date.now() / 1000),
      event_id: data.eventId,
      action_source: "website",
      event_source_url: data.eventSourceUrl,
      user_data: {
        client_user_agent: h.get("user-agent") || undefined,
        client_ip_address: ip || undefined,
        fbp: cookies["_fbp"] || undefined,
        fbc: cookies["_fbc"] || undefined,
      },
    };
    try {
      const res = await fetch(`https://graph.facebook.com/v21.0/${pixelId}/events?access_token=${encodeURIComponent(token)}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: [event], partner_agent: "lovable" }),
      });
      if (!res.ok) {
        console.error("Meta CAPI error", res.status, await res.text());
        return { ok: false, error: "meta_error" };
      }
      return { ok: true };
    } catch (e) {
      console.error("Meta CAPI fetch failed", e);
      return { ok: false, error: "network" };
    }
  });
