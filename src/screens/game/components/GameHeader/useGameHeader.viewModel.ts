import { useEffect } from "react";
import {
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

import { useGameStore } from "@/shared/stores/game.store";

export function useGameHeaderViewModel() {
  const { remainingTimeInSeconds } = useGameStore();
  const minutes = Math.floor(remainingTimeInSeconds / 60);
  const seconds = remainingTimeInSeconds % 60;
  const timeString = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  const isCriticalTime = remainingTimeInSeconds <= 10;

  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  useEffect(() => {
    if (isCriticalTime) {
      scale.value = withRepeat(
        withSequence(
          withTiming(1.1, { duration: 300 }),
          withTiming(1, { duration: 300 }),
        ),
        -1,
        true,
      );
    } else {
      cancelAnimation(scale);
    }
  }, [isCriticalTime, remainingTimeInSeconds, scale]);

  return {
    timeString,
    isCriticalTime,
    animatedStyle,
  };
}
