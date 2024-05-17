import { SpeciesData } from "@/data/global-types";
import { router } from "expo-router";
import { View, TouchableOpacity } from "react-native";
import PokemonIcon from "./PokemonIcon";
import { P2, P4 } from "./Typography/Typography";
import { borderColor, lightBlue, midGray, white } from "./Styles/Colors";
import { ScaledSheet } from "react-native-size-matters";
import { FontAwesome } from "@expo/vector-icons";

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

  return (
    <View style={styles.container}>
      {team.map((pokemon, index) => {
        if (!pokemon.name) return;
        return (
          <View
            style={[
              styles.teamContainer,
              index < team.length - 1 && styles.bottomBorder,
            ]}
            key={index}
          >
            <View style={styles.memberInfo}>
              <View style={styles.row}>
                <View style={styles.details}>
                  <PokemonIcon name={pokemon.name} />
                  <View style={styles.memberTextInfo}>
                    <P2 color="blue" text={pokemon.name} />
                    <P4 color="midLightGray" text="@ Battle Item" />
                    <P4 color="midLightGray" text="Ability" />
                  </View>
                </View>
                <View style={styles.details}>
                  <TouchableOpacity style={styles.icon}>
                    <FontAwesome size={18} name="trash-o" color={midGray} />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.icon}>
                    <FontAwesome size={18} name="pencil" color={midGray} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => navigateToNotesScreen(pokemon.name)}
                    style={styles.icon}
                  >
                    <FontAwesome
                      size={18}
                      name="chevron-right"
                      color={midGray}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default TeamTable;

const styles = ScaledSheet.create({
  container: {
    width: "100%",
    backgroundColor: lightBlue,
    borderBottomLeftRadius: "12@s",
    borderBottomRightRadius: "12@s",
  },
  delete: {
    color: "red",
    paddingHorizontal: "20@s",
  },
  teamContainer: {
    marginHorizontal: "12@s",
    marginBottom: "8@s",
  },
  bottomBorder: {
    borderBottomWidth: "1@s",
    borderBottomColor: borderColor,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  details: {
    flexDirection: "row",
    alignItems: "center",
  },
  memberInfo: {
    marginVertical: "8@s",
  },
  memberTextInfo: {
    marginLeft: "8@s",
  },
  icon: {
    borderRadius: "63@s",
    padding: "6@s",
    backgroundColor: white,
    marginLeft: "6@s",
  },
});
