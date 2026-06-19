import { Meta } from "./Meta";

export type Usuario = {
  _id?: string;
  nome: string;
  email: string;
  senha: string;
  telefone: string;
  metas?: Meta[];
};
