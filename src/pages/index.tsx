import { useEffect, useState } from "react";
import {
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  useDisclosure,
  useMediaQuery,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

import Header from "../components/Header";
import Modal, { SubmitProps, UsersResponse } from "../components/Modal";

import Card from "../components/Card";
import CardContent from "../components/CardContent";
import TableContent from "../components/TableContent";
import TableUsers from "../components/TableUsers";

import { IDebits, IDebitsInput } from "./[idUsuario]/divida";

import { api } from "./api/users";
import { divida } from "./api/divida";
import { uuid } from "./api/uuid";
import SwitchViewButtons from "../components/SwitchViewButtons";
import { Search2Icon } from "@chakra-ui/icons";

interface HomeProps {
  debits: Array<IDebits>;
}

export type ViewsType = "card" | "list";

const Home: React.FC<HomeProps> = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [viewMode, setViewMode] = useState<ViewsType>("list");
  const [isLargerThan1900] = useMediaQuery("(min-width: 900px)");

  const [editingDebit, setEditingDebit] = useState<IDebitsInput | undefined>(
    {} as IDebitsInput
  );
  const [debits, setDebits] = useState<IDebits[]>([]);
  const router = useRouter();

  const [users, setUsers] = useState<UsersResponse[]>([]);

  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");

  const loadUsersWithDebts = async () => {
    setLoading(true);
    const debts = await divida.get(`divida/${uuid}`);
    const users = await api.get("users");

    const usersWithDebtsId = debts.data.result.map(
      (item: any) => item.idUsuario
    );

    const results = users.data.filter((user: any) =>
      usersWithDebtsId.includes(user.id)
    );
    // console.log(results)
    setUsers(results);
    setLoading(false);
  };

  useEffect(() => {
    loadUsersWithDebts();
  }, []);

  const handleSubmit = async (data: SubmitProps) => {
    if (editingDebit && editingDebit._id) {
      await divida.put(`divida/${editingDebit._id}/${uuid}`, data);
    } else {
      await divida.post(`divida/${uuid}`, data);
    }

    divida.get(`divida/${uuid}`).then((resp) => {
      setDebits(resp.data.result);
    });
    loadUsersWithDebts();
  };

  const lowerSearch = search.toLocaleLowerCase();

  const filteredUsers = users.filter((user) =>
    user.name.toLocaleLowerCase().includes(lowerSearch)
  );

  return (
    <VStack w="full" px="1rem">
      <Header onOpen={onOpen} whenThereIsUser={false} />

      <HStack w="full" justifyContent="space-between" pb="8px">
        <InputGroup>
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
        <CardContent>
          {filteredUsers.map((item) => (
            <Card
              key={item.id}
              name={item.name}
              email={item.email}
              id={String(item.id)}
              handleClickCard={() => router.push(`/${item.id}/divida`)}
            />
          ))}
        </CardContent>
      ) : loading ? (
        <h1>Loading</h1>
      ) : (
        <TableContent handleListUsers>
          {filteredUsers.length? 
          filteredUsers.map((item) => (
            <TableUsers
              key={item.id}
              name={item.name}
              email={item.email}
              id={String(item.id)}
              handleClickCard={() => router.push(`/${item.id}/divida`)}
            />
          ))
        : <h1>Usuários não encontrados</h1>}
        </TableContent>
        
      )}

      <Modal isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} />
    </VStack>
  );
};

export default Home;
