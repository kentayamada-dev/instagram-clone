import { useColorMode, useDisclosure } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { fetcher } from "../../lib/graphql_request";
import { changeLocale, useLocale } from "../../lib/next_router";
import { LOGOUT_MUTATION } from "../useUser/schema";
import type { LogoutMutation } from "../../generated";
import type { UseHeaderReturnType, UseHeaderType } from "./type";

export const useHeader: UseHeaderType = () => {
  const router = useRouter();
  const { isOpen: isPostModalOpen, onOpen: handleOpenPostModal, onClose: handleClosePostModal } = useDisclosure();
  const localeEn = useLocale("ja", "en");
  const { toggleColorMode } = useColorMode();
  const { isOpen: isDrawerOpen, onOpen, onClose } = useDisclosure();
  const handleOpenDrawer = (): void => onOpen();
  const handleCloseDrawer = useCallback(() => onClose(), [onClose]);
  const handleColorMode = (): void => toggleColorMode();
  const handleChangeLocale: UseHeaderReturnType["handleChangeLocale"] = () => changeLocale(router, localeEn);
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
