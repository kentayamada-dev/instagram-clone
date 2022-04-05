import { ChakraProvider } from "@chakra-ui/react";
import { customizedTheme } from "../libs/chakra";
import type { MyAppType } from "../types/pages";

// eslint-disable-next-line @typescript-eslint/naming-convention
const MyApp: MyAppType = ({ Component, pageProps }) => {
  const getLayout = Component.getLayout ?? ((page): JSX.Element => page);

  return (
    <ChakraProvider theme={customizedTheme}>
      {getLayout(<Component {...pageProps} />)}
    </ChakraProvider>
  );
};

export default MyApp;
