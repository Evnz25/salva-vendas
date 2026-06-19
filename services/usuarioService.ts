import { Usuario } from "@/interfaces/Usuario";
import api from "./api";

export const postUsuario = async (usuarioData: Usuario) => {
  try {
    const response = await api.post("/usuarios", usuarioData);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar usuario:", error);
    throw error;
  }
};
