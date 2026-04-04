import { CardEntryAnimationType } from "../config/animation.config";

export interface AnimationTiming {
  entry: Record<
    CardEntryAnimationType,
    {
      duration: number;
      delayBetweenCards: number;
    }
  >;
}
