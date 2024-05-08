import { StyleSheet, Text, TextStyle } from "react-native";

interface Typography {
  text: string;
  style?: TextStyle;
}

export const H1 = ({ text, style }: Typography) => (
  <Text style={[styles.h1, style]}>{text}</Text>
);
export const H2 = ({ text, style }: Typography) => (
  <Text style={[styles.h2, style]}>{text}</Text>
);

export const P1 = ({ text, style }: Typography) => (
  <Text style={[styles.p1, style]}>{text}</Text>
);
export const P2 = ({ text, style }: Typography) => (
  <Text style={[styles.p2, style]}>{text}</Text>
);

const styles = StyleSheet.create({
  h1: {
    fontSize: 32,
    fontWeight: "bold",
  },
  h2: {
    fontSize: 28,
    fontWeight: "bold",
  },
  p1: {
    fontSize: 18,
  },
  p2: {
    fontSize: 16,
  },
});
