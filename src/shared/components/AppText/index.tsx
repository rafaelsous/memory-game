import { Text, TextProps } from "react-native";

import { colors } from "@/constants/colors";

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
