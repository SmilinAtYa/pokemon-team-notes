import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Link, Stack, router } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

import { useColorScheme } from "@/components/useColorScheme";
import { Pressable, SafeAreaView, TouchableOpacity, View } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { MMKVLoader } from "react-native-mmkv-storage";
import LogoScreen from "@/components/Screens/LogoScreen";
import Header from "@/components/Header";
import { H2 } from "@/components/Typography/Typography";
import { lightestGray, midLightGray } from "@/components/Styles/Colors";
import { ScaledSheet } from "react-native-size-matters";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "index",
};

export const storage = new MMKVLoader().initialize();
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return <LogoScreen />;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            header: () => <Header />,
            contentStyle: { backgroundColor: "white" },
          }}
        />
        <Stack.Screen
          name="[id]/[pokemon]"
          options={{ title: "Add note", header: TabHeader }}
        />
        <Stack.Screen
          name="(tabs)"
          options={{
            title: "My Team",
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
          }}
        />
        <Stack.Screen
          name="modal"
          options={{ presentation: "modal", title: "Raycasting Studio" }}
        />
      </Stack>
    </ThemeProvider>
  );
}

interface HeaderProps {
  options: {
    title?: string;
  };
}

const TabHeader = ({ options }: HeaderProps) => {
  if (!options.title) return;
  return (
    <SafeAreaView style={{ backgroundColor: lightestGray }}>
      <TouchableOpacity style={styles.tabHeader} onPress={() => router.back()}>
        {router.canGoBack() && (
          <View style={styles.icon}>
            <FontAwesome color={midLightGray} name="chevron-left" size={10} />
          </View>
        )}
        <H2 color="midLightGray" text={options.title} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = ScaledSheet.create({
  tabHeader: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 12,
  },
  icon: {
    borderColor: midLightGray,
    borderRadius: "45@s",
    borderWidth: "1@s",
    padding: "6@s",
    marginHorizontal: "10@s",
  },
});
