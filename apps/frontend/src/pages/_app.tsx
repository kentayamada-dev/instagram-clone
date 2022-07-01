import { ApolloProvider } from "@apollo/client";
import { ChakraProvider } from "@chakra-ui/react";
import { appWithTranslation } from "next-i18next";
import i18nextConfig from "../../next-i18next.config";
import { useApollo } from "../libs/apollo";
import { myTheme } from "../libs/chakra";
import type { MyAppType } from "../types/pages";

// eslint-disable-next-line @typescript-eslint/naming-convention
const MyApp: MyAppType = ({ Component, pageProps }) => {
  const getLayout = Component.getLayout ?? ((page): JSX.Element => page);
  const apolloClient = useApollo(pageProps);

  return (
    <ApolloProvider client={apolloClient}>
      <ChakraProvider theme={myTheme}>{getLayout(<Component {...pageProps} />)}</ChakraProvider>
    </ApolloProvider>
  );
};

export default appWithTranslation(MyApp, i18nextConfig);
