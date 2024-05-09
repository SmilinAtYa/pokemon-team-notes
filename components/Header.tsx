import { Image, StyleSheet, View } from "react-native";
import Logo from "../assets/images/logo.png";
import { H2 } from "./Typography/Typography";
import { SafeAreaView } from "react-native-safe-area-context";

const Header = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={{ height: 28, width: 28, marginRight: 8 }}
        resizeMethod="scale"
        resizeMode="contain"
        source={Logo}
      />
      <H2 text="PokéBuild" />
    </SafeAreaView>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 12,
  },
});
