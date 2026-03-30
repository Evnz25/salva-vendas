import { StyleSheet, View } from "react-native";

export default function ProgressBar(props: any) {
  return (
    <View style={style.track}>
      <View
        style={[
          style.fill,
          { width: `${props.percentage}%`, backgroundColor: `${props.color}` },
        ]}
      ></View>
    </View>
  );
}

const style = StyleSheet.create({
  track: {
    height: 10,
    backgroundColor: "#E8EDF4",
    borderRadius: 10,
    overflow: "hidden",
  },

  fill: {
    height: "100%",
    borderRadius: 10,
  },
});
