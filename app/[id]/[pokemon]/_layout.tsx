import { Stack } from "expo-router";

const PokemonNotesLayout = () => (
  <Stack screenOptions={{ headerShown: false }}>
    <Stack.Screen name="index" options={{ headerShown: false }} />
  </Stack>
);

export default PokemonNotesLayout;
