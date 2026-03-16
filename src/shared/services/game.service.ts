import { Challenge, GameState } from "../interfaces/challenge";
import { CardService } from "./card.service";

export class GameService {
  static initializeGame(challenge: Challenge): GameState {
    const cards = CardService.generateCards(challenge);

    return {
      status: "countdown",
      challenge,
      selectedCards: [],
      cards,
      timeRemainingInSeconds: challenge.timeLimitInSeconds,
      timeElapsedInSeconds: 0,
      startedAt: null,
    };
  }

  static startGame(gameState: GameState): GameState {
    return {
      ...gameState,
      status: "playing",
      startedAt: new Date(),
    };
  }
}
