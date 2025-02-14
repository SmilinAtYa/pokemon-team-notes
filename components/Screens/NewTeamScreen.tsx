import { View } from "react-native";
import { ScaledSheet, scale } from "react-native-size-matters";
import { H4 } from "../Typography/Typography";
import CreateTeamForm, { TeamFormDefaultValues } from "../CreateTeamForm";

const NewTeamScreen = () => {
  return (
    <View style={styles.container}>
      <H4 color="gray" style={{ fontSize: scale(14) }} text="Team name" />
      <CreateTeamForm />
    </View>
  );
};

export default NewTeamScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    padding: "18@s",
  },
});
