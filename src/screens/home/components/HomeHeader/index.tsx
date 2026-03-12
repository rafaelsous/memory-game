import { Trophy } from "lucide-react-native";
import { Pressable, StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";

import { usePressAnimation } from "@/animations/hooks/usePressAnimation";
import { colors } from "@/constants/colors";
import { AppText } from "@/shared/components/AppText";
import { useAuthStore } from "@/shared/stores/auth.store";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function HomeHeader() {
  const { user } = useAuthStore();
  const pressAnimatedStyle = usePressAnimation({
    scaleActive: 0.8,
  });

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <AppText style={styles.title}>Boas vinda, {user?.name}!</AppText>
        <AppText style={styles.subtitle}>
          Comece a jogar selecionando os desafios abaixo!
        </AppText>
      </View>

      <View style={{ width: 40 }}>
        <AnimatedPressable
          style={[styles.button, pressAnimatedStyle.animatedStyle]}
          onPressIn={pressAnimatedStyle.onPressIn}
          onPressOut={pressAnimatedStyle.onPressOut}
        >
          <Trophy size={20} color={colors.accent.lightPurple} />
        </AnimatedPressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  content: {
    maxWidth: "65%",
    gap: 4,
  },
  title: {
    fontSize: 20,
    fontFamily: "Baloo2_700Bold",
  },
  subtitle: {
    fontSize: 16,
    color: colors.grayscale.gray200,
    lineHeight: 20,
  },
  button: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.grayscale.gray450,
    borderWidth: 1,
    borderColor: colors.grayscale.gray400,
  },
});
