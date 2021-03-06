import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Heading,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  useDisclosure,
  useMediaQuery,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";

import Header from "../components/Header";
import Container from "../components/Container";
import Card from "../components/Card";
import TableUsers from "../components/TableUsers";
import SwitchViewButtons from "../components/SwitchViewButtons";
import Loading from "../components/Loading";
import Modal from "../components/Modal";

import { api } from "./api/users";
import { divida } from "./api/divida";

import { IUser } from "../types/User";
import { IDebts, OmitDebtId } from "../types/Debts";

export type ViewsType = "card" | "list";

const Home: React.FC = () => {
  const router = useRouter();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [viewMode, setViewMode] = useState<ViewsType>("list");
  const [isLargerThan1900] = useMediaQuery("(min-width: 900px)");

  const [search, setSearch] = useState("");
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(false);

  const loadUsersWithDebts = async () => {
    setLoading(true);
    const debts = await divida.get("divida");
    const users = await api.get("users");

    const usersWithDebtsId = debts.data.map((item: IDebts) =>
      Number(item.idUsuario)
    );

    const results = users.data.filter((user: any) =>
      usersWithDebtsId.includes(Number(user.id))
    );

    setUsers(results);
    setLoading(false);
  };

  useEffect(() => {
    loadUsersWithDebts();
  }, []);

  const handleSubmit = async (data: IDebts) => {
    const formattedData = {
      id: data.id,
      idUsuario: data.idUsuario,
      valor: data.valor,
      motivo: data.motivo,
      criado: new Date(),
    };

    await divida.post("divida", formattedData).then(() => {
      toast({
        position: "top-right",
        title: "D??vida criada com sucesso.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    });

    loadUsersWithDebts();
  };

  const lowerSearch = search.toLocaleLowerCase();

  const filteredUsers = users.filter((user) =>
    user.name.toLocaleLowerCase().includes(lowerSearch)
  );

  return (
    <VStack w="full" px="1rem">
      <Header onOpen={onOpen} />

      <HStack w="full" justifyContent="space-between" pb="8px">
        <InputGroup w="xs">
          <InputLeftElement
            pointerEvents="none"
            // eslint-disable-next-line react/no-children-prop
            children={<Search2Icon color="gray.300" />}
          />
          <Input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por nome"
          />
        </InputGroup>
        <SwitchViewButtons value={viewMode} onChange={setViewMode} />
      </HStack>

      {viewMode == "card" || !isLargerThan1900 ? (
        <Container handleShowCards>
          {filteredUsers.length ? (
            filteredUsers.map((user) => (
              <Card
                key={user.id}
                user={user}
                handleClickToGoDebt={() => router.push(`/${user.id}/divida`)}
              />
            ))
          ) : (
            <VStack
              w="full"
              h={["calc(100vh - 16rem)"]}
              justifyContent="center"
              textAlign="center"
            >
              <Heading size="md">Ops! Nenhum usu??rio encontrado</Heading>
            </VStack>
          )}
        </Container>
      ) : loading ? (
        <Loading />
      ) : (
        <>
          {filteredUsers.length ? (
            <Container handleListUsers>
              {filteredUsers.map((user) => (
                <TableUsers
                  key={user.id}
                  user={user}
                  handleClickToGoDebt={() => router.push(`/${user.id}/divida`)}
                />
              ))}
            </Container>
          ) : (
            <VStack
              w="full"
              h={["calc(100vh - 16rem)"]}
              justifyContent="center"
            >
              <Heading size="md">Ops! Nenhum usu??rio encontrado</Heading>
            </VStack>
          )}
        </>
      )}

      <Modal isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} />
    </VStack>
  );
};

export default Home;
