import { ChangeEvent, FormEvent, useEffect, useState } from "react";

import {
  Box,
  Button,
  Divider,
  Heading,
  HStack,
  SimpleGrid,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";

import { api } from "./api/users";
import { divida } from "./api/divida";
import { uuid } from "./api/uuid";
import Card from "../components/Card";
import CardContent from "../components/CardContent";
import Modal from "../components/Modal";
import { useRouter } from "next/router";
import Header from "../components/Header";

const Home: React.FC = () => {
  const [debts, setDebits] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  useEffect(() => {
    divida.get(`divida/${uuid}`).then((resp) => setDebits(resp.data.result));
  }, []);


  return (
    <VStack w="full" px="1rem">
      <Header onOpen={onOpen} />

      <CardContent>
        <Card
          user="Everton Freitas Xavier da Silva"
          idUsuario={1}
          handleClickCard={() => router.push("/divida")}
        />
      </CardContent>

      <Modal isOpen={isOpen} onClose={onClose} />
    </VStack>
  );
};

export default Home;
