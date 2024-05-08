import { useState } from "react";
import {
  Button,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { H1, P1 } from "./Typography/Typography";
import { useMMKVStorage } from "react-native-mmkv-storage";
import { storage } from "@/app/_layout";
import { useLocalSearchParams } from "expo-router";

interface TeamNoteSectionProps {
  title: string;
}

const TeamNoteSection = ({ title }: TeamNoteSectionProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { id } = useLocalSearchParams<{ id: string }>();
  const [newNote, setNewNote] = useState<string>("");

  const [notes, setNotes] = useMMKVStorage<string[]>(
    `team-${id}-notes-${title}}`,
    storage,
    []
  );

  const handleOnPress = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleEditOnPress = () => {
    setIsEditing(true);
  };

  const handleAddNote = () => {
    if (newNote.trim() !== "") {
      const updatedNotes = [...notes, newNote];
      setNotes(updatedNotes);
      setNewNote("");
    }
  };

  const handleCancel = () => {
    setNewNote("");
    setIsEditing(false);
  };

  return (
    <View>
      <View style={styles.titleContainer}>
        <TouchableOpacity onPress={handleOnPress}>
          <H1 text={title} />
        </TouchableOpacity>
        {!isEditing && (
          <TouchableOpacity onPress={handleEditOnPress}>
            <P1 text="Edit" />
          </TouchableOpacity>
        )}
      </View>

      {isEditing && (
        <>
          <TextInput
            placeholder="Enter a new note"
            value={newNote}
            onChangeText={(text) => setNewNote(text)}
            onSubmitEditing={handleAddNote}
            style={styles.textInput}
          />
          <Button title="Save Note" onPress={handleAddNote} />
          <Button title="Cancel" onPress={handleCancel} />
        </>
      )}

      {!isCollapsed &&
        notes.map((note, index) => (
          <P1 key={index} style={styles.bulletText} text={`• ${note}`} />
        ))}
    </View>
  );
};

export default TeamNoteSection;

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  bulletText: {
    paddingTop: 8,
    marginLeft: 20, // Adjust the indentation for bullet points
  },
  textInput: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
});
