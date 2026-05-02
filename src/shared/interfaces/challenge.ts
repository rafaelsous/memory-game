import { CardItem } from "@/shared/utils/challenge";
import { Difficulty } from "./difficulty";

export type GameStatus =
  | "idle"
  | "countdown"
  | "playing"
  | "paused"
  | "finished"
  | "timeout";

export interface Challenge {
  id: string;
  title: string;
  difficulty: Difficulty;
  estimedTime: string;
  timeLimitInSeconds: number;
  cards: CardItem[];
  gradient?: [string, string, ...string[]];
}

export interface StoreCard extends CardItem {
  id: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export interface GameState {
  status: GameStatus;
  challenge: Challenge | null;
  cards: StoreCard[];
  selectedCards: StoreCard[];
  remainingTimeInSeconds: number;
  elapsedTimeInSeconds: number;
  startedAt: Date | null;
}

export interface GameActions {
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

export interface GameResult {
  completed: boolean;
  challenge: Challenge;
  timeElapsedInSeconds: number;
}

export interface DifficultyConfig {
  difficulty: Difficulty;
  timeLimitInSeconds: number;
  estimedTime: string;
}

export const difficultyConfigs: Record<Difficulty, DifficultyConfig> = {
  Fácil: {
    difficulty: "Fácil",
    timeLimitInSeconds: 300,
    estimedTime: "5 minutos",
  },
  Médio: {
    difficulty: "Médio",
    timeLimitInSeconds: 240,
    estimedTime: "4 minutos",
  },
  Difícil: {
    difficulty: "Difícil",
    timeLimitInSeconds: 10,
    estimedTime: "3 minutos",
  },
};
