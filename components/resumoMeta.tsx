import { StyleSheet, Text, View } from "react-native";
import Svg, { Path } from "react-native-svg";
import ProgressBar from "./ui/progressBar";

// 1. Criamos a tipagem correta
type ResumoMetaProps = {
  percentage: number;
  value: number;
  meta: number;
};

export default function ResumoMeta({
  percentage,
  value,
  meta,
}: ResumoMetaProps) {
  return (
    <View style={style.container}>
      <View style={style.container_title}>
        <View style={style.container_svg}>
          <Svg
            width={12}
            height={12}
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke={"#F5A623"}
          >
            <Path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 0 0 2.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 0 1 2.916.52 6.003 6.003 0 0 1-5.395 4.972m0 0a6.726 6.726 0 0 1-2.749 1.35m0 0a6.772 6.772 0 0 1-3.044 0"
            />
          </Svg>
        </View>
        <Text style={style.font_title}>Meta Atual</Text>
        {/* Usamos toFixed(0) para não mostrar casas decimais na porcentagem */}
        <Text style={style.font_percentage}>{percentage.toFixed(0)}%</Text>
      </View>
      <View style={style.container_bar}>
        <ProgressBar percentage={percentage} color={"#1A3F7A"} />
      </View>
      <View style={style.container_title_values}>
        {/* 2. Removemos o R$ e o .toFixed(2) já que é quantidade de vendas */}
        <Text style={style.font_value}>{value} Vendas</Text>
        <Text style={style.font_value}>{meta} Vendas</Text>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    width: 338,
    height: 117,
    backgroundColor: "#ffff",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  container_title: {
    flexDirection: "row",
    paddingTop: 10,
    paddingLeft: 10,
  },
  container_title_values: {
    flexDirection: "row",
    paddingTop: 10,
    paddingLeft: 10,
    justifyContent: "space-between", // Empurra um texto pra cada lado
    paddingRight: 30, // Dá uma margem na direita
  },
  container_svg: {
    width: 24,
    height: 24,
    paddingTop: 7,
    paddingLeft: 6,
    borderRadius: 20,
    backgroundColor: "#FFF3D6",
  },
  container_bar: {
    paddingTop: 15,
    paddingLeft: 19,
    width: 320,
  },
  font_title: {
    paddingTop: 5,
    paddingLeft: 10,
    fontSize: 15,
    fontWeight: "bold",
    color: "#0A1628",
  },
  font_percentage: {
    paddingTop: 2,
    marginLeft: "auto", // Joga a porcentagem para o canto direito
    paddingRight: 20,
    fontSize: 25,
    fontWeight: "bold",
    color: "#0F2B5B",
  },
  font_value: {
    paddingLeft: 10,
    fontSize: 12,
    color: "#5A6B82",
  },
});
