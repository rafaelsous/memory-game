import { Pressable, StyleSheet, View } from "react-native";

import { colors } from "@/constants/colors";
import { AppText } from "@/shared/components/AppText";
import { Difficulty } from "@/shared/interfaces/difficulty";
import { getDifficultyColor } from "@/shared/utils/difficulty";
import { DifficultyIcon } from "../DifficultyIcon";

interface DifficultyTabProps {
  difficulty: Difficulty;
  isSelected?: boolean;
  setSelectedDifficulty: (difficulty: Difficulty) => void;
}

export function DifficultyTab({
  difficulty,
  setSelectedDifficulty,
  isSelected = false,
}: Readonly<DifficultyTabProps>) {
  const color = getDifficultyColor(difficulty);
  const inactiveColor = colors.grayscale.gray200;
  return (
    <Pressable
      key={difficulty}
      style={styles.difficultyTab}
      onPress={() => setSelectedDifficulty(difficulty)}
    >
      <View style={styles.difficultyBadge}>
        <DifficultyIcon
          difficulty={difficulty}
          color={color}
          inactiveColor={inactiveColor}
          isSelected={isSelected}
        />
        <AppText
          style={{
            ...styles.difficultyLabel,
            fontFamily: isSelected
              ? "Baloo2_800ExtraBold"
              : "Baloo2_400Regular",
            color: isSelected
              ? colors.grayscale.white
              : colors.grayscale.gray100,
          }}
        >
          {difficulty}
        </AppText>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  difficultyTab: {
    paddingVertical: 8,
    flex: 1,
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "center",
    gap: 8,
    borderRadius: 999,
    zIndex: 1,
  },
  difficultyLabel: {
    fontSize: 16,
    color: colors.grayscale.gray100,
  },
  difficultyBadge: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderRadius: "50%",
  },
});
