import { StyleSheet, Text, View } from "react-native";
import Svg, { Path } from "react-native-svg";

export default function NavBar() {
  return (
    <View style={styles.container}>
      <View style={styles.container_icons}>
        <Svg
          width={24}
          height={24}
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke={"#0F2B5B"}
        >
          <Path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
          />
        </Svg>
        <Text style={styles.font_icons}>Início</Text>
      </View>
      <View style={styles.container_icons}>
        <Svg
          width={24}
          height={24}
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke={"#0F2B5B"}
        >
          <Path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
          />
        </Svg>
        <Text style={styles.font_icons}>Clientes</Text>
      </View>
      <View style={styles.container_icons}>
        <Svg
          width={24}
          height={24}
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke={"#0F2B5B"}
        >
          <Path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605"
          />
        </Svg>
        <Text style={styles.font_icons}>Metas</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 70,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },

  container_icons: {
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },

  font_icons: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#0F2B5B",
  },
});
