import FormCadastroCliente from "@/components/formCadastroCliente";
import Header from "@/components/ui/header";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CadastroCliente() {
  return (
    <SafeAreaView style={style.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header title={"Novo Cliente"}></Header>
        <View style={style.container_content}>
          <FormCadastroCliente />
        </View>
      </ScrollView>
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
});
