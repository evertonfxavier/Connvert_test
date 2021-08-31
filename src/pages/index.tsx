import { useEffect, useState } from "react";

import { useDisclosure, VStack } from "@chakra-ui/react";

import { api } from "./api/users";
import { divida } from "./api/divida";
import { uuid } from "./api/uuid";
import Card from "../components/Card";
import CardContent from "../components/CardContent";
import Modal, { UsersResponse } from "../components/Modal";
import { useRouter } from "next/router";
import Header from "../components/Header";

const Home: React.FC = () => {
  const [debits, setDebits] = useState();
  const [users, setUsers] = useState<UsersResponse[]>([]);
  const [selectedUser, setSelectedUser] = useState("0");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  useEffect(() => {
    api.get("users").then((resp) => {
      const getUser = resp.data.map((user: UsersResponse) => ({
        id: user.id,
        name: user.name,
      }));
      setUsers(getUser);
    });
  }, []);
  console.log(users.map((u) => u.name));
  
  useEffect(() => {
    divida.get(`divida/${uuid}`).then((resp) => setDebits(resp.data.result));
  }, []);

  return (
    <VStack w="full" px="1rem">
      <Header onOpen={onOpen} whenThereIsUser={false} />

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
