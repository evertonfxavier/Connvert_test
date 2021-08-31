import { ChangeEventHandler } from "react";
import { Select as ChakraSelect, SelectProps, Text } from "@chakra-ui/react";
import { UsersResponse } from "./Modal";

interface ISelect extends SelectProps {
  name: string;
  options: any;
  value?: string;
  handleSelectUser?: ChangeEventHandler;
}

const Select: React.FC<ISelect> = ({
  name,
  options,
  value,
  handleSelectUser,
  ...rest
}) => {
  return (
    <ChakraSelect
      name={name}
      value={value}
      onChange={handleSelectUser}
      {...rest}
    >
      <Text as="option" value="0">
        Selecione um usuário
      </Text>
      {options.map((user: UsersResponse) => (
        <Text as="option" key={user.id} value={user.id}>
          {user.id} - {user.name}
        </Text>
      ))}
    </ChakraSelect>
  );
};

export default Select;
