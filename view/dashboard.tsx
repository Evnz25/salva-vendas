import GanhosMes from "@/components/ganhosMes";
import ResumoMeta from "@/components/resumoMeta";
import Header from "@/components/ui/header";
import { StyleSheet, View } from "react-native";

export default function Dashboard() {
  return (
    <>
      <View style={style.container}>
        <Header title={"Dashboard"}></Header>
        <View style={style.container_content}>
          <GanhosMes value={24600} increase={26.8} />
          <ResumoMeta />
        </View>
      </View>
    </>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eef6ff",
  },

  container_content: {
    flex: 1,
    paddingTop: 20,
    padding: 10,
    alignItems: "center",
  },
});
