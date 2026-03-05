import { LinearGradient } from "expo-linear-gradient";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors, gradients } from "@/constants/colors";

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

          <View style={styles.buttonGlow}>
            <LinearGradient
              colors={gradients.colorful}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 2 }}
              style={styles.buttonGradient}
            >
              <TouchableOpacity style={styles.button} activeOpacity={0.7}>
                <Text style={styles.buttonText}>Entrar</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
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
  // Estilo para o efeito de glow do botão (somente para iOS, pois Android não suporta sombras)
  buttonGlow: {
    shadowColor: colors.accent.purple,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 20,
    elevation: 15,
  },
  buttonGradient: {
    borderRadius: 50,
  },
  button: {
    height: 48,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.grayscale.white,
  },
});
