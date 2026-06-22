import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  token: string | null;
  carregando: boolean;
  login: (token: string, usuario: any) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    // Ao abrir o app, verifica se já existe um token salvo
    async function carregarToken() {
      try {
        const tokenSalvo = await AsyncStorage.getItem("@token_jwt");
        setToken(tokenSalvo);
      } catch (e) {
        console.error(e);
      } finally {
        setCarregando(false);
      }
    }
    carregarToken();
  }, []);

  const login = async (novoToken: string, dadosUsuario: any) => {
    setToken(novoToken);
    await AsyncStorage.setItem("@token_jwt", novoToken);
    await AsyncStorage.setItem("@usuario", JSON.stringify(dadosUsuario));
  };

  const logout = async () => {
    setToken(null);
    await AsyncStorage.removeItem("@token_jwt");
    await AsyncStorage.removeItem("@usuario");
  };

  return (
    <AuthContext.Provider value={{ token, carregando, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  return context;
}
