import {
  ANIMATION_TIMINGS,
  CardEntryAnimationType,
} from "../config/animation.config";

export function getEntryAnimationDuration(
  cardCount: number,
  animationType: CardEntryAnimationType,
) {
  const config = ANIMATION_TIMINGS.entry[animationType];
  const lastCardDelay = (cardCount - 1) * config.delayBetweenCards;
  const springSettleTime = animationType === "throw" ? 800 : config.duration;

  return lastCardDelay + springSettleTime + 200;
}
