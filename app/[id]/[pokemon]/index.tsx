import { storage } from "@/app/_layout";
import { H1 } from "@/components/Typography/Typography";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Button, TextInput, View, Text, StyleSheet } from "react-native";
import { useMMKVStorage } from "react-native-mmkv-storage";

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

  if (!pokemon) {
    return (
      <View>
        <H1 text="Error getting pokemon data. Sorry!" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <H1 text={`Notes for: ${pokemon}`} />
      <TextInput
        placeholder="Enter a new note"
        value={newNote}
        onChangeText={(text) => setNewNote(text)}
        onSubmitEditing={handleAddNote}
        style={styles.textInput}
      />
      <Button title="Add Note" onPress={handleAddNote} />
      <View style={styles.mapContainer}>
        {notes.map((note, index) => (
          <Text key={index} style={styles.text}>
            {note}
          </Text>
        ))}
      </View>
    </View>
  );
};

export default PokemonNotes;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  textInput: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  text: {
    paddingVertical: 5,
    fontSize: 16,
  },
  mapContainer: { marginTop: 20 },
});
