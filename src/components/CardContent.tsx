import { ReactNode } from "react";
import { HStack } from "@chakra-ui/react";

interface CardContentProps {
  children: ReactNode;
}

const CardContent: React.FC<CardContentProps> = ({ children }) => {
  return (
    <HStack
      w="full"
      h={["calc(100vh - 10rem)", "calc(100vh - 10rem)", "calc(100vh - 10rem)"]}
      flexWrap="wrap"
      border="1px solid"
      borderColor="gray.200"
      borderRadius=".4rem"
      overflowY="scroll"
      css={{
        "&::-webkit-scrollbar": {
          width: "6px",
        },
        "&::-webkit-scrollbar-track": {
          background: "rgba(232, 236, 241, 1)",
        },
        "&::-webkit-scrollbar-thumb": {
          background: "#4299E1",
          borderRadius: ".8rem",
        },
      }}
      placeContent="flex-start"
    >
      {children}
    </HStack>
  );
};

export default CardContent;
