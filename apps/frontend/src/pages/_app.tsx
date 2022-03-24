import { ChakraProvider } from "@chakra-ui/react";
import { appWithTranslation } from "next-i18next";
import { Layout } from "../components/organisms/Layout";
import { customizedTheme } from "../libs/chakra";
import type { AppProps } from "next/app";

// eslint-disable-next-line @typescript-eslint/naming-convention
const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => (
  <ChakraProvider theme={customizedTheme}>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </ChakraProvider>
);

export default appWithTranslation(MyApp);
