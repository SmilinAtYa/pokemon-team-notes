import { SpeciesData } from "@/data/global-types";
import { Pokedex } from "@/data/pokedex";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

interface PokemonSelectionProps {
  onSelectPokemon: (pokemon: SpeciesData) => void;
}

const PokemonSelection = ({ onSelectPokemon }: PokemonSelectionProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPokemon, setFilteredPokemon] = useState<SpeciesData>();

  const handleSearchFromPokedex = (text: string) => {
    setSearchQuery(text);
    setFilteredPokemon(Pokedex[text.toLowerCase()]);
    console.log("filtered mon -> ", filteredPokemon);
  };

  const renderPokemonItem = (pokemon: SpeciesData) => (
    <TouchableOpacity onPress={() => onSelectPokemon(pokemon)}>
      <Text style={styles.pokemonItem}>{pokemon.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search Pokémon..."
        value={searchQuery}
        onChangeText={handleSearchFromPokedex}
      />
      <FlatList
        data={
          filteredPokemon &&
          Object.keys(Pokedex).filter((name) =>
            name.includes(searchQuery.toLowerCase())
          )
        }
        keyExtractor={(item) => item.toString()}
        renderItem={({ item }) => renderPokemonItem(Pokedex[item])}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  searchInput: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  pokemonItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
});

export default PokemonSelection;
