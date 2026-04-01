import { StyleSheet, View } from "react-native";

import { colors } from "@/constants/colors";
import { AppText } from "@/shared/components/AppText";
import { useCountDownOverlayViewModel } from "./useCountDownOverlay.viewModel";

export function CountDownOverlayView({
  count,
  visible,
}: Readonly<ReturnType<typeof useCountDownOverlayViewModel>>) {
  if (!visible) return;

  return (
    <View style={styles.overlay}>
      <View style={styles.contentWrapper}>
        <AppText style={styles.countText}>{count}</AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    inset: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  contentWrapper: {
    width: 160,
    height: 160,
    alignItems: "center",
    justifyContent: "center",
  },
  countText: {
    fontSize: 72,
    fontFamily: "Baloo2_800ExtraBold",
    color: colors.grayscale.gray100,
  },
});
