import { Button, HStack, Icon, Td, Tr, TableProps } from "@chakra-ui/react";
import { DeleteIcon, ExternalLinkIcon } from "@chakra-ui/icons";

interface ITable extends TableProps {
  id: string | undefined;
  name: string;
  email: string;
  handleClickCard: () => void;
}

const TableUsers: React.FC<ITable> = ({
  id,
  name,
  email,
  handleClickCard,
}) => {
  return (
    <Tr>
      <Td>#{id}</Td>
      <Td>{name}</Td>
      <Td>{email}</Td>
      <Td>
        <HStack>
          <Button
            bgColor="blue.400"
            onClick={handleClickCard}
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
