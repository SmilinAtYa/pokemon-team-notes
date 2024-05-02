import { Text, View, TextInput, Button, Alert } from "react-native";
import { useForm, Controller, FormProvider } from "react-hook-form";
import { Team } from "@/app";
import HookFormInput from "./HookFormInput";

interface CreateTeamFormProps {
  saveTeam: (team: TeamFormDefaultValues) => void;
}

export interface TeamFormDefaultValues {
  name: string;
  [pokemonName: `pokemonName${string}`]: string;
  [heldItem: `heldItem${string}`]: string;
}

const CreateTeamForm = ({ saveTeam }: CreateTeamFormProps) => {
  const methods = useForm<TeamFormDefaultValues>({
    defaultValues: {
      name: "",
    },
  });

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  return (
    <FormProvider {...methods}>
      <View>
        <HookFormInput placeholder="Team Name" name="name" />
        {errors.name && <Text>This is required.</Text>}
        <View>
          {Array.from<Team>({ length: 6 }).map((_team, index) => {
            return (
              <View key={index}>
                <HookFormInput
                  placeholder="Pokemon name"
                  name={`pokemonName${index}`}
                />
                <HookFormInput
                  placeholder="Held Item"
                  name={`heldItem${index}`}
                />
              </View>
            );
          })}
        </View>

        <Button title="Submit" onPress={handleSubmit(saveTeam)} />
      </View>
    </FormProvider>
  );
};

export default CreateTeamForm;
