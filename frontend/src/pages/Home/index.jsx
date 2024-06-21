import {
  Flex,
  Heading,
  Stack,
} from "@chakra-ui/react";

export default function Home() {
 
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
          Home
        </Heading>
       
      </Stack>
    </Flex>
  );
}
