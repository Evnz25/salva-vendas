import ButtonAddClient from "@/components/ui/buttonAddCliente";
import ClientInformation from "@/components/ui/clientInformation";
import Header from "@/components/ui/header";
import NavBar from "@/components/ui/navbar";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function () {
  return (
    <SafeAreaView style={style.container}>
      <Header title={"Clientes"} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={style.container_content}>
          <ClientInformation />
        </View>
      </ScrollView>
      <View style={style.botao_flutuante}>
        <ButtonAddClient />
      </View>
      <NavBar />
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
});
