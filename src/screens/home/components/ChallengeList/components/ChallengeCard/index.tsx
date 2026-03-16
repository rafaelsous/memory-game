import { LinearGradient } from "expo-linear-gradient";
import { ArrowRight } from "lucide-react-native";
import { Pressable, StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";

import { usePressAnimation } from "@/animations/hooks/usePressAnimation";
import { colors } from "@/constants/colors";
import { AppText } from "@/shared/components/AppText";
import { ChallengeTheme } from "@/shared/utils/challenge";

interface ChallengeCardProps {
  challenge: ChallengeTheme;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function ChallengeCard({ challenge }: Readonly<ChallengeCardProps>) {
  const pressAnimation = usePressAnimation();

  return (
    <AnimatedPressable
      style={pressAnimation.animatedStyle}
      onPressIn={pressAnimation.onPressIn}
      onPressOut={pressAnimation.onPressOut}
    >
      <LinearGradient
        colors={challenge.gradient as readonly [string, string, ...string[]]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.container}
      >
        <View style={styles.content}>
          <AppText style={styles.title}>{challenge.title}</AppText>
          <View
            style={[
              styles.arrowButton,
              { backgroundColor: challenge.arrowColor },
            ]}
          >
            <ArrowRight size={20} color={colors.grayscale.gray700} />
          </View>
        </View>
      </LinearGradient>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
  },
  content: {
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    maxWidth: "50%",
    fontSize: 18,
    fontFamily: "Baloo2_800ExtraBold",
    color: colors.grayscale.gray100,
  },
  arrowButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
  },
});
