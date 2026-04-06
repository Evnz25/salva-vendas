import { StyleSheet, TouchableOpacity } from "react-native";
import Svg, { Path } from "react-native-svg";

export default function ButtonAddClient() {
  return (
    <TouchableOpacity style={style.container} activeOpacity={0.8}>
      <Svg
        width={20}
        height={20}
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={3}
        stroke={"#FFFF"}
      >
        <Path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 4.5v15m7.5-7.5h-15"
        />
      </Svg>
    </TouchableOpacity>
  );
}

const style = StyleSheet.create({
  container: {
    width: 60,
    height: 60,
    backgroundColor: "#0F2B5B",
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
  },
});
