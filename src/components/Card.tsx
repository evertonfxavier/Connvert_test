import { Box, Divider, HStack, Text } from "@chakra-ui/react";

interface CardProps {
  user: string;
  idUsuario: number;
  handleClickCard: () => void;
}

const Card: React.FC<CardProps> = ({ user, idUsuario, handleClickCard }) => {
  return (
    <Box
      w={["full", "16rem", "16rem", "16rem"]}
      bgColor="white"
      border="1px solid"
      borderColor="gray.200"
      borderRadius=".4rem"
      cursor="pointer"
      p=".6rem"
      alignItems="flex-start"
      style={{
        marginInlineStart: "0px",
        margin: ".4rem",
      }}
      onClick={handleClickCard}
    >
      <Text>{user}</Text>
      <Divider />
      <HStack w="full" justifyContent="space-between" pt=".4rem">
        <Text color="gray.400" fontSize="sm">
          idUsuario: #{idUsuario}
        </Text>
        <Text color="green.400" fontSize="sm" fontStyle="italic">
          Ver dívida(s) {">>"}
        </Text>
      </HStack>
    </Box>
  );
};

export default Card;
