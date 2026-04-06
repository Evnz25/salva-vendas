import GanhosMes from "@/components/ganhosMes";
import GraficoVendas from "@/components/graficoVendas";
import ResumoMeta from "@/components/resumoMeta";
import Header from "@/components/ui/header";
import NavBar from "@/components/ui/navbar";
import UltimosClientes from "@/components/ultimosClientes";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Dashboard() {
  return (
    <SafeAreaView style={style.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header title={"Dashboard"}></Header>
        <View style={style.container_content}>
          <GanhosMes value={24600} increase={26.8} />
          <GraficoVendas />
          <ResumoMeta percentage={82} value={24600} meta={30000} />
          <UltimosClientes />
        </View>
      </ScrollView>
      <NavBar></NavBar>
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
