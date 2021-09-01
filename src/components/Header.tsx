import { useRouter } from "next/router";
import {
  Box,
  Button,
  Heading,
  HStack,
  Icon,
  Text,
  VStack,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";

interface HeaderProps {
  whenThereIsUser: boolean;
  onOpen?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  onOpen,
  whenThereIsUser,
  ...rest
}) => {
  const router = useRouter();

  return !whenThereIsUser ? (
    <HStack
      w="full"
      h="4rem"
      px="1rem"
      mt="1rem"
      borderRadius=".4rem"
      justifyContent="space-between"
      {...rest}
    >
      <VStack spacing={0} alignItems="flex-start">
        <Text fontw={6} h={6} fontWeight="700" color="gray.800" m="0">
          Olá!
        </Text>
        <Text fontWeight="500" color="gray.400" m="0">
          Seja bem-vindo(a)! 😄
        </Text>
      </VStack>

      <Button
        bgColor="blue.400"
        color="white"
        _hover={{
          opacity: "0.8",
        }}
        onClick={onOpen}
      >
        + Criar dívida
      </Button>
    </HStack>
  ) : (
    <HStack
      w="full"
      h="4rem"
      mt="1rem"
      borderRadius=".4rem"
      justifyContent="space-between"
      {...rest}
    >
      <Box>
        <Box mb={2} cursor="pointer" onClick={() => router.back()}>
          <Icon as={ArrowBackIcon} />
          <Text as="span">voltar</Text>
        </Box>
        <Heading fontSize="xl" color="gray.800">
          Everton Freitas Xavier da Silva
        </Heading>
      </Box>

      <HStack>
        <Button
          bgColor="blue.400"
          color="white"
          _hover={{
            opacity: "0.8",
          }}
          onClick={onOpen}
        >
          + Criar dívida
        </Button>
      </HStack>
    </HStack>
  );
};

export default Header;
