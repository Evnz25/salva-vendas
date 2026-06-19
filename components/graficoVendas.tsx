import { TipoHistoricoMensal } from "@/interfaces/GanhoGeralMes";
import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { BarChart } from "react-native-gifted-charts";

type GraficoVendasProps = {
  dados: TipoHistoricoMensal[] | null;
};

export default function GraficoVendas({ dados }: GraficoVendasProps) {
  if (!dados) {
    return (
      <View
        style={[
          styles.card,
          { justifyContent: "center", alignItems: "center", height: 250 },
        ]}
      >
        <ActivityIndicator size="large" color="#0F2B5B" />
      </View>
    );
  }

  if (dados.length === 0) {
    return (
      <View
        style={[
          styles.card,
          { justifyContent: "center", alignItems: "center", height: 250 },
        ]}
      >
        <Text style={{ color: "#7F8C8D", fontSize: 16 }}>
          Nenhum dado nos últimos 6 meses
        </Text>
      </View>
    );
  }

  const meses = [
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez",
  ];

  const barData = dados.map((item) => {
    return {
      value: item.totalGanhos,
      // Se o Mongo mandar mes: 3. O JS vai pegar nomesMeses[2], que é "Mar"
      label: meses[item._id.mes - 1],
    };
  });

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Histórico de Vendas</Text>
      <View style={styles.chartContainer}>
        <BarChart
          data={barData}
          barWidth={22}
          spacing={18}
          roundedTop
          xAxisThickness={0}
          yAxisThickness={0}
          yAxisTextStyle={{ color: "#7F8C8D" }}
          xAxisLabelTextStyle={{ color: "#7F8C8D", fontSize: 12 }}
          noOfSections={4}
          frontColor="#0F2B5B"
          isAnimated
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 20,
    width: 338,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0F2B5B",
    marginBottom: 20,
  },
  chartContainer: {
    alignItems: "center",
  },
});
