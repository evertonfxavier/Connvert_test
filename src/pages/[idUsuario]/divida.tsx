import { useEffect, useState } from "react";
import { useDisclosure, VStack, toast, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";

import Modal from "../../components/Modal";
import Table from "../../components/Table";
import Header from "../../components/Header";
import Container from "../../components/Container";
import Loading from "../../components/Loading";

import { api } from "../api/users";
import { divida } from "../api/divida";
import { uuid } from "../api/uuid";

import { DebtSubmit, IDebts, OmitDebtId } from "../../types/Debts";

const Divida: React.FC = () => {
  const { query } = useRouter();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [user, setUser] = useState({ id: query.idUsuario, name: "" });
  const [loading, setLoading] = useState(false);
  const [debts, setDebts] = useState<IDebts[]>([]);
  const [editingDebt, setEditingDebt] = useState<OmitDebtId | undefined>(
    {} as OmitDebtId
  );
  useEffect(() => {
    api.get(`users/${query.idUsuario}`).then((resp) => {
      setUser(resp.data);
    });
  }, [query.idUsuario]);

  useEffect(() => {
    setLoading(true);
    divida.get(`divida/${uuid}`).then((resp) => {
      let filtered = resp.data.result.filter(
        (debt: IDebts) => debt.idUsuario === Number(user.id)
      );
      setDebts(filtered);
      setLoading(false);
    });
  }, [user.id]);

  const handleSubmit = async (data: DebtSubmit) => {
    const formattedData = { ...data, idUsuario: query.idUsuario };

    if (editingDebt && editingDebt._id) {
      await divida
        .put(`divida/${editingDebt._id}/${uuid}`, formattedData)
        .then(() => {
          toast({
            position: "top-right",
            title: "Dívida atualizada com sucesso.",
            status: "success",
            duration: 4000,
            isClosable: true,
          });
        });
    } else {
      await divida.post(`divida/${uuid}`, formattedData).then(() => {
        toast({
          position: "top-right",
          title: "Dívida criada com sucesso.",
          status: "success",
          duration: 4000,
          isClosable: true,
        });
      });
    }

    divida.get(`divida/${uuid}`).then((resp) => {
      let filtered = resp.data.result.filter(
        (debt: IDebts) => debt.idUsuario === Number(user.id)
      );
      setDebts(filtered);
    });
  };

  const handleOpenModalToUpdateUser = async (data: OmitDebtId) => {
    setEditingDebt(data);

    onOpen();
  };

  const handleDeleteDebt = async (_id: number) => {
    await divida.delete(`/divida/${_id}/${uuid}`).then(() => {
      toast({
        position: "top-right",
        title: "Dívida deletada com sucesso.",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    });

    //TODO redirect user quando nao tiver dado
    // const debts = await divida.get(`divida/${uuid}`);
    // const users = await api.get("users");

    // const usersWithDebtsId = debts.data.result.map(
    //   (item: any) => item.idUsuario
    // );

    // const results = users.data.filter((user: any) =>
    //   usersWithDebtsId.includes(user.id)
    // );

    setDebts(debts.filter((debt) => debt._id !== _id));
  };

  const handleCloseModal = () => {
    setEditingDebt(undefined);
    onClose();
  };

  return (
    <VStack w="full" px="1rem">
      <Header
        id={Number(user.id)}
        name={user.name}
        onOpen={onOpen}
        whenThereIsUser
      />
      {loading ? (
        <Loading />
      ) : (
        <Container handleListUsers={false}>
          {debts.map((debt) => (
            <Table
              key={debt._id}
              debt={debt}
              handleEditDebt={handleOpenModalToUpdateUser}
              handleDeleteDebt={handleDeleteDebt}
            />
          ))}
        </Container>
      )}
      <Modal
        isOpen={isOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        initialData={editingDebt}
        hiddeUserSelect
      />
    </VStack>
  );
};

export default Divida;
