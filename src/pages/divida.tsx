import { useEffect, useState } from "react";
import { useDisclosure, VStack } from "@chakra-ui/react";

import Table from "../components/Table";
import Header from "../components/Header";
import TableContent from "../components/TableContent";

import { divida } from "./api/divida";
import { uuid } from "./api/uuid";
import Modal from "../components/Modal";

export interface IDebits {
  _id: number;
  idUsuario: number;
  valor: number;
  motivo: string;
  criado: string;
}

type IDebitsInput = Omit<IDebits, "id">;

const Divida: React.FC = () => {
  const [debts, setDebits] = useState<IDebits[]>([]);
  const [editingUser, setEditingUser] = useState({});

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    divida.get(`divida/${uuid}`).then((resp) => setDebits(resp.data.result));
  }, []);
  // console.log(debts);

  const handleOpenModalToUpdateUser = async (data: IDebitsInput) => {
    setEditingUser(data);

    onOpen();
  };

  const handleDeleteDebit = async (_id: number) => {
    await divida.delete(`/divida/${_id}/${uuid}`);

    setDebits(debts.filter((debit) => debit._id !== _id));
  };

  return (
    <VStack w="full" px="1rem">
      <Header onOpen={onOpen} whenThereIsUser />

      <TableContent>
        {debts.map((debit) => (
          <Table
            key={debit._id}
            debit={debit}
            handleEditDebit={handleOpenModalToUpdateUser}
            handleDeleteDebit={handleDeleteDebit}
          />
        ))}
      </TableContent>

      <Modal isOpen={isOpen} onClose={onClose} />
    </VStack>
  );
};

export default Divida;
