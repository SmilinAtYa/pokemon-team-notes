import { H1 } from "@/components/Typography/Typography";
import { router } from "expo-router";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const ListOfTeams = [
  { key: "1", name: "Team 1", team: [] },
  { key: "2", name: "Team 2", team: [] },
  { key: "3", name: "Team 3", team: [] },
];

const handleOnPress = (id: string) =>
  router.navigate({
    pathname: "/(tabs)/[id]/",
    params: {
      id,
    },
  });

const TeamSelector = () => {
  return (
    <View style={styles.container}>
      <H1 text="Select Your Team:" />

      <View style={styles.teamContainer}>
        {ListOfTeams.map((team) => {
          return (
            <TouchableOpacity
              onPress={() => handleOnPress(team.name)}
              style={styles.team}
            >
              <Text>{team.name}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
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
