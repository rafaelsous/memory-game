import { Clock4 } from "lucide-react-native";
import { StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";

import { colors } from "@/constants/colors";
import { AppText } from "@/shared/components/AppText";
import { Difficulty } from "@/shared/interfaces/difficulty";
import { DifficultyTab } from "./DifficultyTab";
import { useDifficultySelectorViewModel } from "./useDifficultySelector.viewModel";

export interface DifficultySelectorProps {
  selectedDifficulty: Difficulty;
  setSelectedDifficulty: (difficulty: Difficulty) => void;
}

export function DifficultySelectorView({
  selectedDifficulty,
  setSelectedDifficulty,
}: Readonly<DifficultySelectorProps>) {
  const {
    difficulties,
    difficultyConfig,
    timeAnimatedStyle,
    animatedIndicatorStyle,
  } = useDifficultySelectorViewModel({
    selectedDifficulty,
    setSelectedDifficulty,
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <AppText style={styles.headerText}>Dificuldade</AppText>

        <Animated.View style={[styles.timeIndicator, timeAnimatedStyle]}>
          <Clock4 size={16} color={colors.feedback.info} />
          <AppText style={styles.timeIndicatorText}>
            {difficultyConfig.estimedTime}
          </AppText>
        </Animated.View>
      </View>

      <View style={styles.difficultyTabs}>
        <Animated.View style={[styles.indicator, animatedIndicatorStyle]} />
        {difficulties.map((difficulty) => {
          return (
            <DifficultyTab
              key={difficulty}
              difficulty={difficulty}
              setSelectedDifficulty={setSelectedDifficulty}
              isSelected={difficulty === selectedDifficulty}
            />
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
    padding: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    borderWidth: 1,
    borderColor: colors.grayscale.gray400,
    borderRadius: 999,
  },
  indicator: {
    position: "absolute",
    width: "33.33%",
    top: 4,
    left: 0,
    bottom: 4,
    marginLeft: 4,
    zIndex: 0,
    backgroundColor: colors.grayscale.gray500,
    borderWidth: 1,
    borderColor: colors.grayscale.gray400,
    borderRadius: 999,
  },
});
