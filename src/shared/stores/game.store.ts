import { create } from "zustand";

import {
  Challenge,
  GameActions,
  GameState,
} from "@/shared/interfaces/challenge";
import { GameService } from "../services/game.service";

interface GameStore extends GameState, GameActions {}

const gameStoreDefaultValues: GameState = {
  status: "idle",
  challenge: null,
  cards: [],
  selectedCards: [],
  remainingTimeInSeconds: 0,
  elapsedTimeInSeconds: 0,
  startedAt: null,
};

export const useGameStore = create<GameStore>((set, get) => ({
  ...gameStoreDefaultValues,

  initGame: (challenge: Challenge) => {
    const gameState = GameService.initializeGame(challenge);
    set(gameState);
  },

  startGame: () => {
    const currentState = get();
    const newState = GameService.startGame(currentState);

    set(newState);
    get().startTimer();
  },

  finishGame: () => {
    const currentState = get();
    const result = GameService.finishGame(currentState);

    return result;
  },

  selectCard: (cardId: string) => {
    const currentState = get();
    const { action, newState } = GameService.selectCard(currentState, cardId);
    set(newState);

    switch (action) {
      case "mismatch":
        setTimeout(() => get().resetMismatchedCards(), 1000);
        break;
      case "match":
        if (newState.status === "finished") {
          setTimeout(() => get().finishGame(), 500);
        }
        break;
      case "flip":
        break;
      case "invalid":
        break;
    }
  },

  resetMismatchedCards: () => {
    const currentState = get();
    const newState = GameService.resetMismatchedCards(currentState);

    set(newState);
  },

  // Timer related methods
  tick: () => {
    const currentState = get();
    const newState = GameService.tick(currentState);

    set(newState);

    if (newState.status === "timeout") {
      get().stopTimer();
    }
  },

  startTimer: () => {
    const currentState = get();

    if (currentState._timerId) {
      clearInterval(currentState._timerId);
    }

    const timerId = setInterval(() => {
      get().tick();
    }, 1000);

    set({ _timerId: timerId });
  },

  stopTimer: () => {
    const currentState = get();

    if (currentState._timerId) {
      clearInterval(currentState._timerId);
      set({ _timerId: null });
    }
  },

  _timerId: null,

  // Game lifecycle methods
  pauseGame: () => {
    const currentState = get();
    const newState = GameService.pauseGame(currentState);

    set(newState);
    get().stopTimer();
  },

  resumeGame: () => {
    const currentState = get();
    const newState = GameService.resumeGame(currentState);

    set(newState);
    get().startTimer();
  },

  resetGame: () => {
    const currentState = get();

    if (!currentState.challenge) return;

    const newState = GameService.resetGame(currentState.challenge);

    set(newState);
    get().stopTimer();
  },

  clearGame: () => {
    get().stopTimer();
    set(gameStoreDefaultValues);
  },

  // Utility methods
  previewAllCards: () => {
    const currentState = get();

    if (!currentState.cards) return;

    const cards = GameService.previewAllCards(currentState.cards);

    set({ cards });
  },

  hideAllCards: () => {
    const currentState = get();

    if (!currentState.cards) return;

    const cards = GameService.hideAllCards(currentState.cards);

    set({ cards });
  },
}));
