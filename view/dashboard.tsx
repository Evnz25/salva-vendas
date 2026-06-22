import GanhosMes from "@/components/ganhosMes";
import GraficoVendas from "@/components/graficoVendas";
import ResumoMeta from "@/components/resumoMeta";
import Header from "@/components/ui/header";
import NavBar from "@/components/ui/navbar";
import UltimosClientes from "@/components/ultimosClientes";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Cliente } from "@/interfaces/Cliente";
import { TipoGanhoGeralMes } from "@/interfaces/GanhoGeralMes";
import { TipoGanhoMes } from "@/interfaces/GanhoMes";
import { getClientesRecentes } from "@/services/clienteService";
import { getMetaAtual } from "@/services/metaService"; // NOVA IMPORTAÇÃO
import { getGanhoGeralMes, getGanhoMes } from "@/services/vendasService";
import AsyncStorage from "@react-native-async-storage/async-storage"; // NOVA IMPORTAÇÃO
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [ganhoMensalData, setGanhoMensal] = useState<TipoGanhoMes | null>(null);
  const [ganhosMensais, setGanhosMensais] = useState<TipoGanhoGeralMes | null>(
    null,
  );
  const [clientesRecentes, setClientesRecentes] = useState<Cliente[]>([]);
  const [meta, setMeta] = useState<any>(null); // NOVO STATE PARA A META

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

  useEffect(() => {
    const buscarGanhosMensais = async () => {
      try {
        const data = await getGanhoGeralMes();
        setGanhosMensais(data);
      } catch (error) {
        console.error("Erro ao buscar os ganhos mensais: ", error);
      }
    };
    buscarGanhosMensais();
  }, []);

  useEffect(() => {
    const buscarClientes = async () => {
      try {
        const data = await getClientesRecentes();
        setClientesRecentes(data);
      } catch (error) {
        console.error("Erro ao buscar clientes recentes: ", error);
      }
    };
    buscarClientes();
  }, []);

  // NOVO USEFFECT PARA BUSCAR A META
  useEffect(() => {
    const buscarMeta = async () => {
      try {
        const usuarioString = await AsyncStorage.getItem("@usuario");
        if (!usuarioString) return;
        const usuario = JSON.parse(usuarioString);

        const metaData = await getMetaAtual(usuario.id);
        setMeta(metaData);
      } catch (error) {
        // Ignoramos o console.error aqui caso o usuário simplesmente não tenha meta cadastrada ainda
      }
    };
    buscarMeta();
  }, []);

  // MATEMÁTICA DA META
  const alvo = meta ? meta.qtd_vendas_alvo : 0;
  const qtdVendasRealizadas = ganhoMensalData
    ? ganhoMensalData.quantidadeVendas
    : 0;
  let porcentagem = 0;

  if (meta && alvo > 0) {
    porcentagem = Math.min((qtdVendasRealizadas / alvo) * 100, 100);
  }

  return (
    <SafeAreaView style={style.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header title={"Dashboard"}></Header>
        <View style={style.container_content}>
          <GanhosMes
            value={ganhoMensalData ? ganhoMensalData.totalGanhos : 0}
            increase={26.8}
          />
          <GraficoVendas
            dados={ganhosMensais ? ganhosMensais.historicoMensal : null}
          />

          {/* AQUI PASSAMOS OS DADOS DINÂMICOS CALCULADOS */}
          <ResumoMeta
            percentage={porcentagem}
            value={qtdVendasRealizadas}
            meta={alvo}
          />

          <UltimosClientes clientes={clientesRecentes} />
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
    paddingBottom: 100, // Adicionado um respiro no fundo para o NavBar não sobrepor os clientes
  },
});
