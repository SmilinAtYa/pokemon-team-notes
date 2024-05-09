import { Image, StyleSheet, View } from "react-native";
import Logo from "../assets/images/logo.png";
import { H3 } from "./Typography/Typography";
import { SafeAreaView } from "react-native-safe-area-context";
import { lightestGray } from "./Styles/Colors";
import { ScaledSheet } from "react-native-size-matters";

const Header = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.image}
        resizeMethod="scale"
        resizeMode="contain"
        source={Logo}
      />
      <H3 text="PokéBuild" />
    </SafeAreaView>
  );
};

export default Header;

const styles = ScaledSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: "20@s",
    backgroundColor: lightestGray,
  },
  image: {
    height: "28@s",
    width: "28@s",
    marginRight: "8@s",
  },
});
