import api from "@/services/api";
import { useAuth } from "@/services/authContext";
import { useRouter } from "expo-router";
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
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [carregando, setCarregando] = useState(false);

  const handleLogin = async () => {
    try {
      const resposta = await api.post("/login", { email, senha });

      await login(resposta.data.token, resposta.data.usuario);

      router.replace("/app" as any);
    } catch (error) {
      Alert.alert("Erro", "E-mail ou senha incorretos.");
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

            <View style={style.footer_link}>
              <Text style={style.footer_text}>Não possui uma conta? </Text>
              <TouchableOpacity
                onPress={() => router.push("/auth/cadastro" as any)}
              >
                <Text style={style.footer_text_bold}>Cadastre-se</Text>
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
    backgroundColor: "#eef6ff",
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
    color: "#0A1628",
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
    elevation: 4,
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

  footer_link: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },

  footer_text: {
    color: "#5A6B82",
    fontSize: 14,
  },

  footer_text_bold: {
    color: "#0F2B5B",
    fontSize: 14,
    fontWeight: "bold",
  },

  forgot_password: {
    alignSelf: "flex-end",
    marginBottom: 20,
  },

  forgot_password_text: {
    fontSize: 12,
    color: "#0F2B5B",
    fontWeight: "600",
  },

  container_button: {
    marginTop: 10,
  },

  button: {
    backgroundColor: "#0F2B5B",
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
