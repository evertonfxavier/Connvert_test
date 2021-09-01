/* eslint-disable react/no-children-prop */
import { useEffect, useState } from "react";
import {
  VStack,
  Button,
  HStack,
  Box,
  Input,
  InputGroup,
  InputLeftAddon,
  Select,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

import ModalWrapper from "./ModalWrapper";

import { api } from "../pages/api/users";
import { IDebitsInput } from "../pages/[idUsuario]/divida";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: any;
  initialData?: IDebitsInput;
}

export interface UsersResponse {
  id: number;
  name: string;
}

export interface SubmitProps {
  idUsuario: number;
  valor: number;
  motivo: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}) => {
  const [users, setUsers] = useState<UsersResponse[]>([]);

  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    api.get("users").then((resp) => {
      const usersData = resp.data.map((user: UsersResponse) => ({
        id: user.id,
        name: user.name,
      }));
      // console.log("usersData", usersData);
      setUsers(usersData);
    });
  }, []);

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleSubmitData = (data: SubmitProps) => {
    reset();
    onSubmit(data);
  };

  return (
    <ModalWrapper isOpen={isOpen} onClose={handleClose}>
      <VStack as="form" spacing={6} onSubmit={handleSubmit(handleSubmitData)}>
        <Box w="full" textAlign="right">
          <label htmlFor="valor">Usuário:</label>
          <Select
            placeholder="Selecione um usuário"
            defaultValue={initialData?.idUsuario || ""}
            {...register("idUsuario", { required: true })}
          >
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.id} - {user.name}
              </option>
            ))}
          </Select>
        </Box>
        <Box w="full" textAlign="right">
          <label htmlFor="valor">Valor:</label>
          <InputGroup>
            <InputLeftAddon children="R$" />
            <Input
              type="number"
              defaultValue={initialData?.valor || ""}
              {...register("valor", { required: true })}
            />
          </InputGroup>
        </Box>
        <Box w="full" textAlign="right">
          <label htmlFor="motivo">Motivo:</label>
          <Input
            type="text"
            defaultValue={initialData?.motivo || ""}
            {...register("motivo", { required: true })}
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
            {initialData ? "Atualizar" : "Salvar"}
          </Button>
        </HStack>
      </VStack>
    </ModalWrapper>
  );
};

export default Modal;
