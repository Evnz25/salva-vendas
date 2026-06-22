import Header from "@/components/ui/header"; // Ajuste o caminho
import NavBar from "@/components/ui/navbar"; // Ajuste o caminho
import { Picker } from "@react-native-picker/picker";
import React, { useEffect, useState } from "react";
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
import { SafeAreaView } from "react-native-safe-area-context";

// Importando os serviços
import { Cliente } from "@/interfaces/Cliente";
import { Plano } from "@/interfaces/Plano";
import { Venda } from "@/interfaces/Venda";
import { getClientesTotal } from "@/services/clienteService";
import { getPlanos } from "@/services/planoService";
import { postVenda } from "@/services/vendasService";

export default function Vendas() {
  // Listas vindas do banco de dados
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [planos, setPlanos] = useState<Plano[]>([]);
  const [carregandoDados, setCarregandoDados] = useState(true);

  // Estados do Formulário
  const [clienteSelecionado, setClienteSelecionado] = useState("");
  const [planoSelecionado, setPlanoSelecionado] = useState("");
  const [valorFechado, setValorFechado] = useState("");
  const [salvando, setSalvando] = useState(false);

  // 1. Busca Clientes e Planos ao abrir a tela
  useEffect(() => {
    const carregarDependencias = async () => {
      try {
        setCarregandoDados(true);
        const [clientesData, planosData] = await Promise.all([
          getClientesTotal(),
          getPlanos(),
        ]);
        setClientes(clientesData);
        setPlanos(planosData);
      } catch (error) {
        Alert.alert("Erro", "Não foi possível carregar os clientes e planos.");
      } finally {
        setCarregandoDados(false);
      }
    };
    carregarDependencias();
  }, []);

  // 2. Preenche o valor automaticamente quando um plano é selecionado
  const handleSelecionarPlano = (idPlano: string) => {
    setPlanoSelecionado(idPlano);

    // Procura o plano escolhido na lista para pegar o valor dele
    const planoEscolhido = planos.find((p) => p._id === idPlano);
    if (planoEscolhido) {
      // Converte o número para string para colocar no TextInput (ex: "1500.00")
      setValorFechado(planoEscolhido.valor.toFixed(2).toString());
    } else {
      setValorFechado("");
    }
  };

  const handleRegistrarVenda = async () => {
    if (!clienteSelecionado || !planoSelecionado || !valorFechado) {
      Alert.alert(
        "Atenção",
        "Preencha todos os campos para registrar a venda.",
      );
      return;
    }

    const valorNumerico = parseFloat(valorFechado.replace(",", "."));
    if (isNaN(valorNumerico)) {
      Alert.alert("Atenção", "Digite um valor numérico válido.");
      return;
    }

    try {
      setSalvando(true);

      // Montamos o objeto e forçamos a tipagem da sua interface
      const novaVenda = {
        cliente_id: clienteSelecionado,
        plano_id: planoSelecionado,
        valor_fechado: valorNumerico,
      } as Venda;

      await postVenda(novaVenda);

      Alert.alert("Sucesso!", "Venda registrada com sucesso!");

      // Limpa o formulário após salvar
      setClienteSelecionado("");
      setPlanoSelecionado("");
      setValorFechado("");
    } catch (error: any) {
      // Como o seu serviço dá um "throw err", o erro cai aqui como um objeto do Axios
      const mensagemErro =
        error.response?.data?.erro ||
        error.response?.data?.detalhe ||
        "Erro ao registrar venda.";
      Alert.alert("Ops!", mensagemErro);
    } finally {
      setSalvando(false);
    }
  };

  return (
    <SafeAreaView style={style.container}>
      <Header title={"Registrar Venda"} />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={style.keyboard_container}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={style.container_content}>
            {carregandoDados ? (
              <ActivityIndicator
                size="large"
                color="#0F2B5B"
                style={{ marginTop: 50 }}
              />
            ) : (
              <View style={style.card_form}>
                {/* SELECT DE CLIENTES */}
                <Text style={style.font_label}>Cliente</Text>
                <View style={style.pickerWrapper}>
                  <Picker
                    selectedValue={clienteSelecionado}
                    onValueChange={(itemValue) =>
                      setClienteSelecionado(itemValue)
                    }
                    style={style.picker}
                  >
                    <Picker.Item
                      label="Selecione um cliente..."
                      value=""
                      color="#A0AEC0"
                    />
                    {clientes.map((cliente) => (
                      <Picker.Item
                        key={cliente._id}
                        label={cliente.nome}
                        value={cliente._id}
                      />
                    ))}
                  </Picker>
                </View>

                {/* SELECT DE PLANOS */}
                <Text style={style.font_label}>Plano / Serviço</Text>
                <View style={style.pickerWrapper}>
                  <Picker
                    selectedValue={planoSelecionado}
                    onValueChange={handleSelecionarPlano}
                    style={style.picker}
                  >
                    <Picker.Item
                      label="Selecione um plano..."
                      value=""
                      color="#A0AEC0"
                    />
                    {planos.map((plano) => (
                      <Picker.Item
                        key={plano._id}
                        label={plano.tipo_plano}
                        value={plano._id}
                      />
                    ))}
                  </Picker>
                </View>

                {/* VALOR FECHADO */}
                <Text style={style.font_label}>Valor Fechado (R$)</Text>
                <TextInput
                  style={style.font_input}
                  placeholder="0.00"
                  placeholderTextColor={"#A0AEC0"}
                  keyboardType="numeric"
                  value={valorFechado}
                  onChangeText={setValorFechado}
                />

                <View style={style.container_button}>
                  <TouchableOpacity
                    style={style.button}
                    onPress={handleRegistrarVenda}
                    disabled={
                      salvando || clientes.length === 0 || planos.length === 0
                    }
                  >
                    {salvando ? (
                      <ActivityIndicator size="small" color="#FFFFFF" />
                    ) : (
                      <Text style={style.button_text}>Confirmar Venda</Text>
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <NavBar />
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
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 40,
    alignItems: "center",
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
  font_label: {
    fontSize: 14,
    color: "#0A1628",
    marginBottom: 6,
    fontWeight: "500",
    marginTop: 10,
  },
  pickerWrapper: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 8,
    height: 45,
    justifyContent: "center",
    marginBottom: 5,
  },
  picker: {
    borderWidth: 0,
    backgroundColor: "transparent",
    color: "#1A202C",
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
    marginBottom: 10,
  },
  container_button: {
    marginTop: 20,
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
