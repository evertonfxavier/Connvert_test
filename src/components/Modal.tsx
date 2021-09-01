/* eslint-disable react/no-children-prop */
import { useEffect, useState } from "react";
import {
  VStack,
  Button,
  HStack,
  Input,
  InputGroup,
  InputLeftAddon,
  Select,
  Text,
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
  hiddeUserSelect?: boolean;
}

export interface UsersResponse {
  id: number;
  name: string;
  email: string;
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
  hiddeUserSelect = false,
}) => {
  const [users, setUsers] = useState<UsersResponse[]>([]);

  const { register, handleSubmit, reset, formState: {
    isSubmitting
  } } = useForm();

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
  // console.log(initialData)

  return (
    <ModalWrapper isOpen={isOpen} onClose={handleClose}>
      <VStack as="form" spacing={6} onSubmit={handleSubmit(handleSubmitData)}>
        {!hiddeUserSelect && (
          <>
            <HStack
              as="fieldset"
              w="full"
              textAlign="right"
              justifyContent="space-between"
            >
              <Text as="label" htmlFor="valor">
                Usuário:
              </Text>
              <InputGroup w="xs">
                <Select
                  placeholder="Selecione um usuário"
                  defaultValue={initialData?.idUsuario || ""}
                  // disabled={hiddeUserSelect}
                  {...register("idUsuario", { required: true })}
                >
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.id} - {user.name}
                    </option>
                  ))}
                </Select>
              </InputGroup>
            </HStack>
          </>
        )}
        <HStack
          as="fieldset"
          w="full"
          textAlign="right"
          justifyContent="space-between"
        >
          <Text as="label" htmlFor="valor">
            Valor:
          </Text>
          <InputGroup w="xs">
            <InputLeftAddon children="R$" />
            <Input
              type="number"
              defaultValue={initialData?.valor || ""}
              {...register("valor", { required: true })}
            />
          </InputGroup>
        </HStack>
        <HStack
          as="fieldset"
          w="full"
          textAlign="right"
          justifyContent="space-between"
        >
          <Text as="label" htmlFor="motivo">
            Motivo:
          </Text>
          <InputGroup w="xs">
            <Input
              type="text"
              defaultValue={initialData?.motivo || ""}
              {...register("motivo", { required: true })}
            />
          </InputGroup>
        </HStack>
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
            disabled={isSubmitting}
          >
            {initialData?.idUsuario ? "Atualizar" : "Salvar"}
          </Button>
        </HStack>
      </VStack>
    </ModalWrapper>
  );
};

export default Modal;
