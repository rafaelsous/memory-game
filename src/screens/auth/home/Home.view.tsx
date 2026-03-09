import { router } from "expo-router";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors } from "@/constants/colors";
import { AppText } from "@/shared/components/AppText";
import { useAuthStore } from "@/shared/stores/auth.store";

export default function HomeView() {
  const { logout } = useAuthStore();

  function handleLogout() {
    logout();
    router.replace("/login");
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <AppText>Home Screen</AppText>

        <TouchableOpacity onPress={handleLogout}>
          <AppText>Sair</AppText>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.grayscale.gray700,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
});
