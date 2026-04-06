import { StyleSheet, Text, View } from "react-native";
import Svg, { Path } from "react-native-svg";
import PlanName from "./planName";

export default function () {
  return (
    <View style={style.container}>
      <View style={style.container_client}>
        <View style={style.container_clientInitials}>
          <Text style={style.font_clientInitials}>CH</Text>
        </View>
        <View>
          <Text style={style.font_clientName}>Carlos Henrique</Text>
          <Text style={style.font_clientEmail}>carloshenrique@example.com</Text>
          <PlanName type="CONTRATO_ASSINADO" />
        </View>
        <View style={style.container_svg}>
          <Svg
            width={15}
            height={15}
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke={"#0F2B5B"}
          >
            <Path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
            />
          </Svg>
        </View>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    width: 338,
    height: 80,
    justifyContent: "center",
    alignContent: "center",
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
  },

  container_client: {
    flexDirection: "row",
    paddingTop: 8,
    paddingLeft: 20,
    paddingBottom: 10,
  },

  container_clientInitials: {
    width: 45,
    height: 45,
    borderRadius: 20,
    backgroundColor: "#C5D1E3",
    alignItems: "center",
    justifyContent: "center",
  },

  container_svg: {
    width: 35,
    height: 35,
    borderRadius: 20,
    backgroundColor: "#E8EDF4",
    alignItems: "center",
    justifyContent: "center",
  },

  font_also: {
    paddingTop: 5,
    paddingLeft: 30,
    fontSize: 12,
    color: "#1A3F7A",
  },

  font_title: {
    paddingLeft: 20,
    fontSize: 15,
    fontWeight: "bold",
    color: "#0A1628",
  },

  font_clientInitials: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#0F2B5B",
  },

  font_clientName: {
    paddingTop: 5,
    paddingLeft: 4,
    paddingRight: 120,
    fontSize: 14,
    fontWeight: "500",
    color: "#0A1628",
  },

  font_clientEmail: {
    paddingLeft: 4,
    paddingBottom: 2,
    fontSize: 10,
    color: "#5A6B82",
  },
});
