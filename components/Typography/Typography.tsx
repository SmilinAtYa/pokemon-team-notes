import * as Colors from "../Styles/Colors";
import { StyleSheet, Text, TextStyle } from "react-native";

type ColorNames = keyof typeof Colors;

interface Typography {
  text: string;
  style?: TextStyle;
  color?: ColorNames;
}

export const H1 = ({ text, style, color }: Typography) => (
  <Text style={[styles.h1, { color: color && Colors[color] }, style]}>
    {text}
  </Text>
);
export const H2 = ({ text, style, color }: Typography) => (
  <Text style={[styles.h2, { color: color && Colors[color] }, style]}>
    {text}
  </Text>
);

export const P1 = ({ text, style, color }: Typography) => (
  <Text style={[styles.p1, { color: color && Colors[color] }, style]}>
    {text}
  </Text>
);
export const P2 = ({ text, style, color }: Typography) => (
  <Text style={[styles.p2, { color: color && Colors[color] }, style]}>
    {text}
  </Text>
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
