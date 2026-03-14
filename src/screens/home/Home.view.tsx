import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors } from "@/constants/colors";
import { ChallengeList } from "./components/ChallengeList";
import { DifficultySelector } from "./components/DifficultySelector";
import { HomeHeader } from "./components/HomeHeader";

export default function HomeView() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <HomeHeader />
        <DifficultySelector />

        <ChallengeList />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.grayscale.gray600,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    gap: 32,
  },
});
