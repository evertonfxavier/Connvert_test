import { ReactNode } from "react";
import {
  HStack,
  Table as ChakraTable,
  Tbody,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

interface ContainerProps {
  children: ReactNode;
  handleListUsers?: boolean;
  handleShowCards?: boolean;
}

const Container: React.FC<ContainerProps> = ({
  children,
  handleListUsers,
  handleShowCards,
}) => {
  const headerUserTable = [
    { name: "ID" },
    { name: "Nome" },
    { name: "email" },
    { name: "Ações" },
  ];

  const headerDebtTable = [
    { name: "Valor" },
    { name: "Motivo" },
    { name: "Criado/Atualizado:" },
    { name: "Ações" },
  ];

  return (
    <HStack
      w="full"
      h={["calc(100vh - 12rem)", "calc(100vh - 13rem)", "calc(100vh - 9.2rem)"]}
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
      {!handleShowCards ? (
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
                {headerDebtTable.map((header, idx) => (
                  <Th key={idx}>{header.name}</Th>
                ))}
              </Tr>
            )}
          </Thead>
          <Tbody>{children}</Tbody>
        </ChakraTable>
      ) : (
        children
      )}
    </HStack>
  );
};

export default Container;
