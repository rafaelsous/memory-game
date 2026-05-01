import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors } from "@/constants/colors";
import { AppText } from "@/shared/components/AppText";
import { CardGrid } from "./components/CardGrid";
import { CountDownOverlay } from "./components/CountDownOverlay";
import { GameHeaderView } from "./components/GameHeader/GameHeader.view";
import { useGameViewModel } from "./useGame.viewModel";

export function GameView({
  selectedTheme,
  visibleCountdown,
  handleGoBack,
  handleCountdownComplete,
}: Readonly<ReturnType<typeof useGameViewModel>>) {
  return (
    <SafeAreaView style={styles.container}>
      <GameHeaderView onGoBack={handleGoBack} />

      <View style={styles.header}>
        <AppText style={styles.title}>{selectedTheme?.title}</AppText>
        <AppText style={styles.subtitle}>
          Encontre todos os pares dentro do tempo!
        </AppText>
      </View>

      <CardGrid />

      <CountDownOverlay
        visibleCountDown={visibleCountdown}
        handleCountdownComplete={handleCountdownComplete}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    gap: 32,
    backgroundColor: colors.grayscale.gray700,
  },
  header: {
    gap: 2,
  },
  title: {
    fontSize: 20,
    fontFamily: "Baloo2_800ExtraBold",
    color: colors.grayscale.gray100,
  },
  subtitle: {
    fontSize: 16,
    color: colors.grayscale.gray200,
  },
});
