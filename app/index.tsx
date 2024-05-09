import { H3 } from "@/components/Typography/Typography";
import { SpeciesData } from "@/data/global-types";
import { router } from "expo-router";
import { View, TouchableOpacity } from "react-native";
import { useMMKVStorage } from "react-native-mmkv-storage";
import { storage } from "./_layout";
import CreateTeamForm, {
  TeamFormDefaultValues,
} from "@/components/CreateTeamForm";
import { FontAwesome } from "@expo/vector-icons";
import { toCapitalCase } from "@/utils/format";
import { gray } from "@/components/Styles/Colors";
import PokemonIcon from "@/components/PokemonIcon";
import { ScaledSheet } from "react-native-size-matters";
import Button from "@/components/Button/Button";

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
    <View style={styles.screen}>
      {teams.length > 0 ? (
        <>
          <View style={styles.container}>
            {teams.map((team, index) => {
              return (
                <View key={index} style={styles.teamBoxContainer}>
                  <TouchableOpacity
                    onPress={() => handleOnPress(team.name)}
                    style={styles.teamNameCapsuleContainer}
                  >
                    <View style={styles.teamNameCapsule}>
                      <H3 color="gray" text={toCapitalCase(team.name)} />
                      <FontAwesome
                        name="chevron-right"
                        color={gray}
                        size={18}
                      />
                    </View>
                  </TouchableOpacity>
                  <View style={styles.iconList}>
                    {team.slots.map((team, index) => {
                      return (
                        <View style={styles.icon}>
                          <PokemonIcon key={index} name={team.pokemonName} />
                        </View>
                      );
                    })}
                  </View>
                </View>
              );
            })}
          </View>
          <Button
            text="+ Add New Team"
            onPress={() => null}
            color="blue"
            textColor="white"
          />
          {/* <TouchableOpacity onPress={() => storage.clearStore()}>
            <H1 text="Clear storage" />
          </TouchableOpacity> */}
        </>
      ) : (
        <CreateTeamForm saveTeam={saveTeam} />
      )}
    </View>
  );
};

export default TeamSelector;

const styles = ScaledSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    padding: "24@s",
  },
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  teamBoxContainer: {
    flex: 1,
    paddingHorizontal: "12@s",
    paddingVertical: "14@s",
    borderWidth: 0.5,
    borderRadius: 12,
    backgroundColor: "rgba(12, 178, 251, 0.06)",
    borderColor: "rgba(12, 178, 251, 0.4)",
    maxHeight: "132@s",
  },
  teamNameCapsuleContainer: {
    flex: 1,
    justifyContent: "center",
    borderRadius: "80@s",
    backgroundColor: "rgba(255, 255, 255, 1)",
    paddingHorizontal: "10@s",
    paddingVertical: "12@s",
    maxHeight: "43@s",
  },
  teamNameCapsule: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: "10@s",
  },
  icon: { alignSelf: "flex-start", marginRight: 8 },
  iconList: {
    flexDirection: "row",
  },
});
