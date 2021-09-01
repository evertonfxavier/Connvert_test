import { ReactNode } from "react";
import {
  HStack,
  Table as ChakraTable,
  Tbody,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

interface CardContentProps {
  handleListUsers: boolean;
  children: ReactNode;
}

const TableContent: React.FC<CardContentProps> = ({
  handleListUsers,
  children,
}) => {
  const headerUserTable = [
    { name: "ID" },
    { name: "Nome" },
    { name: "email" },
    { name: "Ações" },
  ];

  const headerDebitTable = [
    { name: "Valor" },
    { name: "Motivo" },
    { name: "Criado em:" },
    { name: "Ações" },
  ];

  return (
    <HStack
      w="full"
      h={["calc(100vh - 10rem)", "calc(100vh - 10rem)", "calc(100vh - 10rem)"]}
      flexWrap="wrap"
      border="1px solid"
      borderColor="gray.200"
      borderRadius=".4rem"
      overflowY="scroll"
      css={{
        "&::-webkit-scrollbar": {
          width: "6px",
        },
        "&::-webkit-scrollbar-track": {
          background: "rgba(232, 236, 241, 1)",
        },
        "&::-webkit-scrollbar-thumb": {
          background: "#4299E1",
          borderRadius: ".8rem",
        },
      }}
      placeContent="flex-start"
    >
      <ChakraTable variant="striped" colorScheme="gray">
        <Thead>
          {handleListUsers ? (
            <Tr>
              {headerUserTable.map((header, idx) => (
                <Th key={idx}>{header.name}</Th>
              ))}
            </Tr>
          ) : (
            <Tr>
              {headerDebitTable.map((header, idx) => (
                <Th key={idx}>{header.name}</Th>
              ))}
            </Tr>
          )}
        </Thead>
        <Tbody>{children}</Tbody>
      </ChakraTable>
    </HStack>
  );
};

export default TableContent;
