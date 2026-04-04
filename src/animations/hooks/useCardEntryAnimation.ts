import { useEffect } from "react";
import { useSharedValue, withDelay, withSpring } from "react-native-reanimated";

import {
  ANIMATION_TIMINGS,
  ENTRY_ANIMATION_START_POSITIONS,
  SPRING_CONFIG,
} from "../config/animation.config";
import { useAnimationStore } from "../store/animation.store";

interface UseCardEntryAnimationProps {
  cardIndex: number;
  shouldAnimate: boolean;
}

export function useCardEntryAnimation({
  cardIndex,
  shouldAnimate,
}: UseCardEntryAnimationProps) {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0);
  const rotation = useSharedValue(0);

  const { entryAnimationType } = useAnimationStore();

  useEffect(() => {
    if (shouldAnimate) {
      const config = ANIMATION_TIMINGS.entry[entryAnimationType];

      // Start the animation with a delay based on the card index
      const delay = cardIndex * config.delayBetweenCards;

      if (entryAnimationType === "throw") {
        // Animate from the throw position to the center
        translateX.value = ENTRY_ANIMATION_START_POSITIONS.throw.x;
        translateY.value = ENTRY_ANIMATION_START_POSITIONS.throw.y;
        rotation.value = -30; // Start with a rotation for the throw effect

        translateX.value = withDelay(
          delay,
          withSpring(0, SPRING_CONFIG.entryDeck),
        );
        translateY.value = withDelay(
          delay,
          withSpring(0, SPRING_CONFIG.entryDeck),
        );
        rotation.value = withDelay(
          delay,
          withSpring(0, SPRING_CONFIG.entryDeck),
        );
      }
    }
  }, []);

  return {};
}
