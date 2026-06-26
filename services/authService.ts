import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "./api";

export const fazerLogin = async (email: string, senha: string) => {
  try {
    const response = await api.post("/login", { email, senha });

    const { token, usuario } = response.data;

    await AsyncStorage.setItem("@token_jwt", token);
    await AsyncStorage.setItem("@usuario", JSON.stringify(usuario));

    return response.data;
  } catch (error: any) {
    const mensagemErro = error.response?.data?.erro || "Erro ao fazer login";
    throw new Error(mensagemErro);
  }
};
