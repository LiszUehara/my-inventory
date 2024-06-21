import {
  Box,
  Heading,
  Text,
  Stack,
  Flex,
  IconButton,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { EditIcon, Search2Icon } from "@chakra-ui/icons";
import { Link, useNavigate } from "react-router-dom";
import fetcher from "../../services/api";
import { AppContext } from "../../context/AppContext";
import { Input } from "../../components/Input";
import { useForm } from "react-hook-form";

const formatter = new Intl.DateTimeFormat("pt-br", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

export default function Home() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const { loggedUser } = useContext(AppContext);
  const { formState, register, watch } = useForm({
    defaultValues: {
      search: "",
    },
  });
  const search = watch('search')
  function searchOn(){
    fetcher("/api/product").then((data) => setProducts([]));
  }
  useEffect(() => {
    fetcher("/api/product").then((data) => setProducts(data.items));
  }, []);
  useEffect(() => {
    if (!loggedUser) {
      navigate("auth/signin");
    }
  }, [loggedUser]);
  useEffect(() => {
    fetcher(`/api/product?filter=${search}`).then((data) => setProducts(data.items));
  }, [search]);
  return (
    <Flex py={6} px={4} flexWrap={"wrap"} gap={2} justifyContent={"center"}>
      <Stack
        spacing={4}
        direction={{ base: "column", md: "row" }}
        display="flex"
        justifyContent="end"
        w={"full"}
        marginBottom={2}
      >
        <InputGroup width="20rem" display='flex'>
          <Input
            register={register("search")}
            label=""
            errors={formState.errors}
            id="search"
            placeholder={"Pesquisar..."}
            color={"gray.200"}
            bg={"gray.600"}
            rounded={"md"}
            border={0}
            _focus={{
              bg: "gray.800",
              outline: "none",
            }}
            onChange={()=>searchOn()}
          />
          <InputRightElement>
            <Search2Icon />
          </InputRightElement>
        </InputGroup>
      </Stack>
      {products.map((product) => (
        <Box
          key={product.id}
          maxW={"445px"}
          height={"230px"}
          w={"full"}
          bg={"gray.700"}
          boxShadow={"2xl"}
          rounded={"md"}
          p={6}
          overflow={"hidden"}
          justifyContent={"space-between"}
          display={"flex"}
          flexDirection={"column"}
        >
          <Stack>
            <Heading
              color={"teal.200"}
              fontSize={"2xl"}
              fontFamily={"body"}
              display={"flex"}
              justifyContent={"space-between"}
            >
              {product.name}
              <IconButton
                as={Link}
                variant="link"
                colorScheme="teal"
                size="xl"
                padding={1}
                icon={<EditIcon />}
                _hover={{ color: "teal" }}
                to={`product/edit?id=${product.id}`}
              />
            </Heading>
            {product.description ? (
              <Text color={"white"} textOverflow={"ellipsis"} noOfLines={4}>
                {product.description}
              </Text>
            ) : (
              <Text color={"gray.600"} as="i">
                No Description
              </Text>
            )}
            <Text color={"teal"} textOverflow={"ellipsis"} noOfLines={4}>
                R${product.value.toFixed(2)}
              </Text>
              <Text color={"gray.600"} as="i" textOverflow={"ellipsis"} noOfLines={4}>
                {product.available ? "is Avaliable" : "Is not Available"}
              </Text>
          </Stack>
          <Stack mt={6} direction={"row"} spacing={4} align={"center"}>
            <Stack direction={"column"} spacing={0} fontSize={"sm"}>
              <Text color={"gray.500"}>
                Created at {formatter.format(new Date(product.createDate))}
              </Text>
            </Stack>
          </Stack>
        </Box>
      ))}
    </Flex>
  );
}