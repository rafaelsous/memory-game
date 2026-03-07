import { useSharedValue, WithSpringConfig } from "react-native-reanimated";

interface UsePressAnimationConfig {
  scaleActive: number;
  springConfig?: WithSpringConfig;
}

function usePressAnimation(config: UsePressAnimationConfig) {
  const scale = useSharedValue(1);

  return {};
}
