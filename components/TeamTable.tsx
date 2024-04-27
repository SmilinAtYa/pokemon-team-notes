import { SpeciesData } from "@/data/global-types";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

interface TeamTableProps {
  team: SpeciesData[];
  isEditing: boolean;
}
const TeamTable = ({ team, isEditing }: TeamTableProps) => {
  return (
    <View>
      {team.map((pokemon) => {
        return (
          <View style={styles.textContainer}>
            <Text style={styles.text}>{pokemon.name}</Text>
            {isEditing && (
              <TouchableOpacity>
                <Text style={[styles.text, styles.delete]}>X</Text>
              </TouchableOpacity>
            )}
          </View>
        );
      })}
    </View>
  );
};

export default TeamTable;

const styles = StyleSheet.create({
  textContainer: {
    flexDirection: "row",
    alignContent: "space-between",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
  delete: {
    color: "red",
    paddingHorizontal: 20,
  },
});
