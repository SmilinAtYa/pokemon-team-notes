import { View } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { lightestGray, midLightBlue, neonGreen, red } from "./Styles/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { H4, P2, P4 } from "./Typography/Typography";

interface TeamTableHeaderProps {
  teamName: string;
  amountOfMembers: string;
}

const TeamTableHeader = ({
  teamName,
  amountOfMembers,
}: TeamTableHeaderProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <FontAwesome name="group" size={32} color={lightestGray} />
      </View>
      <View>
        <H4 text={teamName} />
        <P4 text={`${amountOfMembers} Members`} color="midDarkGray" />
      </View>
    </View>
  );
};

export default TeamTableHeader;

const styles = ScaledSheet.create({
  container: {
    flexDirection: "row",
    borderWidth: "0.5@s",
    borderTopLeftRadius: "12@s",
    borderTopRightRadius: "12@s",
    backgroundColor: midLightBlue,
    borderColor: neonGreen,
    padding: "12@s",
    width: "100%",
  },
  iconContainer: {
    alignContent: "center",
    justifyContent: "center",
    padding: "6@s",
    maxWidth: "40@s",
    maxHeight: "40@s",
    borderRadius: "8@s",
    backgroundColor: red,
    marginRight: "12@s",
  },
});
