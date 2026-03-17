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

      return {
        newState: {
          ...gameState,
          cards: finalCards,
          selectedCards: [],
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

  static resetMismatchedCards(gameState: GameState) {
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
}
