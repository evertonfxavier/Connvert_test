import Head from "next/head";
import type { AppProps } from "next/app";
import { ChakraProvider, Stack, useMediaQuery, VStack } from "@chakra-ui/react";

import SideNav from "../components/SideNav";

import theme from "../styles/theme";

function MyApp({ Component, pageProps }: AppProps) {
  const [isLargerThan1280] = useMediaQuery("(min-width: 1280px)");

  return (
    <ChakraProvider theme={theme}>
      <Head>
        <title> Connvert - Test</title>
      </Head>
      <Stack
        direction={["column", "column", "row", "row"]}
        w="full"
        h="100vh"
        maxW="100vw"
        maxH="100vh"
        bgColor="gray.50"
        spacing={0}
        overflow={["auto", "auto", "hidden", "hidden"]}
      >
        <SideNav />
        <VStack
          as="main"
          h="full"
          w={["full"]}
          maxW={isLargerThan1280 ? "85vw" : "100vw"}
          bgColor="gray.50"
          position="relative"
        >
          <Component {...pageProps} />
        </VStack>
      </Stack>
    </ChakraProvider>
  );
}
export default MyApp;
