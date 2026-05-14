import { Usuario } from "@/interfaces/Usuario";
import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:3000",
});

export const postUsuario = async (usuarioData: Usuario) => {
  try {
    const response = await api.post("/usuarios", usuarioData);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar usuario:", error);
    throw error;
  }
};
