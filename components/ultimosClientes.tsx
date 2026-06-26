import { Cliente } from "@/interfaces/Cliente";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import ClientInformation from "./ui/clientInformation";

type UltimosClientesProps = {
  clientes: Cliente[];
};

export default function UltimosClientes({ clientes }: UltimosClientesProps) {
  return (
    <View style={style.container}>
      <View style={style.container_title}>
        <Text style={style.font_title}>Últimos Clientes Cadastrados</Text>
      </View>
      {clientes.length === 0 ? (
        <View style={{ padding: 20, alignItems: "center" }}>
          <ActivityIndicator size="small" color="#0A1628" />
        </View>
      ) : (
        clientes.map((cliente) => (
          <ClientInformation key={cliente._id} cliente={cliente} />
        ))
      )}
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    width: 338,
    backgroundColor: "#ffff",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },

  container_title: {
    flexDirection: "row",
    paddingTop: 10,
  },

  container_client: {
    flexDirection: "row",
    paddingTop: 8,
    paddingLeft: 20,
    paddingBottom: 10,
  },

  container_clientInitials: {
    width: 35,
    height: 35,
    borderRadius: 20,
    backgroundColor: "#C5D1E3",
    alignItems: "center",
    justifyContent: "center",
  },

  container_svg: {
    width: 32,
    height: 32,
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
  },

  font_clientName: {
    paddingLeft: 4,
    fontSize: 14,
    fontWeight: "500",
    color: "#0A1628",
  },

  font_clientEmail: {
    paddingRight: 100,
    paddingLeft: 4,
    fontSize: 10,
    color: "#5A6B82",
  },
});
