import { TouchableOpacity } from "react-native";
import * as Colors from "../Styles/Colors";
import { ColorNames } from "../Styles/types";
import { H3 } from "../Typography/Typography";
import { ScaledSheet } from "react-native-size-matters";

interface ButtonProps {
  onPress: () => void;
  text: string;
  color?: ColorNames;
  textColor?: ColorNames;
}

const Button = ({ onPress, text, color, textColor }: ButtonProps) => {
  return (
    <TouchableOpacity
      style={[styles.container, color && { backgroundColor: Colors[color] }]}
      onPress={onPress}
    >
      <H3 style={textColor && { color: Colors[textColor] }} text={text} />
    </TouchableOpacity>
  );
};

export default Button;

const styles = ScaledSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "63@s",
    width: "100%",
    paddingVertical: "16@s",
  },
});
