/* eslint-disable react/display-name */
import { useEffect, useState } from "react";
import { useDisclosure, VStack, useToast, Box } from "@chakra-ui/react";
import { useRouter } from "next/router";

import Modal from "../../components/Modal";
import Table from "../../components/Table";
import Header from "../../components/Header";
import Container from "../../components/Container";
import Loading from "../../components/Loading";

import { api } from "../api/users";
import { divida } from "../api/divida";

import { DebtSubmit, IDebts, OmitDebtId } from "../../types/Debts";

const Divida: React.FC = () => {
  const { query } = useRouter();
  const router = useRouter();

  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [user, setUser] = useState({ id: query.idUsuario, name: "" });
  const [loading, setLoading] = useState(false);
  const [debts, setDebts] = useState<IDebts[]>([]);
  const [editingDebt, setEditingDebt] = useState<IDebts | undefined>(
    {} as IDebts
  );

  useEffect(() => {
    api.get(`users/${query.idUsuario}`).then((resp) => {
      setUser(resp.data);
    });
  }, [query.idUsuario]);

  useEffect(() => {
    setLoading(true);

    divida.get("divida").then((resp) => {
      let filtered = resp.data.filter(
        (debt: IDebts) => Number(debt.idUsuario) === Number(user.id)
      );
      setDebts(filtered);
      setLoading(false);
    });
  }, [user.id]);

  const handleSubmit = async (data: DebtSubmit) => {
    const formattedData = {
      ...data,
      // id: data._id,
      idUsuario: query.idUsuario,
      valor: data.valor,
      motivo: data.motivo,
      criado: new Date(),
    };

    if (editingDebt && editingDebt.id) {
      await divida.put(`divida/${editingDebt.id}`, formattedData).then(() => {
        toast({
          position: "top-right",
          title: "Dívida atualizada com sucesso.",
          status: "success",
          duration: 2000,
          isClosable: true,
          render: () => messageCard(),
        });
      });
    } else {
      await divida.post("divida", formattedData).then(() => {
        toast({
          position: "top-right",
          title: "Dívida criada com sucesso.",
          status: "success",
          duration: 2000,
          isClosable: true,
          render: () => messageCard(),
        });
      });
    }

    divida.get("divida").then((resp) => {
      let filtered = resp.data.filter(
        (debt: IDebts) => Number(debt.idUsuario) === Number(user.id)
      );
      setDebts(filtered);
    });
  };

  const handleOpenModalToUpdateUser = async (data: IDebts) => {
    setEditingDebt(data);

    onOpen();
  };

  const handleDeleteDebt = async (id: number) => {
    await divida.delete(`/divida/${id}`).then(() => {
      toast({
        position: "top-right",
        status: "success",
        duration: 2000,
        isClosable: true,
        render: () => messageCard(id),
      });
    });

    if (debts.length === 1) {
      router.back();
    }
    setDebts(debts.filter((debt) => debt.id !== id));
  };

  const handleCloseModal = () => {
    setEditingDebt(undefined);
    onClose();
  };

  const messageCard = (id?: number) => (
    <Box color="white" p={2} m={2} bg={id ? "red.500" : "green.500"}>
      {id
        ? "Dívida deletada com sucesso"
        : editingDebt
        ? "Dívida atualizada com sucesso."
        : "Dívida criada com sucesso."}
    </Box>
  );

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
              key={debt.id}
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
