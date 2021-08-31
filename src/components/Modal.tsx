/* eslint-disable react/no-children-prop */
import { ChangeEvent, useEffect, useState } from "react";
import {
  Modal as ChakraModal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  VStack,
  Button,
  HStack,
  ModalFooter,
  Select,
  Box,
  Input,
  InputGroup,
  InputLeftAddon,
} from "@chakra-ui/react";
import { api } from "../pages/api/users";

interface ModalProps {
  isOpen: boolean;
  onClose: any;
}

interface UsersResponse {
  id: number;
  name: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [users, setUsers] = useState<UsersResponse[]>([]);
  const [selectedUser, setSelectedUser] = useState("0");

  useEffect(() => {
    api.get("users").then((resp) => {
      const getUser = resp.data.map((user: UsersResponse) => ({
        id: user.id,
        name: user.name,
      }));
      setUsers(getUser);
    });
  }, []);

  function handleSelectUser(event: ChangeEvent<HTMLSelectElement>) {
    const user = event.target.value;
    setSelectedUser(user);
  }

  return (
    <ChakraModal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent mt="8rem" pt="1.2rem">
        <ModalCloseButton />
        <ModalBody py="2rem">
          <VStack
            as="form"
            spacing={6}
            // onSubmit={handleSubmit(handleSubmitData)}
          >
            <Box w="full">
              <label htmlFor="valor">Usuário:</label>
              <Select
                name="user"
                value={selectedUser}
                onChange={handleSelectUser}
              >
                <option value="0">Selecione um usuário</option>
                {users.map((user) => (
                  <option key={user.id} value={user.name}>
                    {user.name}
                  </option>
                ))}
              </Select>
            </Box>

            <Box w="full">
              <label htmlFor="valor">Valor:</label>
              <InputGroup>
                <InputLeftAddon children="R$" />
                <Input
                  type="number"
                  name="valor"
                  //   onChange={handleInputChange}
                />
              </InputGroup>
            </Box>
            <Box w="full">
              <label htmlFor="motivo">Motivo:</label>
              <Input
                type="text"
                name="motivo"
                //   onChange={handleInputChange}
              />
            </Box>
            <HStack>
              <Button
                bgColor="red.400"
                color="white"
                mr={3}
                onClick={onClose}
                _hover={{
                  opacity: "0.8",
                }}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                color="white"
                bgColor="blue.400"
                _hover={{
                  opacity: "0.8",
                }}
                onClick={onClose}
              >
                + Criar dívida
              </Button>
            </HStack>
          </VStack>
        </ModalBody>
      </ModalContent>
    </ChakraModal>
  );
};

export default Modal;
