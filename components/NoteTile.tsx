import { FontAwesome } from "@expo/vector-icons";
import { View, TouchableOpacity } from "react-native";
import { lightBlue, midGray, offWhite, white } from "./Styles/Colors";
import { P3 } from "./Typography/Typography";
import { ScaledSheet } from "react-native-size-matters";

interface NoteTileProps {
  index: number;
  note: string;
  deleteOnPress: () => void;
}

const NoteTile = ({ index, note, deleteOnPress }: NoteTileProps) => {
  return (
    <View key={index} style={styles.noteAndIconContainer}>
      <View style={styles.noteContainer}>
        <P3 color="gray" text={note} />
      </View>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={deleteOnPress} style={styles.icon}>
          <FontAwesome size={18} name="trash-o" color={midGray} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon}>
          <FontAwesome size={18} name="pencil" color={midGray} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NoteTile;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  textInput: {
    marginBottom: "10@s",
    paddingTop: "10@s",
    paddingHorizontal: "10@s",
    borderWidth: "1@s",
    borderColor: "#ccc",
    height: "150@s",
    borderRadius: "6@s",
  },
  icon: {
    borderRadius: "63@s",
    padding: "6@s",
    backgroundColor: white,
    marginLeft: "6@s",
    borderWidth: "1@s",
    borderColor: offWhite,
  },
  text: {
    paddingVertical: "5@s",
    fontSize: "16@s",
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  mapContent: {
    width: "100%",
    flex: 1,
  },
  mapContainer: { backgroundColor: lightBlue },
  noteContainer: {
    paddingVertical: "6@s",
    paddingHorizontal: "10@s",
    borderWidth: "1@s",
    borderRadius: "8@s",
    borderColor: offWhite,
    width: "85%",
    backgroundColor: white,
  },
  noteAndIconContainer: {
    marginVertical: "5@s",
    flexDirection: "row",
    paddingRight: "20@s",
  },
  padding: {
    padding: "20@s",
  },
});
