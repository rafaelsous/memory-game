import { StoreCard } from "@/shared/interfaces/challenge";
import { GameCardView } from "./GameCard.view";
import { useGameCardViewModel } from "./useGameCard.viewModel";

interface GameCardProps {
  card: StoreCard;
  index: number;
}

export function GameCard({ card, index }: Readonly<GameCardProps>) {
  const viewModel = useGameCardViewModel({ card, index });

  return <GameCardView {...viewModel} />;
}
