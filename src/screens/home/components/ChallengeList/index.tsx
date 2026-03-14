import { View } from "react-native";

import { AppText } from "@/shared/components/AppText";
import { challengeTheme } from "@/shared/utils/challenge";

export function ChallengeList() {
  return (
    <View>
      <AppText>Desafios diponíveis</AppText>
      {challengeTheme.map(({ id, title }) => (
        <View key={id}>
          <AppText>{title}</AppText>
        </View>
      ))}
    </View>
  );
}
