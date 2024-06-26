import { StyleSheet, TouchableOpacity } from "react-native";

import { Text, View } from "@/components/Themed";
import PokemonSelection from "@/components/PokemonSelection";
import useTeamCreator from "@/hooks/useTeamCreator";
import TeamTable from "../TeamTable";
import { useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { useMMKVStorage } from "react-native-mmkv-storage";
import { storage } from "@/app/_layout";
import { Team as TeamType } from "@/app";
import { SpeciesData } from "@/data/global-types";
import { ScaledSheet } from "react-native-size-matters";
import TeamTableHeader from "../TeamTableHeader";

type TeamParams = {
  id: string;
};

const Team = () => {
  const { addToTeam, team, error } = useTeamCreator();
  const [isEditingTeam, setIsEditingTeam] = useState(false);
  const { id } = useLocalSearchParams<TeamParams>();
  const [teams] = useMMKVStorage<TeamType[]>("teams", storage, []);
  const storedTeam = teams.filter((team) => team.name === id)[0];
  const storedTeamNames: SpeciesData[] = storedTeam?.slots?.map((slot) => {
    return { name: slot.pokemonName };
  });

  return (
    <View style={styles.container}>
      {/* {isEditingTeam ? (
        <TouchableOpacity onPress={() => setIsEditingTeam(false)}>
          <Text style={styles.title}>Save your team</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => setIsEditingTeam(true)}>
          <Text style={styles.title}>Edit your team</Text>
        </TouchableOpacity>
      )} */}

      {error && <Text style={styles.error}>{error}</Text>}
      {isEditingTeam && <PokemonSelection onSelectPokemon={addToTeam} />}
      <TeamTableHeader
        teamName={storedTeam.name}
        amountOfMembers={storedTeam.slots.length.toString()}
      />
      <TeamTable teamId={id} team={storedTeamNames} isEditing={isEditingTeam} />
    </View>
  );
};

export default Team;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: "18@s",
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
