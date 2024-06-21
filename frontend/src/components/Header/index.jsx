import {
  Box,
  Flex,
  Text,
  Button,
  Stack,
  Link as ChakraLink,
  Popover,
  PopoverTrigger,
  useBreakpointValue,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { useContext } from "react";
import Avatar from "boring-avatars";

export default function Header() {
  const { loggedUser, signOut } = useContext(AppContext);
  return (
    <Box>
      <Flex
        bg={"gray.900"}
        color={"white"}
        minH={"60px"}
        minW={"100vw"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={"teal.900"}
        boring-avatars
        align={"center"}
      >
        <Text
          textAlign={useBreakpointValue({ base: "center", md: "left" })}
          fontFamily={"heading"}
          fontWeight="bold"
          color={"white"}
        >
          My Inventory
        </Text>
        <Flex
          flex={{ base: 1 }}
          justifyContent={"center"}
          justify={{ base: "center", md: "start" }}
        >
          <Flex display={{ base: "none", md: "flex" }} ml={10}>
            <ItemMenu />
          </Flex>
        </Flex>

        {loggedUser ? (
          <Flex alignItems={"center"}>
            <Menu>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                bgColor={"gray.600"}
                minW={0}
              >
                <Avatar size={40} name={loggedUser.firstName} variant="beam" />
              </MenuButton>
              <MenuList bgColor={"gray.600"}>
                <MenuItem bgColor={"gray.600"} as={Text}>
                  Welcome, {loggedUser.firstName}
                </MenuItem>
                <MenuDivider />
                <MenuItem bgColor={"gray.600"} onClick={signOut}>
                  Sign Out
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        ) : (
          <Stack
            flex={{ base: 1, md: 0 }}
            justify={"flex-end"}
            direction={"row"}
            spacing={6}
          >
            <Button
              as={Link}
              fontSize={"sm"}
              fontWeight={400}
              variant={"link"}
              to={"/auth/signin"}
              _hover={{
                color: "white",
              }}
            >
              Sign In
            </Button>
            <Button
              as={Link}
              display={{ base: "none", md: "inline-flex" }}
              fontSize={"sm"}
              fontWeight={600}
              color={"white"}
              bg={"teal.400"}
              to={"/auth/signup"}
              _hover={{
                bg: "teal.300",
                color: "white",
              }}
            >
              Sign Up
            </Button>
          </Stack>
        )}
      </Flex>
    </Box>
  );
}

const ItemMenu = () => {
  const linkColor = "gray.200";
  const linkHoverColor = "white";

  return (
    <Stack direction={"row"} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <ChakraLink
                as={Link}
                p={2}
                to={navItem.href ?? "#"}
                fontSize={"sm"}
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: "none",
                  color: linkHoverColor,
                }}
              >
                {navItem.label}
              </ChakraLink>
            </PopoverTrigger>
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const NAV_ITEMS = [
  {
    label: "Home",
    href: "../",
  },
  {
    label: "Create Product",
    href: "product",
  },
  {
    label: "My Products",
    href: "product/my",
  },
];
