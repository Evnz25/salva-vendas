import { Usuario } from "@/interfaces/Usuario";
import api from "./api";

export const postUsuario = async (usuarioData: Usuario) => {
  try {
    const response = await api.post("/usuarios", usuarioData);
    return response.data;
  } catch (err) {
    console.error("Erro ao criar usuario:", err);
    throw err;
  }
};

export const putUsuario = async (usuarioData: Usuario) => {
  try {
    const response = await api.put(`/usuarios/${usuarioData._id}`, usuarioData);
    return response.data;
  } catch (err) {
    console.error("Erro ao atualizar o usuario");
    throw err;
  }
};

export const deleteUsuario = async (id: String) => {
  try {
    const response = await api.delete(`/usuarios/${id}`);
    return response;
  } catch (err) {
    console.error("Erro ao deletar o usuario", err);
    throw err;
  }
};
