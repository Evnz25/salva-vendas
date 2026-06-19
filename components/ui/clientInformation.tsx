import { Cliente } from "@/interfaces/Cliente";
import { deleteCliente } from "@/services/clienteService";
import { useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Svg, { Path } from "react-native-svg";
import FormAtualizacaoCliente from "../formAtualizacaoCliente";
import PlanName from "./planName";

type ClientInfoProps = {
  cliente: Cliente;
};

export default function ClientInfo({ cliente }: ClientInfoProps) {
  const [modalVisible, setModalVisible] = useState(false);

  const getIniciais = (nomeCompleto: string) => {
    if (!nomeCompleto) return "--";

    const partes = nomeCompleto.trim().split(" ");
    if (partes.length >= 2) {
      return (partes[0][0] + partes[1][0]).toUpperCase();
    }
    return nomeCompleto.substring(0, 2).toUpperCase();
  };

  const iniciais = getIniciais(cliente.nome);

  return (
    <View style={style.container}>
      <View style={style.container_top_actions}>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Svg
            width={14}
            height={14}
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke={"#5A6B82"}
          >
            <Path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
            />
          </Svg>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => deleteCliente(cliente._id)}>
          <Svg
            width={14}
            height={14}
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke={"#D32F2F"}
          >
            <Path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </Svg>
        </TouchableOpacity>
      </View>

      <View style={style.container_client}>
        <View style={style.container_clientInitials}>
          <Text style={style.font_clientInitials}>{iniciais}</Text>
        </View>
        <View style={style.container_info}>
          <Text style={style.font_clientName}>{cliente.nome}</Text>
          <Text style={style.font_clientEmail}>{cliente.email}</Text>
          <PlanName type={cliente.status} />
        </View>

        <View style={style.container_svg}>
          <Svg
            width={15}
            height={15}
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke={"#0F2B5B"}
          >
            <Path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
            />
          </Svg>
        </View>
      </View>
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={style.modal_overlay}>
          <FormAtualizacaoCliente
            cliente={cliente}
            onSucess={() => {
              setModalVisible(false);
            }}
          />
        </View>
      </Modal>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    width: 338,
    height: 80,
    justifyContent: "center",
    backgroundColor: "#ffff",
    borderRadius: 20,
    position: "relative",
  },

  container_top_actions: {
    position: "absolute",
    top: 10,
    right: 20,
    flexDirection: "row",
    gap: 12,
    zIndex: 10,
  },

  container_title: {
    flexDirection: "row",
    paddingTop: 10,
  },

  container_client: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  container_clientInitials: {
    width: 45,
    height: 45,
    borderRadius: 20,
    backgroundColor: "#C5D1E3",
    alignItems: "center",
    justifyContent: "center",
  },

  container_info: {
    flex: 1,
    paddingHorizontal: 12,
    justifyContent: "center",
  },

  container_svg: {
    width: 30,
    height: 30,
    borderRadius: 20,
    backgroundColor: "#E8EDF4",
    alignItems: "center",
    justifyContent: "center",
  },

  font_also: {
    paddingTop: 5,
    paddingLeft: 30,
    fontSize: 12,
    color: "#1A3F7A",
  },

  font_title: {
    paddingLeft: 20,
    fontSize: 15,
    fontWeight: "bold",
    color: "#0A1628",
  },

  font_clientInitials: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#0F2B5B",
  },

  font_clientName: {
    fontSize: 14,
    fontWeight: "500",
    color: "#0A1628",
    marginBottom: 2,
  },

  font_clientEmail: {
    fontSize: 10,
    color: "#5A6B82",
    marginBottom: 4,
  },

  modal_overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
});
