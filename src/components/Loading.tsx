import { CircularProgress, VStack } from "@chakra-ui/react";

const Loading = () => {
  return (
    <VStack
      w="full"
      h={["calc(100vh - 10rem)", "calc(100vh - 10rem)", "calc(100vh - 10rem)"]}
      justifyContent="center"
    >
      <CircularProgress isIndeterminate color="gray.300" />
    </VStack>
  );
};

export default Loading;
