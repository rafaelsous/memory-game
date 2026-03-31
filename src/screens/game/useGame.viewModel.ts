import { challengeTheme } from "@/shared/utils/challenge";
import { useLocalSearchParams } from "expo-router";

export function useGameViewModel() {
  const { themeId } = useLocalSearchParams<{
    themeId: string;
  }>();

  const selectedTheme = challengeTheme.find(({ id }) => id === themeId);

  return {
    selectedTheme,
  };
}
