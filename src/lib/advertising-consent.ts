export const CONSENT_KEY = "advertising-consent-v1";
export const NOTICE_VERSION = "2026-11-07-v1";
export const NOTICE_TEXT = "Con il tuo consenso, UTMify riceve identificatori del browser, indirizzo IP, pagine visitate e interazioni per misurazione pubblicitaria e può raccogliere dati inseriti nei moduli. Puoi rifiutare o revocare in Impostazioni cookie.";
export function explicitAdvertisingAllowed(choice: boolean | null, gpc: boolean) {
  return choice === true && !gpc;
}