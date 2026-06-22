import FormCadastroPlano from "@/components/formCadastroPlano";
import Header from "@/components/ui/header"; // Ajuste o caminho se necessário
import NavBar from "@/components/ui/navbar"; // Ajuste o caminho se necessário
import { Plano } from "@/interfaces/Plano";
import { deletePlano, getPlanos } from "@/services/planoService";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";

export default function Planos() {
  const [planos, setPlanos] = useState<Plano[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [modalVisivel, setModalVisivel] = useState(false);

  const carregarPlanos = async () => {
    try {
      setCarregando(true);
      const data = await getPlanos();
      setPlanos(data);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar os planos.");
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregarPlanos();
  }, []);

  const handleExcluir = (id?: string) => {
    if (!id) return;
    Alert.alert("Atenção", "Deseja realmente excluir este plano?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: async () => {
          try {
            await deletePlano(id);
            carregarPlanos(); // Atualiza a lista após excluir
          } catch (error) {
            Alert.alert("Erro", "Não foi possível excluir o plano.");
          }
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={style.container}>
      <Header title={"Meus Planos"} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={style.container_content}>
          {carregando ? (
            <ActivityIndicator
              size="large"
              color="#0F2B5B"
              style={{ marginTop: 20 }}
            />
          ) : planos.length === 0 ? (
            <Text style={style.empty_text}>
              Você ainda não possui planos cadastrados.
            </Text>
          ) : (
            planos.map((plano) => (
              <View key={plano._id} style={style.card_plano}>
                <TouchableOpacity
                  style={style.btn_delete}
                  onPress={() => handleExcluir(plano._id)}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  <Svg
                    width={18}
                    height={18}
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="#D32F2F"
                  >
                    <Path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </Svg>
                </TouchableOpacity>

                <View style={style.info_plano}>
                  <Text style={style.plano_title}>{plano.tipo_plano}</Text>
                  <Text style={style.plano_valor}>
                    {/* Formata para R$ 0.00 */}
                    {Number(plano.valor).toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </Text>
                </View>
              </View>
            ))
          )}
        </View>
      </ScrollView>

      {/* Botão Flutuante (reaproveitando estilo do seu arquivo de Clientes) */}
      <View style={style.botao_flutuante}>
        <TouchableOpacity
          style={style.btn_add}
          onPress={() => setModalVisivel(true)}
        >
          <Svg
            width={24}
            height={24}
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="#FFFFFF"
          >
            <Path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </Svg>
        </TouchableOpacity>
      </View>

      <NavBar />

      {/* Modal de Cadastro */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisivel}
        onRequestClose={() => setModalVisivel(false)}
      >
        <View style={style.modalOverlay}>
          <TouchableOpacity
            style={style.fecharFundo}
            onPress={() => setModalVisivel(false)}
            activeOpacity={1}
          />
          <FormCadastroPlano
            onSuccess={() => {
              setModalVisivel(false);
              carregarPlanos(); // Recarrega após cadastrar com sucesso
            }}
          />
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#eef6ff" },
  container_content: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
    gap: 15,
    paddingBottom: 100,
  },
  empty_text: { textAlign: "center", color: "#5A6B82", marginTop: 40 },

  card_plano: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },

  info_plano: { flex: 1 },
  plano_title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0A1628",
    marginBottom: 4,
  },
  plano_valor: { fontSize: 18, fontWeight: "600", color: "#0F2B5B" },

  btn_delete: {
    position: "absolute",
    top: 15,
    right: 15,
    zIndex: 10,
    elevation: 10,
    padding: 5,
    backgroundColor: "#FDECEA",
    borderRadius: 8,
  },

  botao_flutuante: { position: "absolute", bottom: 80, right: 30 },
  btn_add: {
    backgroundColor: "#0F2B5B",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },

  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  fecharFundo: { ...StyleSheet.absoluteFillObject },
});
