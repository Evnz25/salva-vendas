import GanhosMes from "@/components/ganhosMes";
import GraficoVendas from "@/components/graficoVendas";
import ResumoMeta from "@/components/resumoMeta";
import Header from "@/components/ui/header";
import NavBar from "@/components/ui/navbar";
import UltimosClientes from "@/components/ultimosClientes";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { TipoGanhoMes } from "@/interfaces/GanhoMes";
import { getGanhoMes } from "@/services/vendasService";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [ganhoMensalData, setGanhoMensal] = useState<TipoGanhoMes | null>(null);

  useEffect(() => {
    const buscarGanhos = async () => {
      try {
        const data = await getGanhoMes();
        setGanhoMensal(data);
      } catch (error) {
        console.error("Erro ao buscar o ganho do mes: ", error);
      }
    };
    buscarGanhos();
  }, []);

  return (
    <SafeAreaView style={style.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header title={"Dashboard"}></Header>
        <View style={style.container_content}>
          <GanhosMes
            value={ganhoMensalData ? ganhoMensalData.totalGanhos : 0}
            increase={26.8}
          />
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
