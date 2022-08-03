import { useToast } from "@chakra-ui/react";
import { SWRConfig } from "swr";
import { fetcher } from "../graphql_request";
import { useLocale } from "../next_router";
import type { SWRProviderType } from "./types";

const ERROR_TOAST_ID = "ERROR_TOAST_ID";
const USER_NOT_FOUND_ERROR_MESSAGE = "User not found";

export const SWRProvider: SWRProviderType = ({ children }) => {
  const toast = useToast();
  const errorMessageTitle = useLocale("An unexpected error has occurred.", "予期せぬエラーが発生しました。");
  const errorMessageDescription = useLocale(
    "Please try again after some time.",
    "時間をおいてから再度お試しください。"
  );
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onError = (error: any): void => {
    const isUserNotFound = error.response.errors[0].message === USER_NOT_FOUND_ERROR_MESSAGE;
    if (!toast.isActive(ERROR_TOAST_ID) && !isUserNotFound) {
      toast({
        description: errorMessageDescription,
        duration: 10000,
        id: ERROR_TOAST_ID,
        isClosable: true,
        position: "top",
        status: "error",
        title: errorMessageTitle
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
