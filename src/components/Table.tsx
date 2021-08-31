import {
  Box,
  Button,
  Divider,
  Heading,
  HStack,
  Icon,
  SimpleGrid,
  Table as ChakraTable,
  TableCaption,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";

const Table = () => {
  return (
    <ChakraTable variant="striped" colorScheme="cyan">
      <Thead>
        <Tr>
          <Th>idUsuario</Th>
          <Th>valor</Th>
          <Th>motivo</Th>
          <Th>criado</Th>
          <Th>Ações</Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr>
          <Td>1</Td>
          <Td>1999</Td>
          <Td>parcela 3 carros</Td>
          <Td>31/08/2021</Td>
          <Td>
            <HStack>
              <Button
                bgColor="blue.400"
                // onClick={() => handleEditUser(user)}
                _hover={{
                  opacity: "0.8",
                }}
              >
                <Icon as={EditIcon} color="white" />
              </Button>
              <Button
                bgColor="red.400"
                // onClick={onOpen}
                _hover={{
                  opacity: "0.8",
                }}
              >
                <Icon as={DeleteIcon} color="white" />
              </Button>
            </HStack>
          </Td>
        </Tr>
        <Tr>
          <Td>1</Td>
          <Td>1999</Td>
          <Td>parcela 3 carros</Td>
          <Td>31/08/2021</Td>
          <Td>31/08/2021</Td>
        </Tr>
      </Tbody>
    </ChakraTable>
  );
};

export default Table;
