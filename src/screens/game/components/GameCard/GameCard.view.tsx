import { LinearGradient } from "expo-linear-gradient";
import { Image, Pressable, StyleSheet } from "react-native";
import Animated from "react-native-reanimated";

import { colors, gradients } from "@/constants/colors";
import { AppText } from "@/shared/components/AppText";
import { useGameCardViewModel } from "./useGameCard.viewModel";

export function GameCardView({
  card,
  selectCard,
  backAnimatedStyle,
  frontAnimatedStyle,
}: Readonly<ReturnType<typeof useGameCardViewModel>>) {
  return (
    <Animated.View style={[styles.containerWrapper]}>
      <Pressable style={styles.container} onPress={() => selectCard(card.id)}>
        <Animated.View style={styles.innerContainer}>
          <Animated.View style={[styles.cardFace, frontAnimatedStyle]}>
            <LinearGradient
              style={styles.cardGradient}
              colors={gradients.card}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Image
                source={require("@/assets/transparent-logo.png")}
                style={styles.logoImage}
              />
            </LinearGradient>
          </Animated.View>

          <Animated.View style={[styles.cardFace, backAnimatedStyle]}>
            <LinearGradient
              style={styles.cardGradient}
              colors={gradients.card}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Image source={card.image} style={styles.cardImage} />
              <AppText style={styles.cardText}>{card.name}</AppText>
            </LinearGradient>
          </Animated.View>
        </Animated.View>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  containerWrapper: {
    width: "31%",
    height: 130,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: colors.grayscale.gray400,
    borderRadius: 16,
  },
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
  },
  cardFace: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backfaceVisibility: "hidden",
  },
  cardGradient: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    gap: 8,
  },
  logoImage: {
    width: 40,
    height: 40,
    opacity: 0.4,
  },
  cardImage: {
    width: 42,
    height: 42,
    borderRadius: 8,
  },
  cardText: {
    fontSize: 14,
    color: colors.grayscale.gray100,
  },
});
