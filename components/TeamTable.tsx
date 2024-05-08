import { SpeciesData } from "@/data/global-types";
import { router } from "expo-router";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import PokemonIcon from "./PokemonIcon";

interface TeamTableProps {
  team: SpeciesData[];
  teamId: string;
  isEditing: boolean;
}

const TeamTable = ({ team, isEditing, teamId }: TeamTableProps) => {
  const navigateToNotesScreen = (pokemonName: string) =>
    router.navigate({
      pathname: "/[id]/[pokemon]/",
      params: {
        id: teamId,
        pokemon: pokemonName,
      },
    });

  console.log(JSON.stringify(team, null, 2));
  return (
    <View style={styles.container}>
      {team.map((pokemon, index) => {
        return (
          <View key={index} style={styles.textContainer}>
            <TouchableOpacity
              style={styles.pokemonContainer}
              onPress={() => navigateToNotesScreen(pokemon.name)}
            >
              <PokemonIcon name={pokemon.name} />
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
  container: {
    flexDirection: "row",
  },
  textContainer: {
    flexDirection: "row",
    alignContent: "space-between",
    alignItems: "flex-start",
  },
  pokemonContainer: {
    alignItems: "center",
    flexDirection: "column",
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
