import { H1, H2 } from "@/components/Typography/Typography";
import { SpeciesData } from "@/data/global-types";
import { router } from "expo-router";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useMMKVStorage } from "react-native-mmkv-storage";
import { storage } from "./_layout";
import CreateTeamForm, {
  TeamFormDefaultValues,
} from "@/components/CreateTeamForm";
import { FontAwesome } from "@expo/vector-icons";
import { toCapitalCase } from "@/utils/format";
import { gray } from "@/components/Styles/Colors";

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
    console.log(newTeam);
    setTeams([...teams, newTeam]);
  };

  return (
    <View style={styles.container}>
      {teams.length > 0 ? (
        <>
          <View style={styles.teamContainer}>
            {teams.map((team, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleOnPress(team.name)}
                  style={styles.team}
                >
                  <View style={styles.teamTitle}>
                    <View style={styles.teamName}>
                      <H2 color="gray" text={toCapitalCase(team.name)} />
                      <FontAwesome
                        name="chevron-right"
                        color={gray}
                        size={18}
                      />
                    </View>
                  </View>
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
    flexDirection: "row",
    justifyContent: "center",
  },
  team: {
    flex: 1,
    padding: 24,
    borderWidth: 0.5,
    borderRadius: 12,
    backgroundColor: "rgba(12, 178, 251, 0.06)",
    borderColor: "rgba(12, 178, 251, 0.4)",
    maxHeight: 150,
  },
  teamTitle: {
    flex: 1,
    maxHeight: 50,
    justifyContent: "center",
    borderRadius: 80,
    backgroundColor: "rgba(255, 255, 255, 1)",
    paddingHorizontal: 10,
  },
  teamName: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
});
