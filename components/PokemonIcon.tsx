import { useEffect, useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import { lightGray } from "./Styles/Colors";
import { ScaledSheet } from "react-native-size-matters";

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

  return (
    <View style={styles.container}>
      <Image style={styles.tinyLogo} src={imageLink} />
    </View>
  );
};

export default PokemonIcon;

const styles = ScaledSheet.create({
  container: {
    marginTop: "8@s",
    borderRadius: "53@s",
    borderWidth: "1.5@s",
    borderColor: lightGray,
    padding: "2.5@s",
    width: "50@s",
    height: "50@s",
    justifyContent: "center",
    alignItems: "center",
  },
  tinyLogo: {
    width: "40@s",
    height: "40@s",
  },
});
