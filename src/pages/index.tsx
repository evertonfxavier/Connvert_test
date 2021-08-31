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

const Home: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [formData, setFormData] = useState({
    idUsuario: "",
    motivo: "",
    valor: "",
  });

  useEffect(() => {
    divida
      .get(`divida/${uuid}`)
      .then((resp) => console.log("divida", resp.data.result));
  }, []);

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setFormData({ ...formData, [name]: value });
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const { idUsuario, motivo, valor } = formData;
    // const user = selectedUser;

    const data = {
      //TODO por enquanto pegando apenas id estatico
      idUsuario: 3,
      motivo,
      valor,
    };

    await divida.post(`divida/${uuid}`, data);
    console.log("data", data);
  }

  return (
    <VStack w="full" px="1rem">
      {/* <form onSubmit={handleSubmit}>
        <Select name="user" value={selectedUser} onChange={handleSelectUser}>
          <option value="0">Selecione um usuário</option>
          {users.map((user) => (
            <option key={user.id} value={user.name}>
              {user.name}
            </option>
          ))}
        </Select>

        <Box>
          <label htmlFor="valor">Valor</label>
          <Input type="number" name="valor" onChange={handleInputChange} />
        </Box>
        <Box>
          <label htmlFor="motivo">Motivo</label>
          <Input type="text" name="motivo" onChange={handleInputChange} />
        </Box>

        <Button type="submit">salvar</Button>
      </form> */}

      <HStack
        w="full"
        h="4rem"
        px="1rem"
        mt="1rem"
        borderRadius=".4rem"
        justifyContent="space-between"
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

      <CardContent>
        <Card
          user="Everton Freitas Xavier da Silva"
          createdAt="30/08/2021"
          handleClickCard={() => ""}
        />
      </CardContent>

      <Modal isOpen={isOpen} onClose={onClose} />
    </VStack>
  );
};

export default Home;
