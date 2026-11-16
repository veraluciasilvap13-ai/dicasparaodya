export const META_PIXEL_IDS = ["2660709101023593", "1368693381931813"];

type Fbq = ((...args: unknown[]) => void) & { callMethod?: (...a: unknown[]) => void; queue?: unknown[][]; push?: unknown; loaded?: boolean; version?: string };
declare global { interface Window { fbq?: Fbq; _fbq?: Fbq } }

let started = false;

/** Started on page load by the tracking starter; PageView reaches every configured pixel. */
export function startMetaPixel() {
  if (started || typeof window === "undefined") return;
  started = true;
  if (!window.fbq) {
    const n = function (...args: unknown[]) {
      if (n.callMethod) n.callMethod.apply(n, args); else n.queue?.push(args);
    } as Fbq;
    window.fbq = n;
    if (!window._fbq) window._fbq = n;
    n.push = n; n.loaded = true; n.version = "2.0"; n.queue = [];
    const t = document.createElement("script");
    t.async = true;
    t.src = "https://connect.facebook.net/en_US/fbevents.js";
    document.head.appendChild(t);
  }
  for (const id of META_PIXEL_IDS) {
    window.fbq("init", id, {}, { agent: "lovable" });
  }
  const eventId = crypto.randomUUID();
  window.fbq("track", "PageView", {}, { eventID: eventId });
  return eventId;
}

export function metaPixelStarted() { return started; }

export function trackInitiateCheckout() {
  if (started && window.fbq) window.fbq("track", "InitiateCheckout");
}
