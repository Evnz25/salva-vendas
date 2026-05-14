import FormCadastroCliente from "@/components/formCadastroCliente";
import ButtonAddClient from "@/components/ui/buttonAddCliente";
import ClientInformation from "@/components/ui/clientInformation";
import Header from "@/components/ui/header";
import NavBar from "@/components/ui/navbar";
import { useState } from "react";
import {
  Modal,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function () {
  const [modalVisivel, setModalVisivel] = useState(false);

  return (
    <SafeAreaView style={style.container}>
      <Header title={"Clientes"} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={style.container_content}>
          <ClientInformation />
        </View>
      </ScrollView>
      <View style={style.botao_flutuante}>
        <ButtonAddClient onPress={() => setModalVisivel(true)} />
      </View>
      <NavBar />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisivel}
        onRequestClose={() => setModalVisivel(false)}
      >
        <View style={style.modalOverlay}>
          {/* Fundo escuro clicável para fechar */}
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
    bottom: 80,
    right: 30,
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
