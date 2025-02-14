import { H1, H3 } from "@/components/Typography/Typography";
import { SpeciesData } from "@/data/global-types";
import { router } from "expo-router";
import { View, TouchableOpacity, ScrollView } from "react-native";
import { useMMKVStorage } from "react-native-mmkv-storage";
import { storage } from "./_layout";
import { TeamFormDefaultValues } from "@/components/CreateTeamForm";
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
  const [teams] = useMMKVStorage<Team[]>("teams", storage, []);
  return (
    <View style={styles.screen}>
      {teams.length > 0 ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.container}
        >
          {teams.map((team, index) => {
            return (
              <View key={index} style={styles.teamBoxContainer}>
                <TouchableOpacity
                  onPress={() => handleOnPress(team.name)}
                  style={styles.teamNameCapsuleContainer}
                >
                  <View style={styles.teamNameCapsule}>
                    <H3 color="gray" text={toCapitalCase(team.name)} />
                    <FontAwesome name="chevron-right" color={gray} size={18} />
                  </View>
                </TouchableOpacity>
                <View style={styles.iconList}>
                  {team.slots.map((team, index) => {
                    return (
                      <View key={index} style={styles.icon}>
                        <PokemonIcon small name={team.pokemonName} />
                      </View>
                    );
                  })}
                </View>
              </View>
            );
          })}
        </ScrollView>
      ) : (
        <View>
          <H3 text="No teams added yet!" />
        </View>
      )}
      <Button
        text="+ Add New Team"
        onPress={() => router.navigate("/new-team")}
        color="blue"
        textColor="white"
      />
    </View>
  );
};

export default TeamSelector;

const styles = ScaledSheet.create({
  screen: {
    flex: 1,
    padding: "24@s",
  },
  container: {
    flex: 1,
    paddingBottom: "24@s",
  },
  teamBoxContainer: {
    flex: 1,
    paddingHorizontal: "12@s",
    paddingVertical: "14@s",
    borderWidth: 0.5,
    borderRadius: 12,
    backgroundColor: "rgba(12, 178, 251, 0.06)",
    borderColor: "rgba(12, 178, 251, 0.4)",
    maxHeight: "120@s",
    marginBottom: "12@s",
  },
  teamNameCapsuleContainer: {
    flexGrow: 1,
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
