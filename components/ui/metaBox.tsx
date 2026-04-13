import { StyleSheet, Text, View } from "react-native";

export default function MetaBox(props: any) {
  return (
    <View style={style.container}>
      <Text style={style.font_title}>{props.title}</Text>
      <Text style={[style.font_value, { color: props.color }]}>
        {props.value}
      </Text>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    width: 90,
    height: 85,
    alignItems: "center",
    backgroundColor: "#243B62",
    borderRadius: 15,
  },

  font_title: {
    fontSize: 14,
    paddingTop: 10,
    textAlign: "center",
    color: "rgba(255, 255, 255, 0.8)",
  },

  font_value: {
    fontSize: 20,
    fontWeight: "bold",
    paddingTop: 6,
  },
});
