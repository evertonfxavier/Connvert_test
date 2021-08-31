import { ReactNode } from "react";
import {
  HStack,
  Table as ChakraTable,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

interface CardContentProps {
  children: ReactNode;
}

const TableContent: React.FC<CardContentProps> = ({ children }) => {
  const headerTable = [
    { name: "idUsuario" },
    { name: "Valor" },
    { name: "Motivo" },
    { name: "Criado em:" },
    { name: "Ações" },
  ];

  return (
    <HStack
      w="full"
      h={["calc(100vh - 10rem)", "calc(100vh - 10rem)", "calc(100vh - 6.8rem)"]}
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
      <ChakraTable variant="striped" colorScheme="cyan">
        <Thead>
          <Tr>
            {headerTable.map((header, idx) => (
              <Th key={idx}>{header.name}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>{children}</Tbody>
      </ChakraTable>
    </HStack>
  );
};

export default TableContent;
