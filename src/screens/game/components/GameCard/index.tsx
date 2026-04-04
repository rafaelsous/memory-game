import { StoreCard } from "@/shared/interfaces/challenge";
import { GameCardView } from "./GameCard.view";
import { useGameCardViewModel } from "./useGameCard.viewModel";

interface GameCardProps {
  card: StoreCard;
  index: number;
}

export function GameCard({ card }: Readonly<GameCardProps>) {
  const viewModel = useGameCardViewModel({ card });

  return <GameCardView {...viewModel} />;
}
