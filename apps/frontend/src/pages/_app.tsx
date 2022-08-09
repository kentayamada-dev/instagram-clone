import { ChakraProvider } from "@chakra-ui/react";
import { appWithTranslation } from "next-i18next";
import { useRouter } from "next/router";
import Script from "next/script";
import NextNProgress from "nextjs-progressbar";
import React from "react";
import i18nextConfig from "../../next-i18next.config";
import { constants } from "../constants";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { myTheme } from "../libs/chakra";
import { SWRProvider } from "../libs/swr";
import type { MyAppType } from "../libs/next/types";

import "@fontsource/noto-sans-jp";

const { GA_TRACKING_ID } = constants;

// eslint-disable-next-line @typescript-eslint/naming-convention
const MyApp: MyAppType = ({ Component, pageProps }) => {
  const { currentUser, mutateCurrentUser } = useCurrentUser();
  const getLayout = Component.getLayout ?? ((page): JSX.Element => page);
  const router = useRouter();

  React.useEffect(() => {
    if (!GA_TRACKING_ID) {
      return;
    }
    const handleRouteChange = (url: string): void => {
      window.gtag("config", GA_TRACKING_ID, {
        // eslint-disable-next-line @typescript-eslint/naming-convention, camelcase
        page_path: url
      });
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    router.events.on("hashChangeComplete", handleRouteChange);

    // eslint-disable-next-line consistent-return
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
      router.events.off("hashChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  React.useEffect(() => {
    // eslint-disable-next-line no-void
    void (async (): Promise<void> => {
      if (currentUser === null) {
        await mutateCurrentUser();
      }
    })();
  }, [currentUser, mutateCurrentUser]);

  return (
    <>
      {/* Google Analytics */}
      {GA_TRACKING_ID ? (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`} strategy="afterInteractive" />
          <Script
            dangerouslySetInnerHTML={{
              // eslint-disable-next-line @typescript-eslint/naming-convention
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `
            }}
            id="gtag-init"
            strategy="afterInteractive"
          />
        </>
      ) : null}
      <NextNProgress
        color="linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)"
        options={{ showSpinner: false }}
      />
      <SWRProvider>
        <ChakraProvider theme={myTheme}>{getLayout(<Component {...pageProps} />, pageProps)}</ChakraProvider>
      </SWRProvider>
    </>
  );
};

export default appWithTranslation(MyApp, i18nextConfig);
