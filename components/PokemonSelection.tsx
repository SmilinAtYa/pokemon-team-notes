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
import HookFormInput from "./HookFormInput";

interface PokemonSelectionProps {
  onSelectPokemon: (pokemon: SpeciesData) => void;
  slot: string;
}

const PokemonSelection = ({ onSelectPokemon, slot }: PokemonSelectionProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPokemon, setFilteredPokemon] = useState<SpeciesData>();

  const handleSearchFromPokedex = (text: string) => {
    setSearchQuery(text);
    setFilteredPokemon(Pokedex[text.toLowerCase()]);
  };

  const renderPokemonItem = (pokemon: SpeciesData) => (
    <TouchableOpacity
      onPress={() => {
        setSearchQuery("");
        setFilteredPokemon(undefined);
        onSelectPokemon(pokemon);
      }}
    >
      <Text style={styles.pokemonItem}>{pokemon.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View>
      <HookFormInput
        name={`pokemonNanem${slot}`}
        placeholder="Search Pokémon..."
        value={searchQuery}
        onChangeText={handleSearchFromPokedex}
      />
      <FlatList
        data={
          searchQuery &&
          Object.keys(Pokedex)
            .filter((name) => name.startsWith(searchQuery.toLowerCase()))
            .sort()
        }
        keyExtractor={(item) => item.toString()}
        renderItem={({ item }) => renderPokemonItem(Pokedex[item])}
      />
    </View>
  );
};

const styles = StyleSheet.create({
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
