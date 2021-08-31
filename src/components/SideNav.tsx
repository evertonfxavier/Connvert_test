import Link from "next/link";
import { useRouter } from "next/router";
import {
  Text,
  Heading,
  List,
  ListIcon,
  ListItem,
  Link as ChakraLink,
  HStack,
  Icon,
  Stack,
  useMediaQuery,
  Box,
} from "@chakra-ui/react";
import { HiUser, HiLogout } from "react-icons/hi";

const menuItems = [
  {
    name: "users",
    label: "Usuários",
    path: "/",
    icon: HiUser,
  },
];

export const SideNav: React.FC = () => {
  const [isLargerThan1280] = useMediaQuery("(min-width: 1280px)");

  const router = useRouter();

  const checkIfIsActive = (value: string) => {
    if (value === "/") return value === router.pathname;
    else return value === router.pathname || router.pathname.includes(value);
  };

  return (
    <Stack
      as="nav"
      minW={["full", "full", "18vw", "18vw"]}
      h={["4rem", "4rem", "full", "full"]}
      direction={["row", "row", "column", "column"]}
      bgColor="blue.400"
      py={[0, "1.3rem"]}
      px={["1rem", "1rem"]}
      alignItems="center"
      justifyContent="space-between"
    >
      <Heading color="white" size="sm" mr="auto" display="block">
        LOGO
      </Heading>

      <List
        w="full"
        fontWeight="600"
        display="flex"
        spacing={["0", "0", "1rem", "1rem"]}
        flexDirection={["row", "row", "column", "column"]}
      >
        {menuItems.map((item) => (
          <ListItem as={Link} w="full" href={item.path} key={item.name}>
            <ChakraLink
              h="3rem"
              display="flex"
              alignItems="center"
              px={["1rem", "0.5rem"]}
              borderRadius="md"
              bgColor={checkIfIsActive(item.path) ? "blue.600" : "transparent"}
              color={checkIfIsActive(item.path) ? "white" : "blue.50"}
            >
              <ListIcon
                as={item.icon}
                w={6}
                h={6}
                marginInlineEnd={isLargerThan1280 ? "0.5" : "0"}
              />

              <Text
                pl="0.5rem"
                mt="2px"
                fontSize="lg"
                display={["none", "none", "none", "block"]}
              >
                {item.label}
              </Text>
            </ChakraLink>
          </ListItem>
        ))}
      </List>

      <HStack
        w={["auto", "auto", "full", "full"]}
        color="white"
        cursor="pointer"
      >
        <Icon as={HiLogout} w={6} h={6} />
        <Text display={["none", "none", "none", "block"]}>Sair</Text>
      </HStack>
    </Stack>
  );
};

export default SideNav;
