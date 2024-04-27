import { StyleSheet, TouchableOpacity } from "react-native";

import { Text, View } from "@/components/Themed";
import PokemonSelection from "@/components/PokemonSelection";
import useTeamCreator from "@/hooks/useTeamCreator";
import TeamTable from "../TeamTable";
import { useState } from "react";

const Team = () => {
  const { addToTeam, team, error } = useTeamCreator();
  const [isEditingTeam, setIsEditingTeam] = useState(false);

  return (
    <View style={styles.container}>
      {isEditingTeam ? (
        <TouchableOpacity onPress={() => setIsEditingTeam(false)}>
          <Text style={styles.title}>Save your team</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => setIsEditingTeam(true)}>
          <Text style={styles.title}>Edit your team</Text>
        </TouchableOpacity>
      )}

      {error && <Text style={styles.error}>{error}</Text>}
      {isEditingTeam && <PokemonSelection onSelectPokemon={addToTeam} />}
      <TeamTable team={team} isEditing={isEditingTeam} />
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
    </View>
  );
};

export default Team;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  error: {
    fontSize: 20,
    fontWeight: "bold",
    color: "red",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
