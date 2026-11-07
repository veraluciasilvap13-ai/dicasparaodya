import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { CONSENT_KEY, NOTICE_TEXT, NOTICE_VERSION, advertisingAllowed, explicitAdvertisingAllowed, needsConsent } from "@/lib/advertising-consent";

type ConsentRecord = { visitor: string; choice: boolean; region: string | null; at: string; version: string; notice: string };
function readHistory(): ConsentRecord[] {
  try { return JSON.parse(localStorage.getItem(CONSENT_KEY) || "[]"); } catch { return []; }
}

export function AdvertisingConsent() {
  const [open, setOpen] = useState(false);
  const [region, setRegion] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    let active = true;
    let metaStarted = false;
    let extraStarted = false;
    let visitRegion: string | null = null;
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
      const permitted = advertisingAllowed(visitRegion, choice, gpc());
      // Read the latest choice before every application; withdrawal reloads to
      // terminate third-party timers/listeners, which expose no revoke API.
      if ((!permitted && metaStarted) || (!explicitAdvertisingAllowed(choice, gpc()) && extraStarted)) {
        window.fbq?.("consent", "revoke");
        window.location.reload();
        return;
      }
      if (permitted && !metaStarted) { activate("meta-advertising-source"); metaStarted = true; }
      if (explicitAdvertisingAllowed(choice, gpc()) && !extraStarted) { activate("utmify-advertising-source"); extraStarted = true; }
      setOpen(needsConsent(visitRegion) && choice === null && !gpc());
    };
    const initialize = async () => {
      try {
        const response = await fetch("/cdn-cgi/trace", { signal: AbortSignal.timeout(2000) });
        if (!response.ok) throw new Error("Region unavailable");
        const fields = Object.fromEntries((await response.text()).trim().split("\n").map(line => line.split("=")));
        if (fields.h === window.location.host && /^[A-Z]{2}$/.test(fields.loc || "")) visitRegion = fields.loc;
      } catch { /* Unknown region uses consent-required default. */ }
      if (!active) return;
      setRegion(visitRegion);
      setReady(true);
      apply();
    };
    const changed = () => apply();
    const storageChanged = (event: StorageEvent) => { if (event.key === CONSENT_KEY) apply(); };
    window.addEventListener("advertising-choice", changed);
    window.addEventListener("storage", storageChanged);
    void initialize();
    return () => { active = false; window.removeEventListener("advertising-choice", changed); window.removeEventListener("storage", storageChanged); };
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