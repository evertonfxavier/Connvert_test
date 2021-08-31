import { HStack, Text, VStack } from "@chakra-ui/react";

export const Header: React.FC = () => {
  return (
    <HStack
      as="header"
      bgColor="white"
      w="full"
      minH="64px"
      px="2rem"
      display={["none", "none", "flex", "flex"]}
    >
      <HStack w="full" justifyContent="flex-end" spacing="1rem">
        <VStack
          spacing={0}
          alignItems="flex-start"
          display={["none", "block", "block", "block"]}
        >
          <Text fontw={6} h={6} fontWeight="700" color="gray.800" m="0">
            Olá!
          </Text>
          <Text fontWeight="500" color="gray.400" m="0">
            Seja bem-vindo(a)! 😄
          </Text>
        </VStack>
      </HStack>
    </HStack>
  );
};

export default Header;
