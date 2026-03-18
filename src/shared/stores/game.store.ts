import { create } from "zustand";

import {
  Challenge,
  GameResult,
  GameState,
} from "@/shared/interfaces/challenge";
import { GameService } from "../services/game.service";

interface GameStore extends GameState {
  initGame: (challenge: Challenge) => void;
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
  remainingTimeInSeconds: 0,
  elapsedTimeInSeconds: 0,
  startedAt: null,

  initGame: (challenge: Challenge) => {
    const gameState = GameService.initializeGame(challenge);
    set(gameState);
  },
  startGame: () => {
    const currentState = get();
    const newState = GameService.startGame(currentState);

    set(newState);
  },
  finishGame: () => {
    const currentState = get();
    const result = GameService.finishGame(currentState);

    return result;
  },
  selectCard: (cardId: string) => {},
  resetMismatchedCards: () => {
    const currentState = get();
    const newState = GameService.resetMismatchedCards(currentState);

    set(newState);
  },

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
