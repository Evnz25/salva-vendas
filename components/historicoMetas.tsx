import { Meta } from "@/interfaces/Meta";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Svg, { Path } from "react-native-svg";

type Props = {
  metas: Meta[];
  onDelete: (id: string) => void;
};

export default function HistoricoMetas({ metas, onDelete }: Props) {
  return (
    <View style={style.historico_container}>
      <Text style={style.historico_title}>Histórico de Metas</Text>

      {metas.length === 0 ? (
        <Text style={style.empty_text}>Nenhuma meta registrada ainda.</Text>
      ) : (
        metas.map((meta, index) => {
          const isAtiva = meta.status;

          return (
            <View key={index} style={style.card_historico}>
              <TouchableOpacity
                style={style.btn_delete}
                onPress={() => meta._id && onDelete(meta._id)}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Svg
                  width={16}
                  height={16}
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="#D32F2F"
                >
                  <Path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </Svg>
              </TouchableOpacity>

              <View
                style={[
                  style.icon_container,
                  { backgroundColor: isAtiva ? "#E0F2FE" : "#F1F5F9" },
                ]}
              >
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

              <View style={style.historico_valores}></View>
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
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    position: "relative",
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
    paddingTop: 15,
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
  btn_delete: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 10,
    padding: 6,
    backgroundColor: "#FDECEA",
    borderRadius: 8,
  },
});
