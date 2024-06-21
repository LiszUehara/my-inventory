import {
  Box,
  FormControl,
  FormLabel,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  Input as InputChackra,
  Link as ChakraLink,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import fetcher from "../../services/api";
import { Input } from "../../components/Input";

const signUpSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(3).max(20),
  lastName: z.string().min(3).max(20),
  password: z.string().min(4),
});

const SignUp = () => {
  const context = useOutletContext();
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState } = useForm({
    resolver: zodResolver(signUpSchema),
    mode: "onBlur",
  });

  const navigate = useNavigate();
  const toast = useToast();

  const onSignUp = async (form) => {
    try {
      await fetcher.post("/api/user", form);

      toast({
        status: "success",
        title: "Success!",
        description: "Account created",
      });

      context.setEmailAddress(form.email);

      navigate("/auth/signin", { replace: true });
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
        <Heading fontSize={"4xl"} textAlign={"center"}>
          Sign up
        </Heading>
        <Text fontSize={"lg"} color={"gray.600"}>
          to enjoy all of our cool features ✌️
        </Text>
      </Stack>
      <Box rounded={"lg"} bg={"gray.700"} boxShadow={"lg"} p={8}>
        <Stack as="form" onSubmit={handleSubmit(onSignUp)} spacing={4}>
          <HStack>
            <Box>
              <Input
                errors={!!formState.errors.firstName}
                id="firstName"
                label={"First Name"}
                register={register("firstName")}
                messageError={formState.errors.firstName?.message}
              />
            </Box>

            <Box>
            <Input
                errors={!!formState.errors.lastName}
                id="lastName"
                label={"Last Name"}
                register={register("lastName")}
                messageError={formState.errors.lastName?.message}
              />
            </Box>
          </HStack>

          <Input
            errors={!!formState.errors.email}
            id="email"
            label={"Email address"}
            type="email"
            register={register("email")}
            messageError={formState.errors.email?.message}
          />

          <FormControl id="password" isInvalid={!!formState.errors.password}>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <InputChackra
                type={showPassword ? "text" : "password"}
                {...register("password")}
              />
              <InputRightElement h={"full"}>
                <Button
                  variant={"ghost"}
                  onClick={() =>
                    setShowPassword((showPassword) => !showPassword)
                  }
                >
                  {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage>
              {formState.errors.password?.message}
            </FormErrorMessage>
          </FormControl>

          <Stack spacing={10} pt={2}>
            <Button
              isLoading={formState.isSubmitting}
              isDisabled={!formState.isValid}
              type="submit"
              loadingText="Submitting"
              size="lg"
              bg={"teal.400"}
              color={"white"}
              _hover={{
                bg: "teal.500",
              }}
            >
              Sign up
            </Button>
          </Stack>

          <Stack pt={6}>
            <Text align={"center"}>
              Already a user?{" "}
              <ChakraLink as={Link} to="/auth/signin" color={"teal.400"}>
                Login
              </ChakraLink>
            </Text>
          </Stack>
        </Stack>
      </Box>
    </>
  );
};

export default SignUp;
