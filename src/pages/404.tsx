import Link from "next/link";
import { Heading, Icon, VStack } from "@chakra-ui/react";
import { NotFoundIcon } from "../components/Illustrations/NotFoundIcon";

const NotFound: React.FC = () => {
  return (
    <VStack w="full" h="full" bg="white" borderRadius="md" justify="center">
      <Icon as={NotFoundIcon} boxSize={300} />
      <Heading size="md">Opss, caminho não encontrado</Heading>
      <Link href="/">Voltar para a aplicação</Link>
    </VStack>
  );
};

export default NotFound;
