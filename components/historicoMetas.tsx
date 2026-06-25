import { Meta } from "@/interfaces/Meta"; // Ajuste o caminho da sua interface
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Svg, { Path } from "react-native-svg";

type Props = {
  metas: Meta[];
};

export default function HistoricoMetas({ metas }: Props) {
  return (
    <View style={style.historico_container}>
      <Text style={style.historico_title}>Histórico de Metas</Text>

      {metas.length === 0 ? (
        <Text style={style.empty_text}>Nenhuma meta registrada ainda.</Text>
      ) : (
        metas.map((meta, index) => {
          // Checa se a meta está ativa ou inativa para mudar as cores
          const isAtiva = meta.status;

          return (
            <View key={index} style={style.card_historico}>
              <View
                style={[
                  style.icon_container,
                  { backgroundColor: isAtiva ? "#E0F2FE" : "#F1F5F9" },
                ]}
              >
                {/* Ícone de Alvo */}
                <Svg
                  width={24}
                  height={24}
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke={isAtiva ? "#0369A1" : "#94A3B8"}
                >
                  <Path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672Zm-7.518-.267A8.25 8.25 0 1 1 20.25 10.5M8.288 14.212A5.25 5.25 0 1 1 17.25 10.5"
                  />
                </Svg>
              </View>

              <View style={style.historico_info}>
                <Text style={style.historico_cliente}>
                  Alvo: {meta.qtd_vendas_alvo} Vendas
                </Text>
                <Text style={style.historico_plano}>
                  {new Date(meta.dta_inicial).toLocaleDateString("pt-BR")} até{" "}
                  {new Date(meta.dta_final).toLocaleDateString("pt-BR")}
                </Text>
              </View>

              <View style={style.historico_valores}>
                <View
                  style={[
                    style.badge_status,
                    { backgroundColor: isAtiva ? "#DCFCE7" : "#FEE2E2" },
                  ]}
                >
                  <Text
                    style={[
                      style.badge_text,
                      { color: isAtiva ? "#05DF72" : "#D32F2F" },
                    ]}
                  >
                    {isAtiva ? "Ativa" : "Inativa"}
                  </Text>
                </View>
              </View>
            </View>
          );
        })
      )}
    </View>
  );
}

const style = StyleSheet.create({
  historico_container: {
    width: "100%",
    maxWidth: 350,
    marginTop: 20,
  },
  historico_title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0A1628",
    marginBottom: 15,
  },
  empty_text: {
    textAlign: "center",
    color: "#5A6B82",
    marginTop: 20,
  },
  card_historico: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  icon_container: {
    padding: 10,
    borderRadius: 50,
    marginRight: 15,
  },
  historico_info: {
    flex: 1,
  },
  historico_cliente: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#0A1628",
  },
  historico_plano: {
    fontSize: 11,
    color: "#5A6B82",
    marginTop: 4,
  },
  historico_valores: {
    alignItems: "flex-end",
  },
  badge_status: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badge_text: {
    fontSize: 12,
    fontWeight: "bold",
  },
});
