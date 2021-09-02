/* eslint-disable react/no-children-prop */
import { useEffect, useState } from "react";
import { VStack, Button, HStack, Input, Select } from "@chakra-ui/react";
import { useForm } from "react-hook-form";

import ModalWrapper from "./ModalWrapper";
import InputGroup from "./InputGroup";

import { api } from "../pages/api/users";

import { IUser } from "../types/User";
import { DebtSubmit, OmitDebtId } from "../types/Debts";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: any;
  initialData?: OmitDebtId;
  hiddeUserSelect?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  hiddeUserSelect = false,
}) => {
  const [users, setUsers] = useState<IUser[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm();

  useEffect(() => {
    api.get("users").then((resp) => {
      const usersData = resp.data.map((user: IUser) => ({
        id: user.id,
        name: user.name,
      }));
      setUsers(usersData);
    });
  }, []);

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleSubmitData = (data: DebtSubmit) => {
    reset();
    onSubmit(data);
    onClose();
  };

  return (
    <ModalWrapper isOpen={isOpen} onClose={handleClose}>
      <VStack as="form" spacing={6} onSubmit={handleSubmit(handleSubmitData)}>
        {!hiddeUserSelect && (
          <InputGroup
            label="Usuário"
            hasSomeError={errors.idUsuario && "Escolha um usuário"}
          >
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
          </InputGroup>
        )}

        <InputGroup
          label="Valor"
          hasSomeError={errors.valor && "Defina o valor"}
        >
          <Input
            type="text"
            defaultValue={initialData?.valor || ""}
            {...register("valor", { required: true })}
          />
        </InputGroup>

        <InputGroup
          label="Motivo"
          hasSomeError={errors.motivo && "Especifique o motivo"}
        >
          <Input
            type="text"
            defaultValue={initialData?.motivo || ""}
            {...register("motivo", { required: true })}
          />
        </InputGroup>

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
            bgColor="green.400"
            _hover={{
              opacity: "0.8",
            }}
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
