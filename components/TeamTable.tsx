import { SpeciesData } from "@/data/global-types";
import { router } from "expo-router";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

interface TeamTableProps {
  team: SpeciesData[];
  teamId: string;
  isEditing: boolean;
}

const TeamTable = ({ team, isEditing, teamId }: TeamTableProps) => {
  const navigateToNotesScreen = (pokemonName: string) =>
    router.navigate({
      pathname: "/(tabs)/[id]/[pokemon]/",
      params: {
        id: teamId,
        pokemon: pokemonName,
      },
    });

  return (
    <View>
      {team.map((pokemon) => {
        return (
          <View style={styles.textContainer}>
            <TouchableOpacity
              onPress={() => navigateToNotesScreen(pokemon.name)}
            >
              <Text style={styles.text}>{pokemon.name}</Text>
            </TouchableOpacity>
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
