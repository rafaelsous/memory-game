import { colors } from "@/constants/colors";
import { Text, TextProps } from "react-native";

export function AppText(params: Readonly<TextProps>) {
  return (
    <Text
      {...params}
      style={[
        { fontFamily: "Baloo2_400Regular", color: colors.grayscale.gray100 },
        params.style,
      ]}
    />
  );
}
