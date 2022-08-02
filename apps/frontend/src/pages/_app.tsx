import { ChakraProvider, useToast } from "@chakra-ui/react";
import { appWithTranslation } from "next-i18next";
import NextNProgress from "nextjs-progressbar";
import React from "react";
import { SWRConfig } from "swr";
import i18nextConfig from "../../next-i18next.config";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { myTheme } from "../libs/chakra";
import { fetcher } from "../libs/graphql_request";
import { useLocale } from "../libs/next_router";
import type { MyAppType } from "../libs/next/types";

const TOO_MANY_REQUESTS_ERROR_ID = "tooManyRequestsError";
const TOO_MANY_REQUESTS_ERROR_MESSAGE = "ThrottlerException: Too Many Requests";

// eslint-disable-next-line @typescript-eslint/naming-convention
const MyApp: MyAppType = ({ Component, pageProps }) => {
  const { currentUser, mutateCurrentUser } = useCurrentUser();
  const getLayout = Component.getLayout ?? ((page): JSX.Element => page);
  const toast = useToast();
  const tooManyRequestsErrorMessageTitle = useLocale("Too Many Requests.", "リクエストが多すぎます。");
  const tooManyRequestsErrorMessageDescription = useLocale(
    "Please try again after some time.",
    "時間をおいてから再度お試しください。"
  );
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onError = (error: any): void => {
    const isTooManyRequestsError = error.response.errors[0].message === TOO_MANY_REQUESTS_ERROR_MESSAGE;
    if (!toast.isActive(TOO_MANY_REQUESTS_ERROR_ID) && isTooManyRequestsError) {
      toast({
        description: tooManyRequestsErrorMessageDescription,
        duration: 10000,
        id: TOO_MANY_REQUESTS_ERROR_ID,
        isClosable: true,
        position: "top",
        status: "error",
        title: tooManyRequestsErrorMessageTitle
      });
    }
  };

  React.useEffect(() => {
    // eslint-disable-next-line no-void
    void (async (): Promise<void> => {
      if (currentUser === null) {
        await mutateCurrentUser();
      }
    })();
  }, [currentUser, mutateCurrentUser]);

  return (
    <SWRConfig
      value={{
        fetcher,
        onError,
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnMount: false,
        revalidateOnReconnect: false,
        shouldRetryOnError: false
      }}
    >
      <NextNProgress
        color="linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)"
        options={{ showSpinner: false }}
      />
      {/* eslint-disable-next-line @typescript-eslint/no-unsafe-argument */}
      <ChakraProvider theme={myTheme}>{getLayout(<Component {...pageProps} />, pageProps)}</ChakraProvider>
    </SWRConfig>
  );
};

export default appWithTranslation(MyApp, i18nextConfig);
