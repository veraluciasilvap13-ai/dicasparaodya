// Same-origin path served by the PHP file in public/, so the browser never
// needs a cross-origin permission check and the host runs the file directly.
export const ROUTE_PING_ENDPOINT = "/api-pixel.php";

export type RoutePingPayload = { url: string };

export function routePingPayload(href: string): RoutePingPayload {
  return { url: href };
}

export function sendRoutePing(href: string): void {
  if (typeof window === "undefined") return;
  void fetch(ROUTE_PING_ENDPOINT, {
    method: "POST",
    // Same-origin request: no preflight, and the PHP file reads the raw body
    // and decodes it as the JSON object below.
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(routePingPayload(href)),
    credentials: "omit",
    keepalive: true,
  }).catch(() => {
    /* Access notices are best-effort; a failed send must not break the page. */
  });
}
