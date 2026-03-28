import { Text } from "@react-navigation/elements";
import { StyleSheet, View } from "react-native";

export default function Header(props: any) {
  return (
    <View style={styles.container}>
      <View style={styles.container_text}>
        <Text style={styles.font_app}>CRM</Text>
        <Text style={styles.font_title}>{props.title}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0F2B5B",
    height: 60,
    width: "100%",
  },

  container_text: {
    padding: 10,
    paddingLeft: 10,
  },

  font_app: {
    fontFamily: "system-ui",
    opacity: 0.8,
    fontSize: 15,
    color: "#ffff",
  },

  font_title: {
    fontSize: 23,
    fontWeight: "bold",
    color: "#ffff",
  },
});
