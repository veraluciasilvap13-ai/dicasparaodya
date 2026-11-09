import { useEffect } from "react";
import { startMetaPixel } from "@/lib/meta-pixel";

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
    // PageView fires once inside startMetaPixel, on page load.
    startMetaPixel();
  }, []);
  return null;
}
