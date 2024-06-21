import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useEffect } from "react";
import { Input } from "../../components/Input";
import { useNavigate, useSearchParams } from "react-router-dom";
import fetcher from "../../services/api";
import { AppContext } from "../../context/AppContext";
import { NumberInput } from "../../components/NumberInput";
import { Switch } from "../../components/Switch";

const productSchema = z.object({
  description: z.string().nullable(),
  value: z.string(),
  available: z.boolean()
});


export default function Edit() {
  const { formState, handleSubmit, register, setValue  } = useForm({
    mode: "onBlur",
    resolver: zodResolver(productSchema),
  });
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const { loggedUser } = useContext(AppContext);
  const onSubmit = (values) => {
   fetcher.put('/api/product/${id}',{...values,value: parseFloat(values.value)});
   // navigate("../");
  };
  
  useEffect(() => {
    fetcher(`/api/product/${id}`).then((data) => {
      setValue("name", data.name);
      setValue("description", data.description);
      setValue("value", data.value);
      setValue("available", data.available == 1 ? true : false);
    });
  }, [id]);

  useEffect(() => {
    if (!loggedUser) {
      navigate('../auth/signin')
    }
  }, [loggedUser]);
  
  return (
    <Flex minH={"80vh"} align={"center"} justify={"center"} bg={"gray.800"}>
      <Stack
        spacing={5}
        w={"full"}
        maxW={"lg"}
        bg={"gray.700"}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        my={12}
      >
        <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
          Edição de Produto
        </Heading>
        <Input
          messageError={formState.errors.name?.message}
          register={register("name")}
          label="Name"
          id="name"
          errors={formState.errors}
          placeholder="Enter the product name"
          isRequired={false}
          disabled
          type="text"
        />
        <FormControl
          id="description"
          isInvalid={!!formState.errors.description}
        >
          <FormLabel>Description</FormLabel>
          <Textarea
            {...register("description")}
            _placeholder={{ color: "gray.500" }}
            multiple
            _focusVisible={{
              borderColor: "teal.400",
              boxShadow: "0 0 0 1px var(--chakra-colors-teal-400)",
            }}
          />
          <FormErrorMessage>
            {formState.errors.description?.message}
          </FormErrorMessage>
        </FormControl>
        <NumberInput
          messageError={formState.errors.value?.message}
          register={register("value")}
          label="Value"
          id="value"
          errors={formState.errors}
          placeholder="Enter the product value"
          isRequired
          min={0}
          precision={2}
        />
        <Switch
          messageError={formState.errors.available?.message}
          register={register("available")}
          label="is Available ?"
          id="available"
          errors={formState.errors}
          isRequired={true}
        />


        <Stack spacing={6} direction={["column", "row"]}>
         
          <Button
            bg={"teal.400"}
            color={"white"}
            w="full"
            _hover={{
              bg: "teal.500",
            }}
            onClick={handleSubmit(onSubmit)}
            isLoading={formState.isSubmitting}
            isDisabled={!formState.isValid}
          >
            Submit
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
}