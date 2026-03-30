import { useEffect, useState } from "react";
import {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

import { useNumberAnimation } from "@/animations/hooks/useNumberAnimation";
import { difficultyConfigs } from "@/shared/interfaces/challenge";
import { Difficulty } from "@/shared/interfaces/difficulty";

const difficulties: Difficulty[] = ["Fácil", "Médio", "Difícil"] as const;

export function useDifficultySelectorViewModel() {
  const [selectedDifficulty, setSelectedDifficulty] =
    useState<Difficulty>("Fácil");

  const difficultyConfig = difficultyConfigs[selectedDifficulty];

  const { animatedStyle: timeAnimatedStyle } = useNumberAnimation(
    difficultyConfig.estimedTime,
  );

  const selectedIndex = difficulties.indexOf(selectedDifficulty);
  const translateX = useSharedValue(selectedIndex * 100);

  useEffect(() => {
    const newIndex = difficulties.indexOf(selectedDifficulty);
    translateX.value = withSpring(newIndex * 100, {
      stiffness: 120,
      damping: 30,
    });
  }, [selectedDifficulty, difficulties, translateX]);

  const animatedIndicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: `${translateX.value}%` }],
  }));

  return {
    difficulties,
    difficultyConfig,
    timeAnimatedStyle,
    selectedDifficulty,
    setSelectedDifficulty,
    animatedIndicatorStyle,
  };
}
