import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from "@chakra-ui/react";

interface InputFieldProps {
  name: string;
  onBlur: (e: any) => void;
  onChange: (e: any) => void;
  value: string;
  error?: string;
  touched?: boolean;
  label: string;
  type?: string;
  heigth?: string;
}

function InputField({
  name,
  onBlur,
  onChange,
  value,
  error,
  touched,
  label,
  type,
  heigth,
}: InputFieldProps) {
  const isInValid = (error && touched) as boolean;

  type = type || "text";

  return (
    <FormControl isInvalid={isInValid}>
      <FormLabel>{label}</FormLabel>
      <Input
        type={type}
        name={name}
        value={value}
        onBlur={onBlur}
        onChange={onChange}
        backgroundColor="white"
        color="black"
        height={heigth}
      />
      {isInValid ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
}

export default InputField;
