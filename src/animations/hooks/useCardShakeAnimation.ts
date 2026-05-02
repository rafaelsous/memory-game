import { useCallback } from "react";
import {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

export const useCardShakeAnimation = () => {
  const translateX = useSharedValue(0);

  const onShake = useCallback(() => {
    translateX.value = withSequence(
      withTiming(10, { duration: 50 }),
      withRepeat(
        withSequence(
          withTiming(-10, { duration: 50 }),
          withTiming(10, { duration: 50 }),
        ),
        3,
        false,
      ),
      withTiming(0, { duration: 50 }),
    );
  }, [translateX]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return {
    animatedStyle,
    onShake,
  };
};
