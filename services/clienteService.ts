import { Cliente } from "@/interfaces/Cliente";
import api from "./api";

export const postCliente = async (clienteData: Cliente) => {
  try {
    const response = await api.post("/clientes", clienteData);
    return response.data;
  } catch (err) {
    console.error("Erro ao cadastrar cliente", err);
    throw err;
  }
};

export const putCliente = async (clienteData: Cliente) => {
  try {
    const response = await api.put(`/clientes/${clienteData._id}`, clienteData);
    return response.data;
  } catch (err) {
    console.error("Erro ao atualizar cliente", err);
    throw err;
  }
};

export const deleteCliente = async (id: String) => {
  try {
    const response = await api.delete(`/clientes/${id}`);
    return response;
  } catch (err) {
    console.error("Erro ao deletar o cliente", err);
    throw err;
  }
};

export const getClientesTotal = async () => {
  try {
    const response = await api.get("/clientes/total");
    return response.data;
  } catch (err) {
    console.error("Erro ao consultar todos os clientes: ", err);
    throw err;
  }
};

export const getClientesRecentes = async () => {
  try {
    const response = await api.get("/clientes/recentes");
    return response.data;
  } catch (err) {
    console.error("Erro ao consultar clientes recentes: ", err);
    throw err;
  }
};
