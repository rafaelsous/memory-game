import { StyleSheet, View } from "react-native";

import { colors } from "@/constants/colors";
import { AppText } from "@/shared/components/AppText";
import { challengeTheme } from "@/shared/utils/challenge";
import { ChallengeCard } from "./components/ChallengeCard";

export function ChallengeList() {
  return (
    <View style={styles.container}>
      <AppText style={styles.title}>Desafios diponíveis</AppText>
      {challengeTheme.map((challenge) => (
        <ChallengeCard
          key={`challenge-id-${challenge.id}`}
          challenge={challenge}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  title: {
    fontSize: 16,
    color: colors.grayscale.gray200,
  },
});
