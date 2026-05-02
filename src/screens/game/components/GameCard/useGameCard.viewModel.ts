import { useEffect, useRef } from "react";
import {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

import { useCardEntryAnimation } from "@/animations/hooks/useCardEntryAnimation";
import { useCardShakeAnimation } from "@/animations/hooks/useCardShakeAnimation";
import { StoreCard } from "@/shared/interfaces/challenge";
import { useGameStore } from "@/shared/stores/game.store";

interface GameCardViewModelProps {
  card: StoreCard;
  index: number;
}

export function useGameCardViewModel({
  card,
  index,
}: Readonly<GameCardViewModelProps>) {
  const rotation = useSharedValue(card.isFlipped ? 180 : 0);

  const { selectCard } = useGameStore();

  const previousFlippedRef = useRef(card.isFlipped);

  const entry = useCardEntryAnimation({
    cardIndex: index,
  });

  const { animatedStyle: shakeCardAnimatedStyle, onShake } =
    useCardShakeAnimation();

  const frontAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { perspective: 1000 },
      {
        rotateY: `${interpolate(rotation.value, [0, 180], [0, 180])}deg`,
      },
    ],
  }));

  const backAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { perspective: 1000 },
      {
        rotateY: `${interpolate(rotation.value, [0, 180], [180, 360])}deg`,
      },
    ],
  }));

  useEffect(() => {
    rotation.value = withSpring(card.isFlipped ? 180 : 0, { duration: 300 });
  }, [card.isFlipped, rotation]);

  useEffect(() => {
    if (card.isFlipped === false && previousFlippedRef.current === true) {
      onShake();
    }

    previousFlippedRef.current = card.isFlipped;
  }, [card.isFlipped, onShake, previousFlippedRef]);

  return {
    card,
    entry,
    selectCard,
    backAnimatedStyle,
    frontAnimatedStyle,
    shakeCardAnimatedStyle,
  };
}
