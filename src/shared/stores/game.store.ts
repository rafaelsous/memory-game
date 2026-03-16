import { create } from "zustand";

import { GameResult, GameState } from "@/interfaces/challenge";

interface GameStore extends GameState {
  initGame: (challengeId: string) => void;
  startGame: () => void;
  finishGame: () => GameResult | null;
  selectCard: (cardId: string) => void;
  resetMismatchedCards: () => void;
  tick: () => void;
  _timerId: number | null;
  startTimer: () => void;
  stopTimer: () => void;
  pauseGame: () => void;
  resumeGame: () => void;
  resetGame: () => void;
  clearGame: () => void;
  previewAllCards: () => void;
  hideAllCards: () => void;
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

  // Timer related methods
  tick: () => {},
  startTimer: () => {},
  stopTimer: () => {},
  _timerId: null,

  // Game lifecycle methods
  pauseGame: () => {},
  resumeGame: () => {},
  resetGame: () => {},
  clearGame: () => {},

  // Utility methods
  previewAllCards: () => {},
  hideAllCards: () => {},
}));
