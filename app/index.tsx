import Metas from "@/view/metas";
import { StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <SafeAreaProvider>
      {/*<Dashboard></Dashboard>*/}
      {/*<Clientes></Clientes>*/}
      {/*<CadastroCliente />*/}
      <Metas />
    </SafeAreaProvider>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
});
