import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function Game() {
  const { themeId, difficulty } = useLocalSearchParams<{
    themeId: string;
    difficulty: string;
  }>();

  return (
    <View>
      <Text>Game Screen</Text>
      <Text>Theme ID: {themeId}</Text>
      <Text>Difficulty: {difficulty}</Text>
    </View>
  );
}
