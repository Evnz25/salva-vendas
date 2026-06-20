import { fazerLogin } from "@/services/authService";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [carregando, setCarregando] = useState(false);
  const navigation = useNavigation<any>();

  const handleLogin = async () => {
    if (!email || !senha) {
      Alert.alert("Atenção", "Preencha o e-mail e a senha.");
      return;
    }
    try {
      setCarregando(true);

      await fazerLogin(email, senha);

      navigation.reset({
        index: 0,
        routes: [{ name: "index" }],
      });
    } catch (error: any) {
      Alert.alert("Falha no login", error.message);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <SafeAreaView style={style.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={style.keyboard_container}
      >
        <View style={style.container_content}>
          {/* Cabeçalho / Logo */}
          <View style={style.header}>
            <Text style={style.title}>Bem-vindo</Text>
            <Text style={style.subtitle}>
              Faça login para acessar o sistema
            </Text>
          </View>

          {/* Formulário (Card Branco) */}
          <View style={style.card_form}>
            <View style={style.input_group}>
              <Text style={style.label}>E-mail</Text>
              <TextInput
                style={style.input}
                placeholder="exemplo@gmail.com"
                placeholderTextColor={"#A0AEC0"}
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
            </View>

            <View style={style.input_group}>
              <Text style={style.label}>Senha</Text>
              <TextInput
                style={style.input}
                placeholder="••••••••"
                placeholderTextColor={"#A0AEC0"}
                secureTextEntry={true}
                value={senha}
                onChangeText={setSenha}
              />
            </View>

            <TouchableOpacity style={style.forgot_password}>
              <Text style={style.forgot_password_text}>
                Esqueceu sua senha?
              </Text>
            </TouchableOpacity>

            <View style={style.container_button}>
              <TouchableOpacity
                style={style.button}
                onPress={handleLogin}
                disabled={carregando}
              >
                {carregando ? (
                  <ActivityIndicator size="small" color="#FFFFFF" />
                ) : (
                  <Text style={style.button_text}>Entrar</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eef6ff", // Mesma cor de fundo do seu projeto
  },

  keyboard_container: {
    flex: 1,
  },

  container_content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  header: {
    alignItems: "center",
    marginBottom: 40,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#0A1628", // Cor padrão dos títulos do seu App
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 14,
    color: "#5A6B82",
  },

  card_form: {
    width: "100%",
    maxWidth: 350,
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4, // Sombra padrão que você usa nos cards
  },

  input_group: {
    marginBottom: 16,
  },

  label: {
    fontSize: 14,
    color: "#0A1628",
    marginBottom: 6,
    fontWeight: "500",
  },

  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 8,
    paddingHorizontal: 15,
    height: 45,
    fontSize: 14,
    color: "#1A202C",
  },

  forgot_password: {
    alignSelf: "flex-end",
    marginBottom: 20,
  },

  forgot_password_text: {
    fontSize: 12,
    color: "#0F2B5B", // Cor de destaque
    fontWeight: "600",
  },

  container_button: {
    marginTop: 10,
  },

  button: {
    backgroundColor: "#0F2B5B", // Azul escuro padrão
    height: 45,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },

  button_text: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
