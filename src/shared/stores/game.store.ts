import { create } from "zustand";

import { GameResult, GameState } from "@/interfaces/challenge";

interface GameStore extends GameState {
  initGame: (challengeId: string) => void;
  startGame: () => void;
  finishGame: () => GameResult | null;
  selectCard: (cardId: string) => void;
  resetMismatchedCards: () => void;
}

export const useGameStore = create<GameStore>((set, get) => ({
  status: "idle",
  challenge: null,
  cards: [],
  selectedCards: [],
  timeRemainingInSeconds: 0,
  timeElapsedInSeconds: 0,
  startedAt: null,
  initGame: (challengeId: string) => {},
  startGame: () => {},
  finishGame: () => null,
  selectCard: (cardId: string) => {},
  resetMismatchedCards: () => {},
}));
