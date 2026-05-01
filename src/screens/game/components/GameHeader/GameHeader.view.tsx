import { ArrowLeft, Clock4 } from "lucide-react-native";
import { Pressable, StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";

import { usePressAnimation } from "@/animations/hooks/usePressAnimation";
import { colors } from "@/constants/colors";
import { AppText } from "@/shared/components/AppText";
import { useGameHeaderViewModel } from "./useGameHeader.viewModel";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface GameHeaderViewProps {
  onGoBack: () => void;
}

export function GameHeaderView({ onGoBack }: Readonly<GameHeaderViewProps>) {
  const {
    timeString,
    isCriticalTime,
    animatedStyle: countdownAnimatedStyle,
  } = useGameHeaderViewModel();
  const { animatedStyle, onPressIn, onPressOut } = usePressAnimation({
    scaleActive: 0.95,
    width: 40,
  });

  return (
    <View style={styles.container}>
      <AnimatedPressable
        style={[styles.backButton, animatedStyle]}
        onPress={onGoBack}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
      >
        <ArrowLeft size={20} color={colors.grayscale.gray100} />
      </AnimatedPressable>

      <Animated.View style={[styles.countdown, countdownAnimatedStyle]}>
        <Clock4
          size={16}
          color={isCriticalTime ? colors.feedback.danger : colors.feedback.info}
        />

        <AppText
          style={[
            styles.countdownText,
            isCriticalTime && styles.countdownTextCriticalTime,
          ]}
        >
          {timeString}
        </AppText>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.grayscale.gray450,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.grayscale.gray400,
  },
  countdown: {
    width: 100,
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: colors.grayscale.gray450,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.grayscale.gray400,
  },
  countdownText: {
    fontSize: 16,
    color: colors.feedback.info,
  },
  countdownTextCriticalTime: {
    color: colors.feedback.danger,
  },
});
