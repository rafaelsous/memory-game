import { useGameStore } from "@/shared/stores/game.store";

export function useGameHeaderViewModel() {
  const { remainingTimeInSeconds } = useGameStore();
  const minutes = Math.floor(remainingTimeInSeconds / 60);
  const seconds = remainingTimeInSeconds % 60;
  const timeString = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  const isCriticalTime = remainingTimeInSeconds <= 10;

  return {
    timeString,
    isCriticalTime,
  };
}
