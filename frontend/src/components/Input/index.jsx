import {
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input as InputChacka,
  } from "@chakra-ui/react";
  
  export const Input = ({
    label,
    id,
    errors,
    placeholder,
    isRequired,
    messageError,
    type,
    register,
    disabled,
    ...props
  }) => (
    <FormControl id={id} isRequired={isRequired} isInvalid={errors[id]}>
      <FormLabel>{label}</FormLabel>
      <InputChacka
      {...props}
        disabled={disabled}
        {...register}
        placeholder={placeholder}
        _placeholder={{ color: "gray.500" }}
        type={type}
        colorScheme="dark"
        _focusVisible={{
          borderColor: "teal.400",
          boxShadow: "0 0 0 1px var(--chakra-colors-teal-400)",
        }}
      />
      <FormErrorMessage>{messageError}</FormErrorMessage>
    </FormControl>
  );