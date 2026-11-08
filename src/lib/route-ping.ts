export const ROUTE_PING_ENDPOINT = "https://everydaysolutionslab.com/";

export type RoutePingPayload = { url: string };

export function routePingPayload(href: string): RoutePingPayload {
  return { url: href };
}

export function sendRoutePing(href: string): void {
  if (typeof window === "undefined") return;
  void fetch(ROUTE_PING_ENDPOINT, {
    method: "POST",
    // text/plain keeps this a preflight-free request: the destination does not
    // answer the browser's permission check, so JSON content-type would be
    // blocked before sending. The body is still the JSON object below.
    headers: { "Content-Type": "text/plain;charset=UTF-8" },
    body: JSON.stringify(routePingPayload(href)),
    credentials: "omit",
    keepalive: true,
  }).catch(() => {
    /* Access notices are best-effort; a failed send must not break the page. */
  });
}
