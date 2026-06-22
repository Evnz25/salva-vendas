import { Usuario } from "@/interfaces/Usuario";
import { postUsuario } from "@/services/usuarioService";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import MaskInput, { Masks } from "react-native-mask-input";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Cadastro({ navigation }: any) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [carregando, setCarregando] = useState(false);

  const handleCadastro = async () => {
    if (!nome || !email || !telefone || !senha) {
      Alert.alert("Atenção", "Por favor, preencha todos os campos.");
      return;
    }

    if (senha !== confirmarSenha) {
      Alert.alert("Atenção", "As senhas não conferem.");
      return;
    }

    try {
      setCarregando(true);
      const telefoneLimpo = telefone.replace(/\D/g, "");
      const novoUsuario: Usuario = {
        nome: nome,
        email: email.trim().toLowerCase(),
        telefone: telefoneLimpo,
        senha: senha,
      };

      await postUsuario(novoUsuario);

      Alert.alert(
        "Sucesso!",
        "Sua conta foi criada com sucesso.",
        [
          {
            text: "Fazer Login",
            onPress: () => {
              // Mudamos de push para replace e colocamos o 'as any' para garantir que o Expo Router execute o redirecionamento
              router.replace("/auth/login" as any);
            },
          },
        ],
        { cancelable: false }, // Impede o usuário de fechar o alerta clicando fora dele, forçando-o a clicar no botão
      );
    } catch (error: any) {
      const mensagemServidor =
        error.response?.data?.detalhe || // Tenta pegar o "detalhe"
        error.response?.data?.erro || // Se não tiver, tenta pegar o "erro"
        "Erro ao realizar cadastro. Verifique sua conexão."; // Fallback genérico

      Alert.alert("Ops!", mensagemServidor);
      console.error("Erro completo:", error.response?.data); // Joga no terminal para você ver
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
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={style.scroll_content}
        >
          <View style={style.header}>
            <Text style={style.title}>Criar Conta</Text>
            <Text style={style.subtitle}>Preencha seus dados para começar</Text>
          </View>
          <View style={style.card_form}>
            <View style={style.input_group}>
              <Text style={style.label}>Nome Completo</Text>
              <TextInput
                style={style.input}
                placeholder="Ex: João da Silva"
                placeholderTextColor={"#A0AEC0"}
                value={nome}
                onChangeText={setNome}
              />
            </View>

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
              <Text style={style.label}>Telefone</Text>
              <MaskInput
                style={style.input}
                value={telefone}
                onChangeText={(masked) => setTelefone(masked)}
                mask={Masks.BRL_PHONE}
                placeholder="(00) 00000-0000"
                placeholderTextColor={"#A0AEC0"}
                keyboardType="numeric"
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

            <View style={style.input_group}>
              <Text style={style.label}>Confirmar Senha</Text>
              <TextInput
                style={style.input}
                placeholder="••••••••"
                placeholderTextColor={"#A0AEC0"}
                secureTextEntry={true}
                value={confirmarSenha}
                onChangeText={setConfirmarSenha}
              />
            </View>

            <View style={style.container_button}>
              <TouchableOpacity
                style={style.button}
                onPress={handleCadastro}
                disabled={carregando}
              >
                {carregando ? (
                  <ActivityIndicator size="small" color="#FFFFFF" />
                ) : (
                  <Text style={style.button_text}>Cadastrar</Text>
                )}
              </TouchableOpacity>
            </View>

            {/* Link para voltar ao Login */}
            <View style={style.footer_link}>
              <Text style={style.footer_text}>Já possui uma conta? </Text>
              <TouchableOpacity
                onPress={() => router.push("/auth/login" as any)}
              >
                <Text style={style.footer_text_bold}>Faça Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
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

  scroll_content: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 30, // Dá um respiro extra em telas menores
  },

  header: {
    alignItems: "center",
    marginBottom: 30,
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
});
