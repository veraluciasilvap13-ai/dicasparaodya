import { useEffect } from "react";
import { startMetaPixel } from "@/lib/meta-pixel";
import { sendMetaPageView } from "@/lib/meta-capi.functions";

/** Starts UTMify and the Meta Pixel on page load (no cookie banner). */
export function AdvertisingConsent() {
  useEffect(() => {
    const activate = (id: string) => {
      const source = document.getElementById(id);
      if (!source?.textContent) return;
      const script = document.createElement("script");
      script.textContent = source.textContent;
      document.head.appendChild(script);
    };
    activate("utmify-advertising-source");
    activate("utmify-utms-source");
    const eventId = startMetaPixel();
    if (eventId) {
      // Wait briefly so the pixel can set _fbp before the server reads cookies.
      window.setTimeout(() => {
        void sendMetaPageView({ data: { eventId, eventSourceUrl: window.location.href } }).catch(() => {});
      }, 1500);
    }
  }, []);
  return null;
}
