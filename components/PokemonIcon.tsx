import { useEffect, useState } from "react";
import { Image, StyleSheet } from "react-native";

interface PokemonIconProps {
  name?: string;
}

type PokemonSpritesType = {
  front_default: string;
  front_shiny: string;
  back_default: string;
  back_shiny: string;
};

type PokemonData = {
  sprites: PokemonSpritesType;
};

const PokemonIcon = ({ name }: PokemonIconProps) => {
  const [imageLink, setImageLink] = useState<string>();

  useEffect(() => {
    const getImageLinkAsync = async () => {
      try {
        const data = await fetch(
          `https://pokeapi.co/api/v2/pokemon-form/${name?.toLowerCase()}/`
        );

        if (data.status === 200) {
          const pokemonData: PokemonData = await data.json();
          setImageLink(pokemonData.sprites.front_default);
        }
      } catch (e) {
        console.log(e);
      }
    };

    getImageLinkAsync();
  }, [name]);

  if (!imageLink) return;

  return <Image style={styles.tinyLogo} src={imageLink} />;
};

export default PokemonIcon;

const styles = StyleSheet.create({
  tinyLogo: {
    width: 100,
    height: 100,
  },
});
