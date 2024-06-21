import {
  Box,
  Checkbox,
  Stack,
  Link as ChakraLink,
  Button,
  Heading,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import fetcher from "../../services/api";
import { Input } from "../../components/Input";

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4),
});

const SignIn = () => {
  const navigate = useNavigate();
  const context = useOutletContext();
  const toast = useToast();

  const { formState, handleSubmit, register } = useForm({
    defaultValues: {
      email: context.emailAddress,
    },
    mode: "onBlur",
    resolver: zodResolver(signInSchema),
  });

  const onSignIn = async (form) => {
    try {
      const response = await fetcher.post("/api/auth", form);

      toast({
        status: "success",
        title: "Success!",
        description: "Logged in",
      });

      context.signIn(response.token);

      navigate("/", { replace: true });
    } catch (error) {
      toast({
        status: "error",
        title: "Something went wrong...",
        description: error.cause || error.message,
      });
    }
  };

  return (
    <>
      <Stack align={"center"}>
        <Heading fontSize={"4xl"}>Sign in to your account</Heading>
        <Text fontSize={"lg"} color={"gray.600"}>
          to enjoy all of our cool{" "}
          <ChakraLink color={"blue.400"}>features</ChakraLink> ✌️
        </Text>
      </Stack>

      <Box rounded={"lg"} bg={"gray.700"} boxShadow={"lg"} p={8}>
        <Stack spacing={4} as="form" onSubmit={handleSubmit(onSignIn)}>
          <Input
            errors={!!formState.errors.email}
            id="email"
            label={"Email address"}
            type="email"
            register={register("email")}
            messageError={formState.errors.email?.message}
          />

          <Input
            errors={!!formState.errors.password}
            id="password"
            label={"Password"}
            type="password"
            register={register("password")}
            messageError={formState.errors.password?.message}
          />

          <Stack spacing={10}>
            <Stack
              direction={{ base: "column", sm: "row" }}
              align={"start"}
              justify={"space-between"}
            >
              <Checkbox>Remember me</Checkbox>
              <ChakraLink color={"teal.400"}>Forgot password?</ChakraLink>
            </Stack>
            <Button
              isLoading={formState.isSubmitting}
              isDisabled={!formState.isValid}
              type="submit"
              bg={"teal.400"}
              color={"white"}
              _hover={{
                bg: "teal.500",
              }}
            >
              Sign in
            </Button>

            <ChakraLink as={Link} to="/auth/signup" color={"teal.400"}>
              Create an account
            </ChakraLink>
          </Stack>
        </Stack>
      </Box>
    </>
  );
};

export default SignIn;
