import { useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";

import { CardEntryAnimationType } from "@/animations/config/animation.config";
import { useAnimationStore } from "@/animations/store/animation.store";
import { getEntryAnimationDuration } from "@/animations/utils/animation.utils";
import { difficultyConfigs } from "@/shared/interfaces/challenge";
import { Difficulty } from "@/shared/interfaces/difficulty";
import { useGameStore } from "@/shared/stores/game.store";
import { challengeTheme } from "@/shared/utils/challenge";
import { createSequence } from "@/shared/utils/sequence.util";

export function useGameViewModel() {
  const { initGame, previewAllCards, hideAllCards, startGame, status, cards } =
    useGameStore();
  const { entryAnimationType, setShouldAnimate, setEntryAnimationType } =
    useAnimationStore();
  const [visibleCountdown, setVisibleCountdown] = useState(
    status === "countdown",
  );

  const { themeId, difficulty } = useLocalSearchParams<{
    themeId: string;
    difficulty: Difficulty;
  }>();

  const selectedTheme = challengeTheme.find(({ id }) => id === themeId);

  const handleCountdownComplete = useCallback(() => {
    setVisibleCountdown(false);
    setShouldAnimate(true);

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
  }, [
    previewAllCards,
    hideAllCards,
    startGame,
    cards.length,
    entryAnimationType,
    setShouldAnimate,
  ]);

  useEffect(() => {
    const theme = challengeTheme.find(({ id }) => id === themeId);

    if (theme && difficulty) {
      setShouldAnimate(false);
      const animationTypes: CardEntryAnimationType[] = ["deck", "throw"];
      const randomAnimationType =
        animationTypes[Math.floor(Math.random() * animationTypes.length)];

      setEntryAnimationType(randomAnimationType);

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
    }
  }, [initGame, themeId, difficulty, selectedTheme]);

  return {
    selectedTheme,
    visibleCountdown,
    handleCountdownComplete,
  };
}
