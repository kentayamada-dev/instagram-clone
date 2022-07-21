import { ApolloProvider } from "@apollo/client";
import { ChakraProvider } from "@chakra-ui/react";
import { appWithTranslation } from "next-i18next";
import NextNProgress from "nextjs-progressbar";
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
      <NextNProgress
        color="linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)"
        options={{ showSpinner: false }}
      />
      {/* eslint-disable-next-line @typescript-eslint/no-unsafe-argument */}
      <ChakraProvider theme={myTheme}>{getLayout(<Component {...pageProps} />, pageProps)}</ChakraProvider>
    </ApolloProvider>
  );
};

export default appWithTranslation(MyApp, i18nextConfig);
