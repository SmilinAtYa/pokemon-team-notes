import { Text, View, TextInput, Alert, TouchableOpacity } from "react-native";
import { useForm, Controller, FormProvider } from "react-hook-form";
import { Team } from "@/app";
import HookFormInput from "./HookFormInput";
import { H4, P1 } from "./Typography/Typography";
import { scale } from "react-native-size-matters";
import { midLightBlue, lightestBlue, white } from "./Styles/Colors";
import Button from "./Button/Button";
import PokemonSelection from "./PokemonSelection";
import { useEffect, useState } from "react";
import { SpeciesData } from "@/data/global-types";
import PokemonIcon from "./PokemonIcon";
import { useMMKVStorage } from "react-native-mmkv-storage";
import { storage } from "@/app/_layout";

export interface TeamFormDefaultValues {
  name: string;
  [pokemonName: `pokemonName${string}`]: string;
  [heldItem: `heldItem${string}`]: string;
}

const CreateTeamForm = () => {
  const [teams, setTeams] = useMMKVStorage<Team[]>("teams", storage, []);
  const [selectedPokemon, setSelectedPokemon] = useState<SpeciesData>();
  const [showAddedMsg, setShowAddedMsg] = useState(false);
  const [selectedPokemonSlot, setSelectedPokemonSlot] = useState<string>();
  const methods = useForm<TeamFormDefaultValues>({
    defaultValues: {
      name: "",
    },
  });

  const saveTeam = (team: TeamFormDefaultValues) => {
    const newTeam: Team = {
      name: team.name,
      slots: [
        { pokemonName: team["pokemonName0"], heldItem: team["heldItem0"] },
        { pokemonName: team["pokemonName1"], heldItem: team["heldItem1"] },
        { pokemonName: team["pokemonName2"], heldItem: team["heldItem2"] },
        { pokemonName: team["pokemonName3"], heldItem: team["heldItem3"] },
        { pokemonName: team["pokemonName4"], heldItem: team["heldItem4"] },
        { pokemonName: team["pokemonName5"], heldItem: team["heldItem5"] },
      ],
    };
    setTeams([...teams, newTeam]);
  };

  useEffect(() => {
    if (selectedPokemon) {
      setShowAddedMsg(true);
      setSelectedPokemonSlot(undefined);
    }
  }, [selectedPokemon]);

  const {
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = methods;

  return (
    <FormProvider {...methods}>
      <View style={{ flex: 1, justifyContent: "space-between" }}>
        <View style={{ flex: 1 }}>
          <HookFormInput placeholder="Team Name" name="name" />
          {errors.name && <Text>This is required.</Text>}
          <H4
            color="gray"
            style={{ fontSize: scale(14) }}
            text="Add Your Team Members"
          />

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: scale(10),
            }}
          >
            {Array.from<Team>({ length: 6 }).map((_team, index) => {
              return (
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  key={index}
                >
                  <TouchableOpacity
                    style={{
                      height: scale(48),
                      width: scale(48),
                      borderWidth: scale(0.5),
                      borderColor: lightestBlue,
                      borderRadius: scale(8),
                      borderStyle: "dashed",
                      backgroundColor: midLightBlue,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    onPress={() => setSelectedPokemonSlot(index.toString())}
                  >
                    {getValues()[`pokemonName${index}`] ? (
                      <View style={{ paddingBottom: scale(7) }}>
                        <PokemonIcon
                          name={getValues()[`pokemonName${index}`]}
                          small
                        />
                      </View>
                    ) : (
                      <View
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                          width: scale(25),
                          height: scale(25),
                          borderRadius: scale(37),
                          backgroundColor: white,
                        }}
                      >
                        <P1 color="midGray" text="+" />
                      </View>
                    )}
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
          {showAddedMsg && (
            <H4
              color="gray"
              style={{ fontSize: scale(14), marginTop: scale(10) }}
              text={`Welcome to the team ${selectedPokemon?.name}!`}
            />
          )}
          {selectedPokemonSlot && (
            <PokemonSelection
              slot={selectedPokemonSlot}
              onSelectPokemon={(poke) => {
                setSelectedPokemon(poke);
                if (poke?.name) {
                  setValue(`pokemonName${selectedPokemonSlot}`, poke?.name);
                }
              }}
            />
          )}
        </View>

        <Button
          color="blue"
          textColor="white"
          text="Save Team"
          onPress={handleSubmit(saveTeam)}
        />
      </View>
    </FormProvider>
  );
};

export default CreateTeamForm;
