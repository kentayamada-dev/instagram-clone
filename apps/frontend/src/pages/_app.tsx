import { ChakraProvider, cookieStorageManagerSSR, localStorageManager } from "@chakra-ui/react";
import { appWithTranslation } from "next-i18next";
import NextNProgress from "nextjs-progressbar";
import React from "react";
import i18nextConfig from "../../next-i18next.config";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { myTheme } from "../libs/chakra";
import { SWRProvider } from "../libs/swr";
import type { MyAppType } from "../libs/next/types";

// eslint-disable-next-line @typescript-eslint/naming-convention
const MyApp: MyAppType = ({ Component, pageProps }) => {
  const { cookies } = pageProps;
  const { currentUser, mutateCurrentUser } = useCurrentUser();
  const getLayout = Component.getLayout ?? ((page): JSX.Element => page);
  const colorModeManager = cookies ? cookieStorageManagerSSR(cookies) : localStorageManager;

  React.useEffect(() => {
    // eslint-disable-next-line no-void
    void (async (): Promise<void> => {
      if (currentUser === null) {
        await mutateCurrentUser();
      }
    })();
  }, [currentUser, mutateCurrentUser]);

  return (
    <SWRProvider>
      <NextNProgress
        color="linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)"
        options={{ showSpinner: false }}
      />
      <ChakraProvider colorModeManager={colorModeManager} theme={myTheme}>
        {getLayout(<Component {...pageProps} />, pageProps)}
      </ChakraProvider>
    </SWRProvider>
  );
};

export default appWithTranslation(MyApp, i18nextConfig);
