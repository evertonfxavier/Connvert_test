import { Button, HStack, Icon, Td, Tr, TableProps } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";

import { IUser } from "../types/User";

interface ITable extends TableProps {
  user: IUser;
  handleClickToGoDebt: () => void;
}

const TableUsers: React.FC<ITable> = ({ user, handleClickToGoDebt }) => {
  return (
    <Tr>
      <Td>#{user.id}</Td>
      <Td>{user.name}</Td>
      <Td>{user.email}</Td>
      <Td>
        <HStack>
          <Button
            boxSize={10}
            bgColor="green.400"
            onClick={handleClickToGoDebt}
            _hover={{
              opacity: "0.8",
            }}
          >
            <Icon as={ExternalLinkIcon} color="white" />
          </Button>
        </HStack>
      </Td>
    </Tr>
  );
};

export default TableUsers;
