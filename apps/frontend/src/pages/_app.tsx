import { ChakraProvider } from "@chakra-ui/react";
import { appWithTranslation } from "next-i18next";
import NextNProgress from "nextjs-progressbar";
import { useEffect } from "react";
import i18nextConfig from "../../next-i18next.config";
import { GaTags } from "../components/misc/GaTags";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { theme } from "../lib/chakra";
import { SWRProvider } from "../lib/swr";
import type { MyAppType } from "../lib/next/types";
import "@fontsource/noto-sans-jp";

// eslint-disable-next-line @typescript-eslint/naming-convention
const MyApp: MyAppType = ({ Component, pageProps }) => {
  const { currentUser, mutateCurrentUser } = useCurrentUser();
  const getLayout = Component.getLayout ?? ((page): JSX.Element => page);

  useEffect(() => {
    void (async (): Promise<void> => {
      if (currentUser === null) {
        await mutateCurrentUser();
      }
    })();
  }, [currentUser, mutateCurrentUser]);

  return (
    <>
      {/* Google Analytics */}
      <GaTags />
      <NextNProgress
        color="linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)"
        options={{ showSpinner: false }}
      />
      <SWRProvider>
        {/* @ts-expect-error unknown type error */}
        <ChakraProvider theme={theme}>{getLayout(<Component {...pageProps} />, pageProps)}</ChakraProvider>
      </SWRProvider>
    </>
  );
};

export default appWithTranslation(MyApp, i18nextConfig);
