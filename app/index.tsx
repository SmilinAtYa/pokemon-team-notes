import { H1 } from "@/components/Typography/Typography";
import { SpeciesData } from "@/data/global-types";
import { router } from "expo-router";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useMMKVStorage } from "react-native-mmkv-storage";
import { storage } from "./_layout";
import CreateTeamForm, {
  TeamFormDefaultValues,
} from "@/components/CreateTeamForm";

type TeamSlot = {
  pokemonName: string;
  heldItem?: string;
  ability?: SpeciesData["abilities"];
};

export interface Team {
  name: string;
  slots: Array<TeamSlot>;
}

const handleOnPress = (id: string) =>
  router.navigate({
    pathname: "/(tabs)/[id]/",
    params: {
      id,
    },
  });

const TeamSelector = () => {
  const [teams, setTeams] = useMMKVStorage<Team[]>("teams", storage, []);

  const saveTeam = (team: TeamFormDefaultValues) => {
    const newTeam: Team = {
      name: team.name,
      slots: [
        { pokemonName: team["pokemonName0"], heldItem: team["heldItem0"] },
        { pokemonName: team["pokemonName1"], heldItem: team["heldItem1"] },
        { pokemonName: team["pokemonName2"], heldItem: team["heldItem2"] },
        { pokemonName: team["pokemonName3"], heldItem: team["heldItem3"] },
        { pokemonName: team["pokemonName4"], heldItem: team["heldItem4"] },
        { pokemonName: team["pokemonName5"], heldItem: team["heldItem5"] },
      ],
    };

    setTeams([...teams, newTeam]);
  };

  return (
    <View style={styles.container}>
      {teams.length > 0 ? (
        <>
          <H1 text="Select Your Team:" />
          <View style={styles.teamContainer}>
            {teams.map((team, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleOnPress(team.name)}
                  style={styles.team}
                >
                  <Text>{team.name}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
          <TouchableOpacity onPress={() => storage.clearStore()}>
            <H1 text="Clear storage" />
          </TouchableOpacity>
        </>
      ) : (
        <CreateTeamForm saveTeam={saveTeam} />
      )}
    </View>
  );
};

export default TeamSelector;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
  },
  teamContainer: {
    flex: 1,
    justifyContent: "center",
  },
  team: {
    padding: 24,
    backgroundColor: "light-gray",
  },
});
