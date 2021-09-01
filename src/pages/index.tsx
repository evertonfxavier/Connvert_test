import { useEffect, useState } from "react";

import { useDisclosure, VStack, Text } from "@chakra-ui/react";

import { api } from "./api/users";
import { divida } from "./api/divida";
import { uuid } from "./api/uuid";
import Card from "../components/Card";
import CardContent from "../components/CardContent";
import Modal, { UsersResponse } from "../components/Modal";
import { useRouter } from "next/router";
import Header from "../components/Header";
import { IDebits } from "./[idUsuario]/divida";

interface HomeProps {
  debits: Array<IDebits>;
}

const Home: React.FC<HomeProps> = () => {
  const [users, setUsers] = useState<UsersResponse[]>([]);

  const [debits, setDebits] = useState<IDebits[]>([]);

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

  useEffect(() => {
    divida.get(`divida/${uuid}`).then((resp) => {

      //vou precisar usar isso na page divida pra lisar as dividas DAQUELE usuario
      //TODO ainda falta sabe como pegar o ID da rota
      let filtered = resp.data.result.filter((debit: IDebits) => debit.idUsuario === 3);

      // console.log(resp.data.result);
      setDebits(resp.data.result);
      // setDebits(filtered);
    });
  }, []);

  // let usersId = users.map((user) => user.id);
  // console.log("usersId", usersId);

  // let filtered = debits.filter((debit) => debit.idUsuario === 3);
  // console.log("filtered", filtered);

  return (
    <VStack w="full" px="1rem">
      <Header onOpen={onOpen} whenThereIsUser={false} />

      <CardContent>
        {debits.map((item) => (
          <Card
            key={item.idUsuario}
            user="Everton Freitas Xavier da Silva"
            idUsuario={item.idUsuario}
            handleClickCard={() => router.push(`/${item.idUsuario}/divida`)}
          />
        ))}
      </CardContent>

      <Modal isOpen={isOpen} onClose={onClose} />
    </VStack>
  );
};

export default Home;
