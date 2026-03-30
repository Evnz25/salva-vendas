import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { BarChart } from "react-native-gifted-charts";

export default function GraficoVendas() {
  const barData = [
    { value: 1500, label: "Jan" },
    { value: 3000, label: "Fev" },
    { value: 4500, label: "Mar" },
    { value: 7800, label: "Abr" },
    { value: 4000, label: "Mai" },
    { value: 2460, label: "Jun" },
  ];
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
