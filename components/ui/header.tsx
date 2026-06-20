import { Text } from "@react-navigation/elements";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Svg, { Path } from "react-native-svg";

export default function Header(props: any) {
  return (
    <View style={styles.container}>
      <View style={styles.container_text}>
        <Text style={styles.font_app}>CRM</Text>
        <Text style={styles.font_title}>{props.title}</Text>
      </View>
      <TouchableOpacity
        style={styles.button_logout}
        onPress={() => {
          console.log("Sair do app");
        }}
      >
        <Svg
          width={24}
          height={24}
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="#FFFFFF"
        >
          <Path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
          />
        </Svg>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0F2B5B",
    height: 60,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 15,
  },

  container_text: {
    paddingLeft: 15,
  },

  font_app: {
    opacity: 0.8,
    fontSize: 15,
    color: "#ffff",
  },

  font_title: {
    fontSize: 23,
    fontWeight: "bold",
    color: "#ffff",
  },

  button_logout: {
    padding: 5,
    zIndex: 10,
  },
});
