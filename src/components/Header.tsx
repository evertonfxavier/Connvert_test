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
import { IDebits } from "../pages/[idUsuario]/divida";

interface HeaderProps {
  idUsuario?: any;
  whenThereIsUser: boolean;
  onOpen?: () => void;
  name?: string;
}

const Header: React.FC<HeaderProps> = ({
  onOpen,
  idUsuario,
  whenThereIsUser,
  name,
  ...rest
}) => {
  const router = useRouter();

  return !whenThereIsUser ? (
    <HStack
      w="full"
      h="4rem"
      // px="1rem"
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
        w="165px"
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
    <VStack
      w="full"
      h="4rem"
      mt="1rem"
      borderRadius=".4rem"
      justifyContent="center"
      mb={8}
      {...rest}
    >
      <HStack w="full" alignItems="center" justifyContent="space-between">
        <Box cursor="pointer" onClick={() => router.back()}>
          <Icon as={ArrowBackIcon} mr="4px" />
          <Text as="span">Voltar</Text>
        </Box>
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
      <Box w="full">
        <Heading fontSize="xl" color="gray.800">
          #{idUsuario} - {name}
        </Heading>
      </Box>
    </VStack>
  );
};

export default Header;
