import {
  Box,
  Flex,
  Text,
  Button,
  Stack,
  Link,
  Popover,
  PopoverTrigger,
  useBreakpointValue,
} from "@chakra-ui/react";

export default function Header() {
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
        align={"center"}
      >


        My Inventory
        <Flex flex={{ base: 1 }} justifyContent={'center'} justify={{ base: "center", md: "start" }}>
          <Text
            textAlign={useBreakpointValue({ base: "center", md: "left" })}
            fontFamily={"heading"}
            color={"white"}
          >
            
          </Text>

          <Flex display={{ base: "none", md: "flex" }} ml={10}>
            <ItemMenu />
          </Flex>
        </Flex>

       
      </Flex>
    </Box>
  );
}

const ItemMenu = () => {
  const linkColor = "gray.200";
  const linkHoverColor = "white";

  return (
    <Stack direction={"row"} spacing={4} justifyContent={"space-between"}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <Link
                p={2}
                href={navItem.href ?? "#"}
                fontSize={"sm"}
                
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: "none",
                  color: linkHoverColor,
                }}
              >
                {navItem.label}
              </Link>
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
  
];
