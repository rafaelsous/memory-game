import { useCallback } from "react";
import {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  WithSpringConfig,
} from "react-native-reanimated";

import { DimensionValue } from "react-native";
import { SPRING_CONFIG } from "../config/animation.config";

interface UsePressAnimationConfig {
  scaleActive?: number;
  springConfig?: WithSpringConfig;
  width?: DimensionValue;
}

export function usePressAnimation({
  scaleActive = 0.95,
  springConfig = SPRING_CONFIG.press,
  width = "100%",
}: UsePressAnimationConfig = {}) {
  const scale = useSharedValue(1);

  const onPressIn = useCallback(() => {
    scale.value = withSpring(scaleActive, springConfig);
  }, [scale, scaleActive, springConfig]);

  const onPressOut = useCallback(() => {
    scale.value = withSpring(1, springConfig);
  }, [scale, springConfig]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    width,
  }));

  return {
    onPressIn,
    onPressOut,
    animatedStyle,
  };
}
