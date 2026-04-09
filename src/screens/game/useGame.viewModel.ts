import { useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";

import { useAnimationStore } from "@/animations/store/animation.store";
import { getEntryAnimationDuration } from "@/animations/utils/animation.utils";
import { difficultyConfigs } from "@/shared/interfaces/challenge";
import { Difficulty } from "@/shared/interfaces/difficulty";
import { useGameStore } from "@/shared/stores/game.store";
import { challengeTheme } from "@/shared/utils/challenge";
import { createSequence } from "@/shared/utils/sequence.util";

export function useGameViewModel() {
  const { initGame, previewAllCards, hideAllCards, startGame, cards } =
    useGameStore();
  const { entryAnimationType } = useAnimationStore();
  const [visibleCountdown, setVisibleCountdown] = useState(false);

  const { themeId, difficulty } = useLocalSearchParams<{
    themeId: string;
    difficulty: Difficulty;
  }>();

  const selectedTheme = challengeTheme.find(({ id }) => id === themeId);

  const handleCountdownComplete = useCallback(() => {
    setVisibleCountdown(false);

    const totalAnimationTime = getEntryAnimationDuration(
      cards.length,
      entryAnimationType,
    );

    createSequence()
      .wait(totalAnimationTime)
      .do(previewAllCards)
      .wait(2000)
      .do(hideAllCards)
      .wait(300)
      .do(startGame)
      .run();
  }, [previewAllCards, hideAllCards, startGame]);

  useEffect(() => {
    initGame({
      id: `${themeId}-${difficulty}`,
      title: selectedTheme?.title || "",
      cards: selectedTheme?.cards || [],
      difficulty,
      estimedTime: difficultyConfigs[difficulty].estimedTime,
      timeLimitInSeconds: difficultyConfigs[difficulty].timeLimitInSeconds,
    });

    createSequence()
      .wait(3)
      .do(() => setVisibleCountdown(true))
      .run();
  }, [initGame, themeId, difficulty, selectedTheme]);

  return {
    selectedTheme,
    visibleCountdown,
    handleCountdownComplete,
  };
}
