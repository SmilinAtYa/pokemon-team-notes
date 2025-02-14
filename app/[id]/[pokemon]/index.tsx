import { storage } from "@/app/_layout";
import Button from "@/components/Button/Button";
import NoteTile from "@/components/NoteTile";
import {
  lightBlue,
  midGray,
  offWhite,
  white,
} from "@/components/Styles/Colors";
import { H1, H4, P2, P3 } from "@/components/Typography/Typography";
import { FontAwesome } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { TextInput, View, TouchableOpacity, ScrollView } from "react-native";
import { useMMKVStorage } from "react-native-mmkv-storage";
import { ScaledSheet } from "react-native-size-matters";

type PokemonNotesParams = {
  id: string;
  pokemon: string;
};

const PokemonNotes = () => {
  const { pokemon, id } = useLocalSearchParams<PokemonNotesParams>();
  const [newNote, setNewNote] = useState<string>("");

  const [notes, setNotes] = useMMKVStorage<string[]>(
    `notes-${pokemon}-${id}`,
    storage,
    []
  );

  const handleAddNote = () => {
    if (newNote.trim() !== "") {
      const updatedNotes = [...notes, newNote];
      setNotes(updatedNotes);
      setNewNote("");
    }
  };

  function handleOnPress(note: string, index: number) {
    return () => {
      const filteredNotes = notes.filter((item) => {
        return item !== note;
      });
      setNotes(filteredNotes);
    };
  }

  if (!pokemon) {
    return (
      <View>
        <H1 text="Error getting pokemon data. Sorry!" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={[styles.mapContainer, styles.mapContent, styles.padding]}>
        <H4 color="gray" text={`Notes for: ${pokemon}`} />
        <ScrollView style={styles.mapContent}>
          {notes.map((note, index) => (
            <View key={index}>
              <NoteTile
                deleteOnPress={handleOnPress(note, index)}
                note={note}
                index={index}
              />
            </View>
          ))}
        </ScrollView>
      </View>
      <View style={styles.padding}>
        <TextInput
          textAlignVertical="top"
          placeholder="Write your note"
          value={newNote}
          onChangeText={(text) => setNewNote(text)}
          onSubmitEditing={handleAddNote}
          style={styles.textInput}
          multiline
        />
        <Button
          text="Save Note"
          onPress={handleAddNote}
          color="blue"
          textColor="white"
        />
      </View>
    </View>
  );
};

export default PokemonNotes;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  textInput: {
    marginBottom: "10@s",
    paddingTop: "10@s",
    paddingHorizontal: "10@s",
    borderWidth: "1@s",
    borderColor: "#ccc",
    height: "150@s",
    borderRadius: "6@s",
  },
  icon: {
    borderRadius: "63@s",
    padding: "6@s",
    backgroundColor: white,
    marginLeft: "6@s",
  },
  text: {
    paddingVertical: "5@s",
    fontSize: "16@s",
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  mapContent: {
    width: "100%",
    flex: 1,
  },
  mapContainer: { backgroundColor: lightBlue },
  noteContainer: {
    paddingVertical: "6@s",
    paddingHorizontal: "10@s",
    borderWidth: "1@s",
    borderRadius: "8@s",
    borderColor: offWhite,
    width: "85%",
  },
  noteAndIconContainer: {
    marginVertical: "5@s",
    flexDirection: "row",
    paddingRight: "20@s",
  },
  padding: {
    padding: "20@s",
  },
});
