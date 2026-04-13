import { StyleSheet, Text, TouchableOpacity } from "react-native";
import Svg, { Path } from "react-native-svg";

export default function ButtonSave(props: any) {
  return (
    <TouchableOpacity style={style.container} activeOpacity={0.8}>
      <Svg
        width={30}
        height={30}
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1}
        stroke={"#FFFF"}
      >
        <Path stroke-linecap="round" stroke-linejoin="round" d={props.svg} />
      </Svg>
      <Text style={style.font_button}>{props.title}</Text>
    </TouchableOpacity>
  );
}

const style = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignContent: "center",
    width: 300,
    height: 50,
    backgroundColor: "#0F2B5B",
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
  },

  font_button: {
    paddingLeft: 4,
    fontSize: 15,
    fontWeight: "bold",
    color: "#FFFF",
  },
});
