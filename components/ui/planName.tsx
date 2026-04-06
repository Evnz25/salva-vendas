import { StyleSheet, Text, View } from "react-native";

export type PlanStatus =
  | "CONTRATO_ASSINADO"
  | "EM_NEGOCIACAO"
  | "CANCELADO"
  | "PROSPECCAO";

const PLAN_CONFIG = {
  CONTRATO_ASSINADO: {
    label: "Contrato Assinado",
    bgColor: "#DCFCE7",
    textColor: "#008236",
  },
  EM_NEGOCIACAO: {
    label: "Em Negociacao",
    bgColor: "#FEF9C3",
    textColor: "#854D0E",
  },
  CANCELADO: {
    label: "Cancelado",
    bgColor: "#FEE2E2",
    textColor: "#991B1B",
  },
  PROSPECCAO: {
    label: "Prospecção",
    bgColor: "#E0F2FE",
    textColor: "#0369A1",
  },
};

interface PlanNameProps {
  type: PlanStatus;
}

export default function PlanName({ type }: PlanNameProps) {
  const config = PLAN_CONFIG[type];

  return (
    <View style={[style.container, { backgroundColor: config.bgColor }]}>
      <Text style={[style.font, { color: config.textColor }]}>
        {config.label}
      </Text>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
    alignSelf: "flex-start",
  },

  font: {
    fontSize: 11,
    fontWeight: "600",
  },
});
