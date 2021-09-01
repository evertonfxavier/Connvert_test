import { useEffect, useState } from "react";
import { useDisclosure, VStack } from "@chakra-ui/react";

import Table from "../../components/Table";
import Header from "../../components/Header";
import TableContent from "../../components/TableContent";

import { divida } from "../api/divida";
import { uuid } from "../api/uuid";
import Modal, { SubmitProps } from "../../components/Modal";
import { useRouter } from "next/router";
import { api } from "../api/users";

export interface IDebits {
  _id: number;
  idUsuario: number;
  valor: number;
  motivo: string;
  criado: string;
}

export type IDebitsInput = Omit<IDebits, "id">;

const Divida: React.FC = () => {
  const [debits, setDebits] = useState<IDebits[]>([]);
  const [editingDebit, setEditingDebit] = useState<IDebitsInput | undefined>(
    {} as IDebitsInput
  );

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { query } = useRouter();

  const [user, setUser] = useState({ id: query.idUsuario, name: "" });

  const convertParamsTnumber = Number(query.idUsuario);

  useEffect(() => {
    api.get(`users/${query.idUsuario}`).then((resp) => {
      setUser(resp.data);
    });
  }, []);

  useEffect(() => {
    divida.get(`divida/${uuid}`).then((resp) => {
      let filtered = resp.data.result.filter(
        (debit: IDebits) => debit.idUsuario === convertParamsTnumber
      );
      setDebits(filtered);
    });
  }, [convertParamsTnumber]);

  const handleSubmit = async (data: SubmitProps) => {
    const formattedData = { ...data, idUsuario: query.idUsuario };

    if (editingDebit && editingDebit._id) {
      await divida.put(`divida/${editingDebit._id}/${uuid}`, formattedData);
    } else {
      await divida.post(`divida/${uuid}`, formattedData);
    }

    divida.get(`divida/${uuid}`).then((resp) => {
      let filtered = resp.data.result.filter(
        (debit: IDebits) => debit.idUsuario === convertParamsTnumber
      );
      setDebits(filtered);
    });
  };

  const handleOpenModalToUpdateUser = async (data: IDebitsInput) => {
    setEditingDebit(data);

    onOpen();
  };

  const handleDeleteDebit = async (_id: number) => {
    await divida.delete(`/divida/${_id}/${uuid}`);

    //TODO redirect user quando nao tiver dado
    // const debts = await divida.get(`divida/${uuid}`);
    // const users = await api.get("users");

    // const usersWithDebtsId = debts.data.result.map(
    //   (item: any) => item.idUsuario
    // );

    // const results = users.data.filter((user: any) =>
    //   usersWithDebtsId.includes(user.id)
    // );

    setDebits(debits.filter((debit) => debit._id !== _id));
  };

  const handleCloseModal = () => {
    setEditingDebit(undefined);
    onClose();
  };

  return (
    <VStack w="full" px="1rem">
      <Header
        idUsuario={Number(query.idUsuario)}
        onOpen={onOpen}
        whenThereIsUser
        name={user.name}
      />

      <TableContent handleListUsers={false}>
        {debits.map((debit) => (
          <Table
            key={debit._id}
            debit={debit}
            handleEditDebit={handleOpenModalToUpdateUser}
            handleDeleteDebit={handleDeleteDebit}
          />
        ))}
      </TableContent>

      <Modal
        isOpen={isOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        initialData={editingDebit}
        hiddeUserSelect
      />
    </VStack>
  );
};

export default Divida;
