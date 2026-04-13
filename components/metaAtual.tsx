import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, View } from "react-native";
import Svg, { Path } from "react-native-svg";
import MetaBox from "./ui/metaBox";
import ProgressBar from "./ui/progressBar";

export default function MetaAtual(props: any) {
  return (
    <View>
      <LinearGradient style={style.container} colors={["#0F2B5B", "#071A3C"]}>
        <View style={style.container_title}>
          <View style={style.container_svg}>
            <Svg
              width={20}
              height={20}
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke={"#F5A623"}
            >
              <Path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 0 0 2.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 0 1 2.916.52 6.003 6.003 0 0 1-5.395 4.972m0 0a6.726 6.726 0 0 1-2.749 1.35m0 0a6.772 6.772 0 0 1-3.044 0"
              />
            </Svg>
          </View>
          <Text style={style.font_title}>Meta Atual</Text>
        </View>
        <View style={style.container_content}>
          <MetaBox title={"Meta"} value={31} color={"#FFFF"} />
          <MetaBox title={"Alcançado"} value={24} color={"#05DF72"} />
          <MetaBox title={"Dias restantes"} value={26} color={"#F5A623"} />
        </View>
        <View style={style.container_barbox}>
          <View style={style.container_values}>
            <Text style={style.font_barname}>Progresso</Text>
            <Text style={style.font_percentage}>82%</Text>
          </View>
          <View style={style.container_bar}>
            <ProgressBar percentage={props.percentage} color={"#FFB900"} />
          </View>
          <View style={style.container_valuesmax}>
            <Text style={style.font_value}>R${props.value.toFixed(2)}</Text>
            <Text style={style.font_value}>R${props.meta.toFixed(2)}</Text>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    width: 338,
    height: 274,
    borderRadius: 20,
  },

  container_title: {
    flexDirection: "row",
    paddingTop: 25,
    paddingLeft: 25,
    alignItems: "center",
  },

  container_svg: {
    width: 36,
    height: 36,
    paddingTop: 7,
    alignItems: "center",
    borderRadius: 15,
    backgroundColor: "#32486F",
  },

  container_content: {
    paddingTop: 17,
    paddingLeft: 25,
    gap: 10,
    flexDirection: "row",
  },

  container_barbox: {
    paddingTop: 30,
    paddingLeft: 12,
    justifyContent: "center",
  },

  container_values: {
    gap: 180,
    flexDirection: "row",
  },

  container_bar: {
    paddingTop: 5,
    paddingLeft: 19,
    width: 300,
  },

  container_valuesmax: {
    gap: 130,
    flexDirection: "row",
  },

  font_title: {
    color: "#FFFF",
    fontSize: 16,
    fontWeight: "bold",
    paddingLeft: 10,
  },

  font_barname: {
    paddingLeft: 20,
    color: "rgba(255, 255, 255, 0.7)",
  },

  font_percentage: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFF",
  },

  font_value: {
    paddingTop: 8,
    paddingLeft: 20,
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.7)",
  },
});
