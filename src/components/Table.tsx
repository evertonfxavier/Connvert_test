import {
  Button,
  HStack,
  Icon,
  Table as ChakraTable,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  TableProps,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { IDebits } from "../pages/divida";
import { ReactNode } from "react";

interface ITable extends TableProps {
  debit: IDebits;
  handleEditDebit?: (debit: IDebits) => void;
  handleDeleteDebit?: (id: number) => {};
}

const Table: React.FC<ITable> = ({
  debit,
  handleEditDebit,
  handleDeleteDebit,
}) => {
  return (
    <Tr>
      <Td>{debit.idUsuario}</Td>
      <Td>
        {new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(debit.valor)}
      </Td>
      <Td>{debit.motivo}</Td>
      <Td>{new Date(debit.criado).toLocaleDateString("pt-BR")}</Td>
      {/* <Td>{debit.criado}</Td> */}
      <Td>
        <HStack>
          <Button
            bgColor="blue.400"
            // onClick={() => ''}
            _hover={{
              opacity: "0.8",
            }}
          >
            <Icon as={EditIcon} color="white" />
          </Button>
          <Button
            bgColor="red.400"
            // onClick={() => ''}
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
