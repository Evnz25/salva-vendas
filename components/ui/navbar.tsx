import { Link } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Svg, { Path } from "react-native-svg";

export default function NavBar() {
  return (
    <View style={styles.container}>
      {/* Início */}
      <Link href={"/app" as any} asChild>
        <TouchableOpacity style={styles.container_icons}>
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
        </TouchableOpacity>
      </Link>

      {/* Clientes */}
      <Link href={"/app/clientes"} asChild>
        <TouchableOpacity style={styles.container_icons}>
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
        </TouchableOpacity>
      </Link>

      {/* Planos */}
      <Link href={"/app/planos"} asChild>
        <TouchableOpacity style={styles.container_icons}>
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
              d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z"
            />
          </Svg>
          <Text style={styles.font_icons}>Planos</Text>
        </TouchableOpacity>
      </Link>

      {/* Vendas (Novo Item) */}
      <Link href={"/app/vendas"} asChild>
        <TouchableOpacity style={styles.container_icons}>
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
              d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
            />
          </Svg>
          <Text style={styles.font_icons}>Vendas</Text>
        </TouchableOpacity>
      </Link>

      {/* Metas */}
      <Link href={"/app/metas"} asChild>
        <TouchableOpacity style={styles.container_icons}>
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
        </TouchableOpacity>
      </Link>
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
    fontSize: 10, // Diminuí um pouco a fonte (de 12 para 10) para caberem 5 itens sem espremer muito no mobile
    fontWeight: "bold",
    color: "#0F2B5B",
  },
});
