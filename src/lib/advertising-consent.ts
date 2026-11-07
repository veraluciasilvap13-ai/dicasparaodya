export const CONSENT_KEY = "advertising-consent-v1";
export const NOTICE_VERSION = "2026-11-07-v1";
export const NOTICE_TEXT = "Con il tuo consenso, Meta e UTMify ricevono identificatori del browser, indirizzo IP, pagine visitate e interazioni per misurazione e ottimizzazione pubblicitaria. UTMify può raccogliere dati inseriti nei moduli. Puoi rifiutare o revocare in Impostazioni cookie.";
export const CONSENT_REGIONS = new Set("AT BE BG HR CY CZ DK EE FI FR DE GR HU IS IE IT LI LT LU LV MT NL NO PL PT RO SK SI ES SE GB CH".split(" "));
export function needsConsent(region: string | null) {
  return !region || !/^[A-Z]{2}$/.test(region) || region === "XX" || region === "T1" || CONSENT_REGIONS.has(region);
}
export function advertisingAllowed(region: string | null, choice: boolean | null, gpc: boolean) {
  return !gpc && (choice === true || (choice === null && !needsConsent(region)));
}
export function explicitAdvertisingAllowed(choice: boolean | null, gpc: boolean) {
  return choice === true && !gpc;
}