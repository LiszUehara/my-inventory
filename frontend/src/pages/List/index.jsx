import {
    Box,
    Heading,
    Text,
    Stack,
    Flex,
    IconButton,
    InputGroup,
    InputRightElement,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableCaption,
    Button,
  } from "@chakra-ui/react";
  import { useContext, useEffect, useState } from "react";
  import { ChevronDownIcon, ChevronUpIcon, EditIcon, Search2Icon } from "@chakra-ui/icons";
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
  
  export default function List() {
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
              placeholder={"Search..."}
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
        <ProductTable products={products} />
        <Button
              as={Link}
              display={{ base: "none", md: "inline-flex" }}
              fontSize={"sm"}
              fontWeight={600}
              color={"white"}
              bg={"teal.400"}
              to={"/product"}
              _hover={{
                bg: "teal.300",
                color: "white",
              }}
            >
              Create More Products
            </Button>
      </Flex>
    );
  }

  const ProductTable = ({ products }) => {
    const [sortedField, setSortedField] = useState("value");
    const [sortOrder, setSortOrder] = useState("asc"); // "asc" or "desc"
  
    const handleSort = (field) => {
      if (sortedField === field) {
        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
      } else {
        setSortedField(field);
        setSortOrder("asc");
      }
    };
  
    const sortedProducts = [...products].sort((a, b) => {
      const aValue = typeof a[sortedField] === "string" ? a[sortedField].toLowerCase() : parseFloat(a[sortedField]);
      const bValue = typeof b[sortedField] === "string" ? b[sortedField].toLowerCase() : parseFloat(b[sortedField]);
  
      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  
    return (
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>
              <Button
                variant="unstyled"
                onClick={() => handleSort("name")}
                leftIcon={
                  sortedField === "name" &&
                  (sortOrder === "asc" ? (
                    <ChevronUpIcon />
                  ) : (
                    <ChevronDownIcon />
                  ))
                }
              >
                Name
              </Button>
            </Th>
            <Th>
              <Button
                variant="unstyled"
                onClick={() => handleSort("value")}
                leftIcon={
                  sortedField === "value" &&
                  (sortOrder === "asc" ? (
                    <ChevronUpIcon />
                  ) : (
                    <ChevronDownIcon />
                  ))
                }
              >
                Value
              </Button>
            </Th>
           
          </Tr>
        </Thead>
        <Tbody>
          {sortedProducts.map((product, index) => (
            <Tr key={index}>
              <Td>{product.name}</Td>
              <Td>R$ {product.value.toFixed(2)}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    );
  };