import Header from "@/components/ui/header";
import NavBar from "@/components/ui/navbar";
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
import Svg, { Path } from "react-native-svg";

import { Cliente } from "@/interfaces/Cliente";
import { HistoricoVenda } from "@/interfaces/HistoricoVenda";
import { Plano } from "@/interfaces/Plano";
import { Venda } from "@/interfaces/Venda";
import { getClientesTotal } from "@/services/clienteService";
import { getPlanos } from "@/services/planoService";
import { getHistoricoVendas, postVenda } from "@/services/vendasService";

export default function Vendas() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [planos, setPlanos] = useState<Plano[]>([]);
  const [historicoVendas, setHistoricoVendas] = useState<HistoricoVenda[]>([]);
  const [carregandoDados, setCarregandoDados] = useState(true);

  const [clienteSelecionado, setClienteSelecionado] = useState("");
  const [planoSelecionado, setPlanoSelecionado] = useState("");
  const [valorFechado, setValorFechado] = useState("");
  const [salvando, setSalvando] = useState(false);

  const carregarDependencias = async () => {
    try {
      setCarregandoDados(true);
      const [clientesData, planosData, historicoData] = await Promise.all([
        getClientesTotal(),
        getPlanos(),
        getHistoricoVendas(),
      ]);
      setClientes(clientesData);
      setPlanos(planosData);
      setHistoricoVendas(historicoData);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar os dados.");
    } finally {
      setCarregandoDados(false);
    }
  };

  useEffect(() => {
    carregarDependencias();
  }, []);

  const handleSelecionarPlano = (idPlano: string) => {
    setPlanoSelecionado(idPlano);
    const planoEscolhido = planos.find((p) => p._id === idPlano);
    if (planoEscolhido) {
      setValorFechado(planoEscolhido.valor.toFixed(2).toString());
    } else {
      setValorFechado("");
    }
  };

  const handleRegistrarVenda = async () => {
    if (!clienteSelecionado || !planoSelecionado || !valorFechado) {
      Alert.alert("Atenção", "Preencha todos os campos.");
      return;
    }

    const valorNumerico = parseFloat(valorFechado.replace(",", "."));
    if (isNaN(valorNumerico)) {
      Alert.alert("Atenção", "Digite um valor numérico válido.");
      return;
    }

    try {
      setSalvando(true);

      const novaVenda = {
        cliente_id: clienteSelecionado,
        plano_id: planoSelecionado,
        valor_fechado: valorNumerico,
      } as Venda;

      await postVenda(novaVenda);
      Alert.alert("Sucesso!", "Venda registrada com sucesso!");

      setClienteSelecionado("");
      setPlanoSelecionado("");
      setValorFechado("");

      carregarDependencias();
    } catch (error: any) {
      Alert.alert("Ops!", "Erro ao registrar venda.");
    } finally {
      setSalvando(false);
    }
  };

  return (
    <SafeAreaView style={style.container}>
      <Header title={"Vendas"} />

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
              <>
                <View style={style.card_form}>
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

                <View style={style.historico_container}>
                  <Text style={style.historico_title}>Histórico de Vendas</Text>

                  {historicoVendas.length === 0 ? (
                    <Text style={style.empty_text}>
                      Nenhuma venda registrada ainda.
                    </Text>
                  ) : (
                    historicoVendas.map((venda) => (
                      <View key={venda._id} style={style.card_historico}>
                        <View style={style.icon_container}>
                          <Svg
                            width={24}
                            height={24}
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="#05DF72"
                          >
                            <Path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </Svg>
                        </View>
                        <View style={style.historico_info}>
                          <Text style={style.historico_cliente}>
                            {venda.cliente_nome || "Cliente Removido"}
                          </Text>
                          <Text style={style.historico_plano}>
                            {venda.plano_nome || "Plano Removido"}
                          </Text>
                        </View>
                        <View style={style.historico_valores}>
                          <Text style={style.historico_valor}>
                            {Number(venda.valor_fechado).toLocaleString(
                              "pt-BR",
                              { style: "currency", currency: "BRL" },
                            )}
                          </Text>
                          <Text style={style.historico_data}>
                            {new Date(venda.dta_venda).toLocaleDateString(
                              "pt-BR",
                            )}
                          </Text>
                        </View>
                      </View>
                    ))
                  )}
                </View>
              </>
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
    paddingBottom: 100,
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
    marginBottom: 30,
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

  historico_container: {
    width: "100%",
    maxWidth: 350,
  },
  historico_title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0A1628",
    marginBottom: 15,
  },
  empty_text: {
    textAlign: "center",
    color: "#5A6B82",
    marginTop: 20,
  },
  card_historico: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  icon_container: {
    backgroundColor: "#DCFCE7",
    padding: 10,
    borderRadius: 50,
    marginRight: 15,
  },
  historico_info: {
    flex: 1,
  },
  historico_cliente: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#0A1628",
  },
  historico_plano: {
    fontSize: 12,
    color: "#5A6B82",
    marginTop: 2,
  },
  historico_valores: {
    alignItems: "flex-end",
  },
  historico_valor: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#05DF72",
  },
  historico_data: {
    fontSize: 11,
    color: "#A0AEC0",
    marginTop: 2,
  },
});
