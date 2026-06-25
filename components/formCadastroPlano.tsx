import { Plano } from "@/interfaces/Plano";
import { postPlano, putPlano } from "@/services/planoService";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type Props = {
  onSuccess: () => void;
  planoParaEditar?: Plano | null;
};

export default function FormCadastroPlano({
  onSuccess,
  planoParaEditar,
}: Props) {
  const [tipoPlano, setTipoPlano] = useState("");
  const [valor, setValor] = useState("");
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    if (planoParaEditar) {
      setTipoPlano(planoParaEditar.tipo_plano);
      setValor(planoParaEditar.valor.toString());
    } else {
      setTipoPlano("");
      setValor("");
    }
  }, [planoParaEditar]);

  const handleSalvar = async () => {
    if (!tipoPlano || !valor) {
      Alert.alert("Atenção", "Preencha o nome do plano e o valor.");
      return;
    }

    const valorNumerico = parseFloat(valor.replace(",", "."));

    if (isNaN(valorNumerico)) {
      Alert.alert("Atenção", "Digite um valor numérico válido.");
      return;
    }

    try {
      setSalvando(true);

      if (planoParaEditar) {
        const planoAtualizado: Plano = {
          ...planoParaEditar,
          tipo_plano: tipoPlano,
          valor: valorNumerico,
        };
        await putPlano(planoAtualizado);
        Alert.alert("Sucesso!", "Plano atualizado com sucesso.");
      } else {
        const novoPlano = {
          tipo_plano: tipoPlano,
          valor: valorNumerico,
          status: "ativo",
        } as Plano;
        await postPlano(novoPlano);
        Alert.alert("Sucesso!", "Plano criado com sucesso.");
      }

      onSuccess();
    } catch (error: any) {
      Alert.alert("Erro", "Falha ao salvar o plano.");
    } finally {
      setSalvando(false);
    }
  };

  return (
    <View style={style.container}>
      {/* Título dinâmico */}
      <Text style={style.font_title}>
        {planoParaEditar ? "Editar Plano" : "Novo Plano de Serviço"}
      </Text>

      <View style={style.container_form}>
        <Text style={style.font_label}>Nome do Plano</Text>
        <TextInput
          style={style.font_input}
          placeholder="Ex: Consultoria Mensal"
          placeholderTextColor={"#A0AEC0"}
          value={tipoPlano}
          onChangeText={setTipoPlano}
        />

        <Text style={style.font_label}>Valor (R$)</Text>
        <TextInput
          style={style.font_input}
          placeholder="Ex: 1500.00"
          placeholderTextColor={"#A0AEC0"}
          keyboardType="numeric"
          value={valor}
          onChangeText={setValor}
        />
      </View>

      <View style={style.container_button}>
        <TouchableOpacity
          style={style.button}
          onPress={handleSalvar}
          disabled={salvando}
        >
          {salvando ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <Text style={style.button_text}>
              {planoParaEditar ? "Atualizar Plano" : "Salvar Plano"}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    width: 338,
    borderRadius: 15,
    backgroundColor: "#FFFF",
    paddingVertical: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  font_title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0A1628",
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  container_form: { paddingHorizontal: 20 },
  font_label: {
    fontSize: 14,
    color: "#0A1628",
    marginBottom: 6,
    fontWeight: "500",
  },
  font_input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 8,
    paddingHorizontal: 15,
    height: 45,
    fontSize: 14,
    color: "#1A202C",
    marginBottom: 15,
  },
  container_button: { paddingHorizontal: 20, marginTop: 10 },
  button: {
    backgroundColor: "#0F2B5B",
    height: 45,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  button_text: { color: "#FFFFFF", fontSize: 16, fontWeight: "bold" },
});
