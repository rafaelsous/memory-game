import { useEffect, useRef } from "react";
import {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

import { useCardEntryAnimation } from "@/animations/hooks/useCardEntryAnimation";
import { useCardShakeAnimation } from "@/animations/hooks/useCardShakeAnimation";
import { useCardSuccessAnimation } from "@/animations/hooks/useCardSuccessAnimation";
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

  const {
    animatedStyle: successCardAnimatedStyle,
    playSuccess,
    fadeOut,
  } = useCardSuccessAnimation();

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

  useEffect(() => {
    if (card.isMatched) {
      playSuccess();

      setTimeout(() => {
        fadeOut();
      }, 600);
    }
  }, [card.isMatched, playSuccess, fadeOut]);

  return {
    card,
    entry,
    selectCard,
    backAnimatedStyle,
    frontAnimatedStyle,
    shakeCardAnimatedStyle,
    successCardAnimatedStyle,
  };
}
