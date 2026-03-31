import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";

import { difficultyConfigs } from "@/shared/interfaces/challenge";
import { Difficulty } from "@/shared/interfaces/difficulty";
import { useGameStore } from "@/shared/stores/game.store";
import { challengeTheme } from "@/shared/utils/challenge";

export function useGameViewModel() {
  const { themeId, difficulty } = useLocalSearchParams<{
    themeId: string;
    difficulty: Difficulty;
  }>();

  const { initGame } = useGameStore();

  const selectedTheme = challengeTheme.find(({ id }) => id === themeId);

  useEffect(() => {
    initGame({
      id: `${themeId}-${difficulty}`,
      title: selectedTheme?.title || "",
      cards: selectedTheme?.cards || [],
      difficulty,
      estimedTime: difficultyConfigs[difficulty].estimedTime,
      timeLimitInSeconds: difficultyConfigs[difficulty].timeLimitInSeconds,
    });
  }, [initGame, themeId, difficulty, selectedTheme]);

  return {
    selectedTheme,
  };
}
