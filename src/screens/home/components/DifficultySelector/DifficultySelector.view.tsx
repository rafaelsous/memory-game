import { Clock4 } from "lucide-react-native";
import { Pressable, StyleSheet, View } from "react-native";

import { colors } from "@/constants/colors";
import { AppText } from "@/shared/components/AppText";
import { useDifficultySelectorViewModel } from "./useDifficultySelector.viewModel";

export function DifficultySelectorView() {
  const { difficulties } = useDifficultySelectorViewModel();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <AppText style={styles.headerText}>Dificuldade</AppText>

        <View style={styles.timeIndicator}>
          <Clock4 size={16} color={colors.accent.green} />
          <AppText style={styles.timeIndicatorText}>5 min</AppText>
        </View>
      </View>

      <View style={styles.difficultyTabs}>
        {difficulties.map((difficulty) => (
          <Pressable key={difficulty} style={styles.difficultyTab}>
            <AppText>{difficulty}</AppText>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 12,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerText: {
    fontSize: 16,
    color: colors.grayscale.gray200,
  },
  timeIndicator: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: colors.grayscale.gray450,
    borderRadius: 8,
  },
  timeIndicatorText: {
    fontSize: 16,
  },
  difficultyTabs: {
    padding: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    borderWidth: 1,
    borderColor: colors.grayscale.gray400,
    borderRadius: 999,
  },
  difficultyTab: {
    flex: 1,
    paddingVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderRadius: 999,
    zIndex: 1,
  },
});
