import { useAuth } from "@/services/authContext";
import { Redirect, Stack } from "expo-router";
import { ActivityIndicator, View } from "react-native";

export default function AppLayout() {
  const { token, carregando } = useAuth();

  if (carregando) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#eef6ff",
        }}
      >
        <ActivityIndicator size="large" color="#0F2B5B" />
      </View>
    );
  }

  if (!token) {
    return <Redirect href={"/auth/login" as any} />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="clientes" />
      <Stack.Screen name="planos" />
      <Stack.Screen name="metas" />
    </Stack>
  );
}
