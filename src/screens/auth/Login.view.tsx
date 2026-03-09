import { LinearGradient } from "expo-linear-gradient";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Animated from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

import { useInputFocusAnimation } from "@/animations/hooks/useInputFocusAnimation";
import { usePressAnimation } from "@/animations/hooks/usePressAnimation";
import { colors, gradients } from "@/constants/colors";
import { AppText } from "@/shared/components/AppText";
import { useLoginViewModel } from "./useLogin.viewModel";

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

export function LoginView({
  username,
  setUsername,
  handleSubmit,
}: Readonly<ReturnType<typeof useLoginViewModel>>) {
  const handleSubmitPressAnimation = usePressAnimation();
  const textInputFocusAnimation = useInputFocusAnimation();

  return (
    <TouchableWithoutFeedback style={{ flex: 1 }} onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
          <View style={styles.content}>
            <View style={styles.logoContainer}>
              <Image
                style={styles.logo}
                source={require("@/assets/logo.png")}
                resizeMode="contain"
              />

              <View style={styles.textContainer}>
                <AppText style={styles.title}>memory game</AppText>
                <AppText style={styles.subtitle}>
                  Teste sua memória enquanto aprende!
                </AppText>
              </View>
            </View>

            <View style={styles.formContainer}>
              <AnimatedTextInput
                style={[styles.input, textInputFocusAnimation.animatedStyle]}
                placeholder="Digite seu nome"
                autoCapitalize="words"
                returnKeyType="done"
                onChangeText={setUsername}
                value={username}
                onFocus={textInputFocusAnimation.onFocus}
                onBlur={textInputFocusAnimation.onBlur}
                placeholderTextColor={colors.grayscale.gray300}
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
    </TouchableWithoutFeedback>
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
    gap: 16,
  },
  logo: {
    width: 71,
    height: 71,
  },
  textContainer: {
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontFamily: "Baloo2_800ExtraBold",
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
    textAlign: "center",
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
