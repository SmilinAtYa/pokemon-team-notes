import { ScrollView, StyleSheet, TextInput } from "react-native";

import { View } from "@/components/Themed";
import { useState } from "react";
import { H4 } from "@/components/Typography/Typography";
import { ScaledSheet } from "react-native-size-matters";
import Button from "@/components/Button/Button";
import { storage } from "@/app/_layout";
import { useMMKVStorage } from "react-native-mmkv-storage";
import { useLocalSearchParams } from "expo-router";
import {
  lightBlue,
  lightGray,
  lightestGray,
  white,
} from "@/components/Styles/Colors";
import NoteTile from "@/components/NoteTile";

type TeamNotesParams = {
  id: string;
};

export default function TabTwoScreen() {
  const [newNote, setNewNote] = useState("");
  const { id } = useLocalSearchParams<TeamNotesParams>();

  const [notes, setNotes] = useMMKVStorage<string[]>(
    `notes-team-${id}`,
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

  function deleteOnPress(note: string, index: number) {
    return () => {
      const filteredNotes = notes.filter((item) => {
        return item !== note;
      });
      setNotes(filteredNotes);
    };
  }

  return (
    <View style={styles.container}>
      {notes.length > 0 ? (
        <ScrollView style={styles.mapContainer}>
          {notes.map((note, index) => (
            <View style={styles.notesContainer} key={index}>
              <NoteTile
                note={note}
                index={index}
                deleteOnPress={deleteOnPress(note, index)}
              />
            </View>
          ))}
        </ScrollView>
      ) : (
        <View style={[styles.noNotesContainer, styles.mapContainer]}>
          <H4 text="No Notes Saved" color="midDarkGray" />
        </View>
      )}

      <View style={styles.inputContainer}>
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
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  mapContainer: { backgroundColor: lightBlue, padding: "24@s" },
  noNotesContainer: {
    borderColor: lightestGray,
    borderWidth: 1,
    margin: 24,
    borderRadius: 8,
  },
  notesContainer: {
    backgroundColor: "transparent",
  },
  padding: {
    padding: "20@s",
  },
  searchInput: {
    height: "40@s",
    borderColor: "#ccc",
    borderWidth: "1@s",
    borderRadius: "5@s",
    paddingHorizontal: "10@s",
    marginBottom: "10@s",
  },
  inputContainer: {
    padding: "24@s",
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
});
