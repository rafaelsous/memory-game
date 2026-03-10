import { Difficulty } from "@/interfaces/difficulty";

export function useDifficultySelectorViewModel() {
  const difficulties: Difficulty[] = ["Fácil", "Médio", "Difícil"] as const;

  return { difficulties };
}
