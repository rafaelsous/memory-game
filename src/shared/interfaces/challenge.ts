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
  timeRemainingInSeconds: number;
  timeElapsedInSeconds: number;
  startedAt: Date | null;
}

export interface GameResult {
  completed: boolean;
  challenge: Challenge;
  timeElapsedInSeconds: number;
}
