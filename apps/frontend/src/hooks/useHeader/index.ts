import { useColorMode, useDisclosure } from "@chakra-ui/react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React from "react";
import { fetcher } from "../../libs/graphql_request";
import { useLocale } from "../../libs/next_router";
import { LOGOUT_MUTATION } from "../useUser/schema";
import type { LogoutMutation } from "../../generated";
import type { UseHeaderReturnType, UseHeaderType } from "./type";

export const useHeader: UseHeaderType = () => {
  const router = useRouter();
  const { isOpen: isPostModalOpen, onOpen: handleOpenPostModal, onClose: handleClosePostModal } = useDisclosure();
  const { pathname, asPath, query } = router;
  const localeEn = useLocale("ja", "en");
  const { toggleColorMode } = useColorMode();
  const { isOpen: isDrawerOpen, onOpen, onClose } = useDisclosure();
  const handleOpenDrawer = (): void => onOpen();
  const handleCloseDrawer = React.useCallback(() => onClose(), [onClose]);
  const handleColorMode = (): void => toggleColorMode();
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  const handleChangeLocale: UseHeaderReturnType["handleChangeLocale"] = async () => {
    Cookies.set("NEXT_LOCALE", localeEn, { path: "/" });
    await router.push({ pathname, query }, asPath, {
      locale: localeEn
    });
  };
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  const handleLogout: UseHeaderReturnType["handleLogout"] = async () => {
    await fetcher<LogoutMutation>(LOGOUT_MUTATION);
    router.reload();
  };

  return {
    handleChangeLocale,
    handleCloseDrawer,
    handleClosePostModal,
    handleColorMode,
    handleLogout,
    handleOpenDrawer,
    handleOpenPostModal,
    isDrawerOpen,
    isPostModalOpen
  };
};
