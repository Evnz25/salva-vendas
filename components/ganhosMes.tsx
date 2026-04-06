import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, View } from "react-native";
import Svg, { Path } from "react-native-svg";

export default function GanhosMes(props: any) {
  return (
    <View>
      <LinearGradient style={style.container} colors={["#0F2B5B", "#071A3C"]}>
        <View style={style.container_title}>
          <Text style={style.font_title}>Ganho do mês</Text>
          <Svg
            width={35}
            height={35}
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke={"#F5A623"}
          >
            <Path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </Svg>
        </View>
        <View style={style.container_value}>
          <Text style={style.font_value}>R$ {props.value.toFixed(2)}</Text>
        </View>
        <View style={style.container_comparative}>
          <View style={style.container_increase}>
            <Svg
              width={14}
              height={14}
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke={"#05DF72"}
            >
              <Path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941"
              />
            </Svg>
            <Text style={style.font_increase}>{props.increase}%</Text>
          </View>
          <Text style={style.font_comparative}>vs mês anterior</Text>
        </View>
      </LinearGradient>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    width: 338,
    height: 148,
    borderRadius: 20,
  },

  container_title: {
    flexDirection: "row",
    paddingTop: 10,
  },

  container_comparative: {
    flexDirection: "row",
    paddingTop: 25,
    paddingLeft: 20,
  },

  container_value: {
    paddingTop: 5,
  },

  container_increase: {
    backgroundColor: "rgba(0, 201, 80, 0.2)",
    flexDirection: "row",
    paddingTop: 2,
    paddingLeft: 5,
    width: 79,
    height: 21,
    borderRadius: 20,
  },

  font_title: {
    fontFamily: "system-ui",
    paddingTop: 5,
    paddingLeft: 20,
    paddingRight: 150,
    opacity: 0.8,
    fontSize: 17,
    color: "#ffff",
  },

  font_value: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#ffff",
    paddingLeft: 20,
  },

  font_increase: {
    color: "#05DF72",
    paddingLeft: 10,
  },

  font_comparative: {
    paddingLeft: 15,
    opacity: 0.8,
    fontSize: 17,
    color: "#ffff",
  },
});
