import FormCadastroCliente from "@/components/formCadastroCliente";
import ButtonAddClient from "@/components/ui/buttonAddCliente";
import ClientInformation from "@/components/ui/clientInformation";
import Header from "@/components/ui/header";
import NavBar from "@/components/ui/navbar";
import { Cliente } from "@/interfaces/Cliente";
import { getClientesTotal } from "@/services/clienteService";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Modal,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function () {
  const [modalVisivel, setModalVisivel] = useState(false);
  const [clientesTotal, setClientesTotal] = useState<Cliente[]>([]);

  useEffect(() => {
    const buscarClientes = async () => {
      try {
        const data = await getClientesTotal();
        setClientesTotal(data);
      } catch (error) {
        console.error("Erro ao buscar clientes recentes: ", error);
      }
    };
    buscarClientes();
  }, []);

  return (
    <SafeAreaView style={style.container}>
      <Header title={"Clientes"} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={style.container_content}>
          {clientesTotal.length === 0 ? (
            <View style={{ padding: 20, alignItems: "center" }}>
              <ActivityIndicator size="small" color="#0A1628" />
            </View>
          ) : (
            clientesTotal.map((cliente) => (
              <ClientInformation key={cliente._id} cliente={cliente} />
            ))
          )}
        </View>
      </ScrollView>
      <NavBar />
      <View style={style.botao_flutuante}>
        <ButtonAddClient onPress={() => setModalVisivel(true)} />
      </View>
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

          <FormCadastroCliente onSucess={() => setModalVisivel(false)} />
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eef6ff",
  },

  container_content: {
    flex: 1,
    paddingTop: 20,
    gap: 20,
    alignItems: "center",
  },

  botao_flutuante: {
    position: "absolute",
    bottom: 130,
    right: 30,
    elevation: 999,
  },

  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  fecharFundo: {
    ...StyleSheet.absoluteFillObject,
  },
});
