import FormCadastroMeta from "@/components/formCadastroMeta";
import HistoricoMetas from "@/components/historicoMetas";
import MetaAtual from "@/components/metaAtual";
import Header from "@/components/ui/header";
import NavBar from "@/components/ui/navbar";
import { Meta } from "@/interfaces/Meta";
import { getHistoricoMetas, getMetaAtual } from "@/services/metaService";
import { getGanhoMes } from "@/services/vendasService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Metas() {
  const [meta, setMeta] = useState<Meta | null>(null);
  const [historico, setHistorico] = useState<Meta[]>([]);
  const [qtdVendasRealizadas, setQtdVendasRealizadas] = useState(0);
  const [carregando, setCarregando] = useState(true);

  const carregarDados = async () => {
    try {
      setCarregando(true);
      const usuarioString = await AsyncStorage.getItem("@usuario");
      if (!usuarioString) return;
      const usuario = JSON.parse(usuarioString);

      const [metaData, ganhosData, historicoData] = await Promise.all([
        getMetaAtual(usuario.id).catch(() => null),
        getGanhoMes().catch(() => ({ quantidadeVendas: 0 })),
        getHistoricoMetas().catch(() => []),
      ]);

      setMeta(metaData);
      setQtdVendasRealizadas(ganhosData.quantidadeVendas || 0);
      setHistorico(historicoData);
    } catch (error) {
      console.error(error);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregarDados();
  }, []);

  const alvo = meta ? meta.qtd_vendas_alvo : 0;
  let porcentagem = 0;
  let diasRestantes = 0;

  if (meta && alvo > 0) {
    porcentagem = Math.min((qtdVendasRealizadas / alvo) * 100, 100);

    const dataPrazo = new Date(meta.dta_final);
    const dataHoje = new Date();
    const diferencaTempo = dataPrazo.getTime() - dataHoje.getTime();
    diasRestantes = Math.ceil(diferencaTempo / (1000 * 3600 * 24));
    if (diasRestantes < 0) diasRestantes = 0;
  }

  return (
    <SafeAreaView style={style.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header title={"Metas"} />
        <View style={style.container_content}>
          {carregando ? (
            <ActivityIndicator size="large" color="#0F2B5B" />
          ) : meta ? (
            <MetaAtual
              percentage={porcentagem}
              value={qtdVendasRealizadas}
              meta={alvo}
              diasRestantes={diasRestantes}
            />
          ) : (
            <MetaAtual percentage={0} value={0} meta={0} diasRestantes={0} />
          )}

          <FormCadastroMeta onSave={carregarDados} />

          {!carregando && <HistoricoMetas metas={historico} />}
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
    paddingBottom: 100,
  },
});
