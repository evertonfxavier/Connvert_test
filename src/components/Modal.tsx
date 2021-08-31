/* eslint-disable react/no-children-prop */
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
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
  Box,
  Input,
  InputGroup,
  InputLeftAddon,
} from "@chakra-ui/react";
import { api } from "../pages/api/users";
import Select from "./Select";
import { divida } from "../pages/api/divida";
import { uuid } from "../pages/api/uuid";

interface ModalProps {
  isOpen: boolean;
  onClose: any;
}

export interface UsersResponse {
  id: number;
  name: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [users, setUsers] = useState<UsersResponse[]>([]);
  const [selectedUser, setSelectedUser] = useState("0");

  const [formData, setFormData] = useState({
    idUsuario: "",
    motivo: "",
    valor: "",
  });

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
  console.log(selectedUser);

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setFormData({ ...formData, [name]: value });
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const { motivo, valor } = formData;

    const data = {
      idUsuario: selectedUser,
      motivo,
      valor,
    };

    await divida.post(`divida/${uuid}`, data);
    console.log("data", data);
  }

  return (
    <ChakraModal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent mt="8rem" pt="1.2rem">
        <ModalCloseButton />
        <ModalBody py="2rem">
          <VStack as="form" spacing={6} onSubmit={handleSubmit}>
            <Box w="full">
              <label htmlFor="valor">Usuário:</label>
              <Select
                name="idUsuario"
                options={users}
                handleSelectUser={handleSelectUser}
                value={selectedUser}
              />
            </Box>
            <Box w="full">
              <label htmlFor="valor">Valor:</label>
              <InputGroup>
                <InputLeftAddon children="R$" />
                <Input
                  type="number"
                  name="valor"
                  onChange={handleInputChange}
                />
              </InputGroup>
            </Box>
            <Box w="full">
              <label htmlFor="motivo">Motivo:</label>
              <Input type="text" name="motivo" onChange={handleInputChange} />
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
