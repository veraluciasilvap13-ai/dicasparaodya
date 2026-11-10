export const OFFER_DELAY_SECONDS = 34 * 60 + 28;

export function hasReachedOfferTime(currentTime: number): boolean {
  return Number.isFinite(currentTime) && currentTime >= OFFER_DELAY_SECONDS;
}
