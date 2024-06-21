import {
    FormControl,
    FormErrorMessage,
    FormLabel,
    Switch as SwitchChakra,
    Flex,
  } from "@chakra-ui/react";
  
  export const Switch = ({
    label,
    id,
    errors,
    isRequired,
    messageError,
    isChecked,
    onChange,
    register,
    isDisabled,
    ...props
  }) => (
    <FormControl id={id} isRequired={isRequired} isInvalid={errors[id]}>
      <Flex align="center">
        <FormLabel flex="1">{label}</FormLabel>
        <SwitchChakra
          {...props}
          id={id}
          {...register}
          isChecked={isChecked}
          onChange={onChange}
          isDisabled={isDisabled}
          colorScheme="teal"
          _focusVisible={{
            boxShadow: "0 0 0 2px rgba(24, 115, 204, 0.6)",
          }}
        />
      </Flex>
      <FormErrorMessage>{messageError}</FormErrorMessage>
    </FormControl>
  );
  