import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { useAuthStore } from "@/shared/stores/auth.store";

export default function Home() {
  const { logout } = useAuthStore();

  function handleLogout() {
    logout();
    router.replace("/login");
  }

  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>

      <TouchableOpacity onPress={handleLogout}>
        <Text>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
