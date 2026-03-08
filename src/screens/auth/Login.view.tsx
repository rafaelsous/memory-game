import { LinearGradient } from "expo-linear-gradient";
import {
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { usePressAnimation } from "@/animations/hooks/usePressAnimation";
import { colors, gradients } from "@/constants/colors";
import Animated from "react-native-reanimated";
import { useLoginViewModel } from "./useLogin.viewModel";

export function LoginView({
  username,
  setUsername,
  handleSubmit,
}: Readonly<ReturnType<typeof useLoginViewModel>>) {
  const handleSubmitPressAnimation = usePressAnimation();

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
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
            <TextInput
              style={styles.input}
              placeholder="Digite seu nome"
              autoCapitalize="words"
              returnKeyType="done"
              onChangeText={setUsername}
              value={username}
            />

            <View style={styles.buttonGlow}>
              <Animated.View style={handleSubmitPressAnimation.animatedStyle}>
                <LinearGradient
                  colors={gradients.colorful}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 2 }}
                  style={styles.buttonGradient}
                >
                  <TouchableOpacity
                    style={styles.button}
                    activeOpacity={0.7}
                    onPress={handleSubmit}
                    onPressIn={handleSubmitPressAnimation.onPressIn}
                    onPressOut={handleSubmitPressAnimation.onPressOut}
                  >
                    <Text style={styles.buttonText}>Entrar</Text>
                  </TouchableOpacity>
                </LinearGradient>
              </Animated.View>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
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
  input: {
    width: "100%",
    paddingVertical: 16,
    paddingHorizontal: 24,
    fontSize: 16,
    color: colors.grayscale.white,
    backgroundColor: colors.grayscale.gray500,
    borderWidth: 1,
    borderColor: colors.grayscale.gray400,
    borderRadius: 50,
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
    paddingVertical: 16,
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
