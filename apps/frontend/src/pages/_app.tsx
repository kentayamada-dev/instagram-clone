import { ChakraProvider } from "@chakra-ui/react";
import { customizedTheme } from "../libs/chakra";
import type { NextPage } from "next";
import type { AppProps } from "next/app";

// eslint-disable-next-line @typescript-eslint/ban-types
export type NextPageWithLayout<T = {}> = NextPage<T> & {
  getLayout?: (page: JSX.Element) => JSX.Element;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const MyApp = ({ Component, pageProps }: AppPropsWithLayout): JSX.Element => {
  const getLayout = Component.getLayout ?? ((page): JSX.Element => page);

  return (
    <ChakraProvider theme={customizedTheme}>
      {getLayout(<Component {...pageProps} />)}
    </ChakraProvider>
  );
};

export default MyApp;
