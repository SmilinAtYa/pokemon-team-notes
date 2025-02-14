import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs, router } from "expo-router";
import { Pressable, SafeAreaView, TouchableOpacity, View } from "react-native";

import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import { lightestGray, midLightGray } from "@/components/Styles/Colors";
import { H2 } from "@/components/Typography/Typography";
import { ScaledSheet } from "react-native-size-matters";
import TabHeader from "@/components/TabHeader";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)/[id]",
};

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={24} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        header: TabHeader,
        headerRight: () => (
          <Link href="/modal" asChild>
            <Pressable>
              {({ pressed }) => (
                <FontAwesome
                  name="info-circle"
                  size={25}
                  color={Colors[colorScheme ?? "light"].text}
                  style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                />
              )}
            </Pressable>
          </Link>
        ),
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,

        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}
      initialRouteName="index"
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "My Team",
          headerShown: true,

          tabBarIcon: ({ focused }) =>
            TabBarIcon({
              name: "users",
              color: focused ? Colors[colorScheme ?? "light"].tint : "gray",
            }),
        }}
      />
      <Tabs.Screen
        name="team-notes"
        options={{
          headerShown: true,
          title: "Notes",
          tabBarIcon: ({ focused }) =>
            TabBarIcon({
              name: "pencil",
              color: focused ? Colors[colorScheme ?? "light"].tint : "gray",
            }),
        }}
      />
    </Tabs>
  );
}
