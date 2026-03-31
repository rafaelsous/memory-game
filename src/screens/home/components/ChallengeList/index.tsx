import { StyleSheet, View } from "react-native";

import { colors } from "@/constants/colors";
import { AppText } from "@/shared/components/AppText";
import { challengeTheme } from "@/shared/utils/challenge";
import { ChallengeCard } from "./components/ChallengeCard";

interface ChallengeListProps {
  onSelectChallenge: (themeId: string) => void;
}

export function ChallengeList({
  onSelectChallenge,
}: Readonly<ChallengeListProps>) {
  return (
    <View style={styles.container}>
      <AppText style={styles.title}>Desafios diponíveis</AppText>
      {challengeTheme.map((challenge) => (
        <ChallengeCard
          key={`challenge-id-${challenge.id}`}
          challenge={challenge}
          handleSelectChallenge={onSelectChallenge}
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
