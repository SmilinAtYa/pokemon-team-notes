import { Stack } from "expo-router";
import React from "react";
import { useColorScheme } from "react-native";

const Layout = () => {
  const colorScheme = useColorScheme();

  return (
    <Stack>
      <Stack.Screen
        name="[id]"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default Layout;
