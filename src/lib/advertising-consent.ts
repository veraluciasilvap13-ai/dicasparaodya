export const CONSENT_KEY = "advertising-consent-v1";
export const NOTICE_VERSION = "2026-11-08-v2";
export const NOTICE_TEXT = "Con il tuo consenso, Meta (Pixel di Facebook) e UTMify ricevono identificatori del browser, indirizzo IP, pagine visitate e clic sul pulsante di acquisto per misurare e ottimizzare la pubblicità; UTMify riceve identificatori del browser, indirizzo IP, pagine visitate e interazioni per misurazione pubblicitaria e può raccogliere dati inseriti nei moduli. Puoi rifiutare o revocare in Impostazioni cookie.";
export function explicitAdvertisingAllowed(choice: boolean | null, gpc: boolean) {
  return choice === true && !gpc;
}

// A timezone is a local hint, not a verified country or permission to track.
export function visitorTimeZone(resolve = () => Intl.DateTimeFormat().resolvedOptions().timeZone): string | null {
  try { return resolve() || null; } catch { return null; }
}