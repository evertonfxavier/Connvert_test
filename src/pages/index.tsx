import { ChangeEvent, FormEvent, useEffect, useState } from "react";

import {
  Box,
  Button,
  Divider,
  Heading,
  HStack,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";

import { api } from "./api/users";
import { divida } from "./api/divida";
import { uuid } from "./api/uuid";
import Card from "../components/Card";

interface UsersResponse {
  id: number;
  name: string;
}

const Home: React.FC = () => {
  const [users, setUsers] = useState<UsersResponse[]>([]);
  const [selectedUser, setSelectedUser] = useState("0");

  const [formData, setFormData] = useState({
    idUsuario: "",
    motivo: "",
    valor: "",
  });

  useEffect(() => {
    api.get("users").then((resp) => {
      const getUser = resp.data.map((user: UsersResponse) => ({
        id: user.id,
        name: user.name,
      }));
      setUsers(getUser);
    });
  }, []);

  useEffect(() => {
    divida
      .get(`divida/${uuid}`)
      .then((resp) => console.log("divida", resp.data.result));
  }, []);

  function handleSelectUser(event: ChangeEvent<HTMLSelectElement>) {
    const user = event.target.value;
    setSelectedUser(user);
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setFormData({ ...formData, [name]: value });
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const { idUsuario, motivo, valor } = formData;
    const user = selectedUser;

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
        border="1px solid"
        borderColor="gray.200"
        borderRadius=".4rem"
        justifyContent="space-between"
      >
        <Heading as="h1" fontSize="sm">
          Lista de Devedores
        </Heading>

        <Button
          bgColor="blue.400"
          color="white"
          _hover={{
            opacity: "0.8",
          }}
        >
          + Criar usuário
        </Button>
      </HStack>

      <HStack w="full" flexWrap="wrap">
        <Card
          user="Everton Freitas Xavier da Silva"
          createdAt="30/08/2021"
          handleClickCard={() => ""}
        />
      </HStack>
    </VStack>
  );
};

export default Home;
