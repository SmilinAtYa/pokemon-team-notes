import { Controller, useFormContext } from "react-hook-form";
import { TextInput, TextInputProps } from "react-native";
import { ScaledSheet, scale } from "react-native-size-matters";
import { offWhite } from "./Styles/Colors";

interface HookFormInputProps extends TextInputProps {
  placeholder: string;
  name: string;
  onChangeText?: (text: string) => void;
}

const HookFormInput = ({
  placeholder,
  name,
  onChangeText,
}: HookFormInputProps) => {
  const { control, register } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const { onBlur, onChange, value } = field;
        return (
          <TextInput
            {...register(name)}
            style={styles.container}
            placeholder={placeholder}
            onBlur={onBlur}
            onChangeText={(text) => {
              // call onChane to trigger render update on input
              onChange(text);
              onChangeText?.(text);
            }}
            autoCapitalize="none"
            returnKeyLabel="next"
            value={value}
          />
        );
      }}
    />
  );
};

export default HookFormInput;

const styles = ScaledSheet.create({
  container: {
    borderWidth: scale(1),
    borderRadius: scale(6),
    paddingVertical: scale(12),
    paddingHorizontal: scale(10),
    marginVertical: scale(10),
    borderColor: offWhite,
  },
});
