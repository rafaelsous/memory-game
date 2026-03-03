import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors } from "@/constants/colors";

export default function Login() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require("@/assets/logo.png")}
            resizeMode="contain"
          />

          <Text style={styles.title}>memory game</Text>
          <Text style={styles.subtitle}>
            Teste sua memória enquanto aprende!
          </Text>
        </View>

        <View style={styles.formContainer}>
          <TextInput placeholder="Digite seu nome" />

          <TouchableOpacity activeOpacity={0.7}>
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    backgroundColor: colors.grayscale.gray700,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 40,
  },
  logoContainer: {
    alignItems: "center",
    gap: 20,
  },
  logo: {
    width: 71,
    height: 71,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.grayscale.gray100,
  },
  subtitle: {
    fontSize: 16,
    color: colors.grayscale.gray200,
  },
  formContainer: {
    width: "100%",
    gap: 16,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.grayscale.white,
  },
});
