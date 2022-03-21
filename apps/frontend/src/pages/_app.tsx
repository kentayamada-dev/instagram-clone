import { ChakraProvider } from "@chakra-ui/react";
import { appWithTranslation } from "next-i18next";
import React from "react";
import { Layout } from "../components/templates/Layout";
import { customizedTheme } from "../libs/chakra";
import type { AppProps } from "next/app";

// eslint-disable-next-line @typescript-eslint/naming-convention
const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  const [query, setQuery] = React.useState("");
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => setQuery(event.target.value);

  return (
    <ChakraProvider theme={customizedTheme}>
      <Layout handleInputChange={handleInputChange} inputValue={query}>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
};

export default appWithTranslation(MyApp);
