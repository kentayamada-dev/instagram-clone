import { useColorMode, useDisclosure } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { setCookie } from "nookies";
import React from "react";
import { constants } from "../../constants";
import { useLocale } from "../../libs/next_router";
import type { UseHeaderType } from "./type";

const {
  LINKS: { STORYBOOK_LINK, GITHUB_LINK, APOLLO_LINK }
} = constants;

export const useHeader: UseHeaderType = () => {
  const router = useRouter();
  const { pathname, asPath, query } = router;
  const localeEn = useLocale("ja", "en");
  const { toggleColorMode } = useColorMode();
  const { isOpen: isDrawerOpen, onOpen, onClose } = useDisclosure();
  const handleOpenDrawer = (): void => onOpen();
  const handleCloseDrawer = React.useCallback(() => onClose(), [onClose]);
  const handleOpenStorybook = async (): Promise<boolean> =>
    router.push(STORYBOOK_LINK);
  const handleOpenGithub = async (): Promise<boolean> =>
    router.push(GITHUB_LINK);
  const handleOpenApolloGraphQL = async (): Promise<boolean> =>
    router.push(APOLLO_LINK);
  const handleColorMode = (): void => toggleColorMode();
  const handleChangeLocale = async (): Promise<void> => {
    setCookie(null, "NEXT_LOCALE", localeEn, {
      path: "/"
    });
    await router.push({ pathname, query }, asPath, {
      locale: localeEn
    });
  };

  return {
    handleChangeLocale,
    handleCloseDrawer,
    handleColorMode,
    handleOpenApolloGraphQL,
    handleOpenDrawer,
    handleOpenGithub,
    handleOpenStorybook,
    isDrawerOpen
  };
};
