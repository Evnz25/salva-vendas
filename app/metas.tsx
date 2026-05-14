import FormCadastroMeta from "@/components/formCadastroMeta";
import MetaAtual from "@/components/metaAtual";
import Header from "@/components/ui/header";
import NavBar from "@/components/ui/navbar";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Metas() {
  return (
    <SafeAreaView style={style.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header title={"Metas"}></Header>
        <View style={style.container_content}>
          <MetaAtual percentage={89} value={24600} meta={30000} />
          <FormCadastroMeta />
        </View>
      </ScrollView>
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
});
