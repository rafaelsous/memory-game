import { StyleSheet, View } from "react-native";

import { Difficulty } from "@/interfaces/difficulty";
import { useDifficultyIconViewModel } from "./useDifficultyIcon.viewModel";

export interface DifficultyIconViewProps {
  difficulty: Difficulty;
  color: string;
  inactiveColor: string;
  isSelected: boolean;
}

export function DifficultyIconView(props: Readonly<DifficultyIconViewProps>) {
  const { getBarStyle } = useDifficultyIconViewModel(props);

  return (
    <View style={styles.container}>
      {[1, 2, 3].map((index) => (
        <View key={index} style={[styles.bar, getBarStyle(index)]} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 16,
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 2,
  },
  bar: {
    width: 4,
    borderRadius: 999,
  },
});
