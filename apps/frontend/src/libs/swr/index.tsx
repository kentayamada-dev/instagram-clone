import { useToast } from "@chakra-ui/react";
import { SWRConfig } from "swr";
import { fetcher } from "../graphql_request";
import { useLocale } from "../next_router";
import type { SWRProviderType } from "./types";

const TOO_MANY_REQUESTS_ERROR_ID = "tooManyRequestsError";
const TOO_MANY_REQUESTS_ERROR_MESSAGE = "ThrottlerException: Too Many Requests";

export const SWRProvider: SWRProviderType = ({ children }) => {
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
      {children}
    </SWRConfig>
  );
};
