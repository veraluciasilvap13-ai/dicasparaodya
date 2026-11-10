export const OFFER_DELAY_SECONDS = 33 * 60 + 8;

export function hasReachedOfferTime(currentTime: number): boolean {
  return Number.isFinite(currentTime) && currentTime >= OFFER_DELAY_SECONDS;
}