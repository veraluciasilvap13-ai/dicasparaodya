import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { startMetaPixel } from "@/lib/meta-pixel";
import { sendMetaPageView } from "@/lib/meta-capi.functions";
import { CONSENT_KEY, NOTICE_TEXT, NOTICE_VERSION, explicitAdvertisingAllowed, visitorTimeZone } from "@/lib/advertising-consent";

type ConsentRecord = { visitor: string; choice: boolean; region: string | null; at: string; version: string; notice: string };
function readHistory(): ConsentRecord[] {
  try { return JSON.parse(localStorage.getItem(CONSENT_KEY) || "[]"); } catch { return []; }
}

export function AdvertisingConsent() {
  const [open, setOpen] = useState(false);
  const [region, setRegion] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    let extraStarted = false;
    const gpc = () => (navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl === true;
    const activate = (id: string) => {
      const source = document.getElementById(id);
      if (!source?.textContent) return;
      const script = document.createElement("script");
      script.textContent = source.textContent;
      document.head.appendChild(script);
    };
    const apply = () => {
      const history = readHistory();
      const choice = history.at(-1)?.choice ?? null;
      // Read the latest choice before every application; withdrawal reloads to
      // terminate third-party timers/listeners, which expose no revoke API.
      if (!explicitAdvertisingAllowed(choice, gpc()) && extraStarted) {
        window.location.reload();
        return;
      }
      if (explicitAdvertisingAllowed(choice, gpc()) && !extraStarted) {
        activate("utmify-advertising-source");
        activate("utmify-utms-source");
        const eventId = startMetaPixel();
        extraStarted = true;
        const latest = readHistory().at(-1);
        if (eventId && latest?.choice === true) {
          // Wait briefly so the pixel can set _fbp before the server reads cookies.
          window.setTimeout(() => {
            const now = readHistory().at(-1);
            if (!now || !explicitAdvertisingAllowed(now.choice, gpc())) return;
            void sendMetaPageView({ data: { eventId, eventSourceUrl: window.location.href, consent: { choice: true, version: now.version, at: now.at } } }).catch(() => {});
          }, 1500);
        }
      }
      setOpen(choice === null && !gpc());
    };
    const initialize = () => {
      const timeZone = visitorTimeZone();
      setRegion(timeZone ? `timezone:${timeZone}` : null);
      setReady(true);
      apply();
    };
    const changed = () => apply();
    const storageChanged = (event: StorageEvent) => { if (event.key === CONSENT_KEY) apply(); };
    window.addEventListener("advertising-choice", changed);
    window.addEventListener("storage", storageChanged);
    initialize();
    return () => { window.removeEventListener("advertising-choice", changed); window.removeEventListener("storage", storageChanged); };
  }, []);
  const save = (choice: boolean) => {
    const history = readHistory();
    const visitor = history[0]?.visitor ?? crypto.randomUUID();
    history.push({ visitor, choice, region, at: new Date().toISOString(), version: NOTICE_VERSION, notice: NOTICE_TEXT });
    try { localStorage.setItem(CONSENT_KEY, JSON.stringify(history)); } catch { return; }
    setOpen(false);
    window.dispatchEvent(new Event("advertising-choice"));
  };
  return <>
      <div className="mx-auto flex max-w-[414px] flex-wrap justify-center gap-3 bg-background p-3 text-xs text-muted-foreground">
      <Button variant="link" size="sm" onClick={() => setOpen(true)} disabled={!ready}>Impostazioni cookie</Button>
      <Link to="/privacy" className="self-center underline">Privacy</Link>
      <Link to="/termini" className="self-center underline">Termini</Link>
    </div>
    {open && <section role="dialog" aria-label="Preferenze cookie" className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background p-4 shadow-page">
      <div className="mx-auto max-w-xl">
        <h2 className="font-bold">Preferenze pubblicitarie</h2>
        <p className="mt-2 text-sm">{NOTICE_TEXT} <Link to="/privacy" className="underline">Privacy</Link></p>
        <div className="mt-3 flex flex-wrap gap-3">
          <Button variant="outline" onClick={() => save(false)}>Rifiuta</Button>
          <Button variant="outline" onClick={() => save(true)}>Accetta</Button>
          <Button variant="ghost" onClick={() => setOpen(false)}>Chiudi</Button>
        </div>
      </div>
    </section>}
  </>;
}