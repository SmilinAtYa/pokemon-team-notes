import { StyleSheet, Text } from "react-native";

interface Typography {
  text: string;
}

export const H1 = ({ text }: Typography) => (
  <Text style={styles.h1}>{text}</Text>
);

const styles = StyleSheet.create({
  h1: {
    fontSize: 32,
    fontWeight: "bold",
  },
});
