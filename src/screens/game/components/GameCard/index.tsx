import { LinearGradient } from "expo-linear-gradient";
import { Pressable, StyleSheet } from "react-native";
import Animated from "react-native-reanimated";

import { colors, gradients } from "@/constants/colors";
import { AppText } from "@/shared/components/AppText";
import { StoreCard } from "@/shared/interfaces/challenge";

interface GameCardProps {
  card: StoreCard;
  index: number;
}

export function GameCard({ card }: Readonly<GameCardProps>) {
  return (
    <Animated.View style={[styles.containerWrapper]}>
      <Pressable style={styles.container}>
        <Animated.View style={styles.innerContainer}>
          <Animated.View></Animated.View>

          <Animated.View style={styles.cardFace}>
            <LinearGradient
              style={styles.cardGradient}
              colors={gradients.card}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <AppText>{card.name}</AppText>
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
  cardContent: {
    alignItems: "center",
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
  },
});
