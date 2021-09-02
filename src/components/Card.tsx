import { Box, Divider, HStack, Text } from "@chakra-ui/react";

import { IUser } from "../types/User";

interface ICard {
  user: IUser;
  handleClickToGoDebt: () => void;
}

const Card: React.FC<ICard> = ({ user, handleClickToGoDebt }) => {
  return (
    <Box
      w={["full", "16rem", "16rem", "16rem"]}
      bgColor="white"
      borderRadius=".4rem"
      cursor="pointer"
      p=".6rem"
      alignItems="flex-start"
      style={{
        marginInlineStart: "0px",
        margin: ".4rem",
      }}
      onClick={handleClickToGoDebt}
    >
      <Text color="blue.600">{user.name}</Text>
      <Text fontSize="sm">E-mail: {user.email}</Text>
      <Divider />
      <HStack w="full" justifyContent="space-between" pt=".4rem">
        <Text color="gray.400" fontSize="sm">
          idUsuario: #{user.id}
        </Text>
        <Text color="green.400" fontSize="sm" fontStyle="italic">
          Ver dívida(s) {">>"}
        </Text>
      </HStack>
    </Box>
  );
};

export default Card;
