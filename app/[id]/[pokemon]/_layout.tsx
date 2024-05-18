import { white } from "@/components/Styles/Colors";
import { Stack } from "expo-router";

const PokemonNotesLayout = () => (
  <Stack screenOptions={{ headerShown: false }}>
    <Stack.Screen
      name="index"
      options={{
        headerShown: false,
        contentStyle: { backgroundColor: white },
      }}
    />
  </Stack>
);

export default PokemonNotesLayout;
