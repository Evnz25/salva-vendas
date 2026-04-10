import { StyleSheet, Text, TouchableOpacity } from "react-native";
import Svg, { Path } from "react-native-svg";

export default function ButtonSaveCliente() {
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
        <Path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z"
        />
      </Svg>
      <Text style={style.font_button}>Salvar Cliente</Text>
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
