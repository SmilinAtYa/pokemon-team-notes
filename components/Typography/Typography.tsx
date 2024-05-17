import { ScaledSheet } from "react-native-size-matters";
import { Text, TextStyle } from "react-native";
import { ColorNames } from "../Styles/types";
import * as Colors from "../Styles/Colors";

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

export const H3 = ({ text, style, color }: Typography) => (
  <Text style={[styles.h3, { color: color && Colors[color] }, style]}>
    {text}
  </Text>
);

export const H4 = ({ text, style, color }: Typography) => (
  <Text style={[styles.h4, { color: color && Colors[color] }, style]}>
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

export const P3 = ({ text, style, color }: Typography) => (
  <Text style={[styles.p3, { color: color && Colors[color] }, style]}>
    {text}
  </Text>
);

export const P4 = ({ text, style, color }: Typography) => (
  <Text style={[styles.p4, { color: color && Colors[color] }, style]}>
    {text}
  </Text>
);

const styles = ScaledSheet.create({
  h1: {
    fontSize: "32@s",
    fontWeight: "bold",
  },
  h2: {
    fontSize: "20@s",
    fontWeight: "bold",
  },
  h3: {
    fontSize: "18@s",
    fontWeight: "bold",
  },
  h4: {
    fontSize: "16@s",
    fontWeight: "bold",
  },
  p1: {
    fontSize: "18@s",
  },
  p2: {
    fontSize: "16@s",
  },
  p3: {
    fontSize: "12@s",
  },
  p4: {
    fontSize: "10@s",
  },
});
