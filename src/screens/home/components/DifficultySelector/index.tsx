import {
  DifficultySelectorProps,
  DifficultySelectorView,
} from "./DifficultySelector.view";
import { useDifficultySelectorViewModel } from "./useDifficultySelector.viewModel";

export function DifficultySelector({
  selectedDifficulty,
  setSelectedDifficulty,
}: Readonly<DifficultySelectorProps>) {
  const viewModel = useDifficultySelectorViewModel({
    selectedDifficulty,
    setSelectedDifficulty,
  });

  return <DifficultySelectorView {...viewModel} />;
}
