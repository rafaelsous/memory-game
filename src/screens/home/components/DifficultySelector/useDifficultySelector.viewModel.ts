import { useState } from "react";

import { Difficulty } from "@/interfaces/difficulty";

export function useDifficultySelectorViewModel() {
  const difficulties: Difficulty[] = ["Fácil", "Médio", "Difícil"] as const;

  const [selectedDifficulty, setSelectedDifficulty] =
    useState<Difficulty>("Fácil");

  return { difficulties, selectedDifficulty, setSelectedDifficulty };
}
