import { useEffect, useState } from "react";
import {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

import { Difficulty } from "@/shared/interfaces/difficulty";

export function useDifficultySelectorViewModel() {
  const difficulties: Difficulty[] = ["Fácil", "Médio", "Difícil"] as const;

  const [selectedDifficulty, setSelectedDifficulty] =
    useState<Difficulty>("Fácil");

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
    selectedDifficulty,
    setSelectedDifficulty,
    animatedIndicatorStyle,
  };
}
