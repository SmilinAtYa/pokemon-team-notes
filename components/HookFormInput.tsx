import { Controller, useFormContext } from "react-hook-form";
import { TextInput } from "react-native";

interface HookFormInputProps {
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
            placeholder={placeholder}
            onBlur={onBlur}
            onChangeText={(text) => {
              // call onChane to trogger render update on input
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
