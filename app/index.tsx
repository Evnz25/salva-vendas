import Dashboard from "@/view/dashboard";
import { StyleSheet } from "react-native";

export default function HomeScreen() {
  return <Dashboard></Dashboard>;
}
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
});
