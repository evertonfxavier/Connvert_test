import { useEffect, useState } from "react";
import { useDisclosure, VStack } from "@chakra-ui/react";

import Table from "../../components/Table";
import Header from "../../components/Header";
import TableContent from "../../components/TableContent";

import { divida } from "../api/divida";
import { uuid } from "../api/uuid";
import Modal, { SubmitProps } from "../../components/Modal";
import { useRouter } from "next/router";

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

  const convertParamsTnumber = Number(query.idUsuario);

  useEffect(() => {
    divida.get(`divida/${uuid}`).then((resp) => {
      let filtered = resp.data.result.filter(
        (debit: IDebits) => debit.idUsuario === convertParamsTnumber
      );
      setDebits(filtered);
    });
  }, []);

  const handleSubmit = async (data: SubmitProps) => {
    if (editingDebit && editingDebit._id) {
      await divida.put(`divida/${editingDebit._id}/${uuid}`, data);
    } else {
      await divida.post(`divida/${uuid}`, data);
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

    setDebits(debits.filter((debit) => debit._id !== _id));
  };

  const handleCloseModal = () => {
    setEditingDebit(undefined);
    onClose();
  };

  return (
    <VStack w="full" px="1rem">
      <Header onOpen={onOpen} whenThereIsUser />

      <TableContent>
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
      />
    </VStack>
  );
};

export default Divida;
