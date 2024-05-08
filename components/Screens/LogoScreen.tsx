import { Image, StyleSheet, View } from "react-native";

import Logo from "../../assets/images/pokebuilderlogo.png";

const LogoScreen = () => {
  return (
    <View style={styles.container}>
      <Image resizeMethod="scale" resizeMode="contain" source={Logo} />
    </View>
  );
};

export default LogoScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    ...StyleSheet.absoluteFillObject,
  },
});
