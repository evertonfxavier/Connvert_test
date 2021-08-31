import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import {
  Box,
  Heading,
  HStack,
  Icon,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";

import { divida } from "./api/divida";
import { uuid } from "./api/uuid";
import CardContent from "../components/CardContent";
import Table from "../components/Table";
import { useRouter } from "next/router";
import { ArrowBackIcon } from "@chakra-ui/icons";

const Home: React.FC = () => {
  const router = useRouter();

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    divida
      .get(`divida/${uuid}`)
      .then((resp) => console.log("divida", resp.data.result));
  }, []);

  return (
    <VStack w="full" px="1rem">
      <HStack
        w="full"
        h="4rem"
        // px="1rem"
        mt="1rem"
        borderRadius=".4rem"
        justifyContent="space-between"
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

        {/* <Button
          bgColor="blue.400"
          color="white"
          _hover={{
            opacity: "0.8",
          }}
          onClick={onOpen}
        >
          + Criar dívida
        </Button> */}
      </HStack>

      <CardContent>
        <Table />
      </CardContent>

      {/* <Modal isOpen={isOpen} onClose={onClose} /> */}
    </VStack>
  );
};

export default Home;
