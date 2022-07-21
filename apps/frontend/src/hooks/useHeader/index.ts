import { useColorMode, useDisclosure } from "@chakra-ui/react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React from "react";
import { useLocale } from "../../libs/next_router";
import { useLogoutMutation } from "../../types/generated/types";
import type { UseHeaderType } from "./type";

export const useHeader: UseHeaderType = () => {
  const router = useRouter();
  const { isOpen: isPostModalOpen, onOpen: handleOpenPostModal, onClose: handleClosePostModal } = useDisclosure();
  const { pathname, asPath, query } = router;
  const localeEn = useLocale("ja", "en");
  const { toggleColorMode } = useColorMode();
  const { isOpen: isDrawerOpen, onOpen, onClose } = useDisclosure();
  const [logout] = useLogoutMutation();
  const handleOpenDrawer = (): void => onOpen();
  const handleCloseDrawer = React.useCallback(() => onClose(), [onClose]);
  const handleColorMode = (): void => toggleColorMode();
  const handleChangeLocale = async (): Promise<void> => {
    Cookies.set("NEXT_LOCALE", localeEn, { path: "/" });
    await router.push({ pathname, query }, asPath, {
      locale: localeEn
    });
  };
  const handleLogout = async (): Promise<void> => {
    await logout({
      onCompleted: () => router.reload()
    });
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
