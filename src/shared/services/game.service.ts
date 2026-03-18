import {
  Challenge,
  GameResult,
  GameState,
  StoreCard,
} from "../interfaces/challenge";
import { CardService } from "./card.service";

export class GameService {
  static initializeGame(challenge: Challenge): GameState {
    const cards = CardService.generateCards(challenge);

    return {
      status: "countdown",
      challenge,
      selectedCards: [],
      cards,
      remainingTimeInSeconds: challenge.timeLimitInSeconds,
      elapsedTimeInSeconds: 0,
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

  static isGameComplete(cards: StoreCard[]): boolean {
    return cards.every((card) => card.isMatched);
  }

  static selectCard(
    gameState: GameState,
    cardId: string,
  ): {
    newState: GameState;
    action: "flip" | "match" | "mismatch" | "invalid";
  } {
    const { cards, selectedCards, status } = gameState;

    if (status !== "playing") {
      return { newState: gameState, action: "invalid" };
    }

    const card = cards.find((card) => card.id === cardId);

    if (!card || card.isMatched || card.isFlipped) {
      return { newState: gameState, action: "invalid" };
    }

    if (selectedCards.length >= 2) {
      return { newState: gameState, action: "invalid" };
    }

    const updatedCardArray = cards.map((card) => {
      return cardId === card.id ? CardService.flipCard(card, true) : card;
    });

    const newSelectedCards = [...selectedCards, card];

    if (newSelectedCards.length === 1) {
      return {
        newState: {
          ...gameState,
          cards: updatedCardArray,
          selectedCards: newSelectedCards,
        },
        action: "flip",
      };
    }

    const [fisrtCard, secondCard] = newSelectedCards;

    const isMatch = Boolean(fisrtCard.name === secondCard.name);

    if (isMatch) {
      const finalCards = updatedCardArray.map((card) => {
        return card.id === fisrtCard.id || card.id === secondCard.id
          ? CardService.markAsMatched(card)
          : card;
      });

      const isComplete = this.isGameComplete(finalCards);

      return {
        newState: {
          ...gameState,
          cards: finalCards,
          selectedCards: [],
          status: isComplete ? "finished" : "playing",
        },
        action: "match",
      };
    } else {
      return {
        newState: {
          ...gameState,
          cards: updatedCardArray,
          selectedCards: newSelectedCards,
        },
        action: "mismatch",
      };
    }
  }

  static resetMismatchedCards(gameState: GameState): GameState {
    const { cards, selectedCards } = gameState;

    const updatedCardArray = cards.map((card) => {
      const isSelected = selectedCards.some(({ id }) => card.id === id);

      return isSelected && !card.isMatched
        ? CardService.flipCard(card, false)
        : card;
    });

    return {
      ...gameState,
      cards: updatedCardArray,
      selectedCards: [],
    };
  }

  static pauseGame(gameState: GameState): GameState {
    return {
      ...gameState,
      status: "paused",
    };
  }

  static resumeGame(gameState: GameState): GameState {
    return {
      ...gameState,
      status: "playing",
    };
  }

  static resetGame(challenge: Challenge): GameState {
    return this.initializeGame(challenge);
  }

  static tick(gameState: GameState): GameState {
    if (gameState.status !== "playing") {
      return gameState;
    }

    const remainingTimeInSeconds = Math.max(
      0,
      gameState.remainingTimeInSeconds - 1,
    );
    const elapsedTimeInSeconds = gameState.elapsedTimeInSeconds + 1;

    return {
      ...gameState,
      remainingTimeInSeconds,
      elapsedTimeInSeconds,
      status: remainingTimeInSeconds === 0 ? "timeout" : gameState.status,
    };
  }

  static finishGame(gameState: GameState): GameResult | null {
    if (!gameState.challenge) {
      return null;
    }

    return {
      completed: Boolean(gameState.status === "finished"),
      timeElapsedInSeconds: gameState.elapsedTimeInSeconds,
      challenge: gameState.challenge,
    };
  }

  static previewAllCards(cards: StoreCard[]): StoreCard[] {
    return cards.map((card) => CardService.flipCard(card, true));
  }

  static hideAllCards(cards: StoreCard[]): StoreCard[] {
    return cards.map((card) => CardService.flipCard(card, false));
  }
}
