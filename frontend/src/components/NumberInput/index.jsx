import {
    FormControl,
    FormErrorMessage,
    FormLabel,
    NumberInput as NumberInputChakra,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
  } from "@chakra-ui/react";
  
  export const NumberInput = ({
    label,
    id,
    errors,
    placeholder,
    isRequired,
    messageError,
    onChange,
    register,
    min,
    max,
    step,
    value,
    ...props
  }) => (
    <FormControl id={id} isRequired={isRequired} isInvalid={errors[id]}>
      <FormLabel>{label}</FormLabel>
      <NumberInputChakra
        {...props}
        id={id}
        value={value}
        {...register}
        onChange={onChange}
        min={min}
        max={max}
        step={step}
        allowMouseWheel
        focusInputOnChange={false}
      >
        <NumberInputField
          placeholder={placeholder}
          _placeholder={{ color: "gray.500" }}
        />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInputChakra>
      <FormErrorMessage>{messageError}</FormErrorMessage>
    </FormControl>
  );
  