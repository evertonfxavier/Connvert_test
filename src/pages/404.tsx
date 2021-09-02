import { Heading, VStack } from "@chakra-ui/react";
import Link from "next/link";

const NotFound: React.FC = () => {
  return (
    <VStack w="full" h="full" bg="white" borderRadius="md" justify="center">
      <Heading size="md">Opss, caminho não encontrado</Heading>
      <Link href="/">Voltar para a aplicação</Link>
    </VStack>
  );
};

export default NotFound;
