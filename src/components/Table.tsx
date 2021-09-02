import { Button, HStack, Icon, Td, Tr, TableProps } from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";

import { IDebts } from "../types/Debts";

interface ITable extends TableProps {
  debt: IDebts;
  handleEditDebt: (debt: IDebts) => void;
  handleDeleteDebt: (_id: number) => {};
}

const Table: React.FC<ITable> = ({
  debt,
  handleEditDebt,
  handleDeleteDebt,
}) => {
  return (
    <Tr>
      <Td>
        {new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(debt.valor)}
      </Td>
      <Td>{debt.motivo}</Td>
      <Td>{new Date(debt.criado).toLocaleDateString("pt-BR")}</Td>
      <Td>
        <HStack>
          <Button
            boxSize={10}
            bgColor="blue.400"
            onClick={() => handleEditDebt(debt)}
            _hover={{
              opacity: "0.8",
            }}
          >
            <Icon as={EditIcon} color="white" />
          </Button>
          <Button
            boxSize={10}
            bgColor="red.400"
            onClick={() => handleDeleteDebt(debt._id)}
            _hover={{
              opacity: "0.8",
            }}
          >
            <Icon as={DeleteIcon} color="white" />
          </Button>
        </HStack>
      </Td>
    </Tr>
  );
};

export default Table;
