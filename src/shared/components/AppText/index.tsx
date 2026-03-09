import { Text, TextProps } from "react-native";

export function AppText(params: Readonly<TextProps>) {
  return (
    <Text
      {...params}
      style={[{ fontFamily: "Baloo2_400Regular" }, params.style]}
    />
  );
}
