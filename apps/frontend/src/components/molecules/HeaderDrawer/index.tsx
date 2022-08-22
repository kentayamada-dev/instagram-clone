import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  FormLabel,
  Select,
  Switch,
  useColorMode,
  useColorModeValue,
  VStack
} from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { constants } from "../../../constants";
import { changeLocale } from "../../../libs/next_router";
import { ButtonLink } from "../ButtonLink";
import { ButtonLinkColorMode } from "../ButtonLinkColorMode";
import type { LocaleType } from "../../../libs/next/types";
import type { HeaderDrawerType } from "./index.types";
import type { SelectProps } from "@chakra-ui/react";

const {
  COLORS: { SNOW, EBONY },
  LINKS: { GITHUB_LINK, APOLLO_LINK, STORYBOOK_LINK }
} = constants;

export const HeaderDrawer: HeaderDrawerType = ({ handleCloseDrawer, isAuthenticated, isDrawerOpen }) => {
  const router = useRouter();
  const { locale } = router;
  const { colorMode, toggleColorMode } = useColorMode();
  const handleColorMode = (): void => toggleColorMode();
  const { t } = useTranslation("common");
  const handleChangeLocale: SelectProps["onChange"] = (event) => {
    const localeValue = event.target.value as LocaleType;
    changeLocale(router, localeValue);
  };
  const githubDarkImg = {
    alt: "Github Text Dark",
    src: "/static/github/text_dark.svg"
  };

  const githubLightImg = {
    alt: "Github Text Light",
    src: "/static/github/text_light.svg"
  };

  const apolloDarkImg = {
    alt: "Apollo Text Dark",
    src: "/static/apollo/text_dark.svg"
  };

  const apolloLightImg = {
    alt: "Apollo Text Light",
    src: "/static/apollo/text_light.svg"
  };
  const bgColor = useColorModeValue(SNOW, EBONY);

  return (
    <Drawer isOpen={isDrawerOpen} onClose={handleCloseDrawer}>
      <DrawerOverlay />
      <DrawerContent bgColor={bgColor}>
        <DrawerCloseButton />
        <DrawerHeader>{t("links")}</DrawerHeader>
        <DrawerBody>
          <VStack spacing={4}>
            <ButtonLinkColorMode
              darkImg={githubDarkImg}
              height={50}
              href={GITHUB_LINK}
              isExternal
              lightImg={githubLightImg}
              width={250}
            />
            <ButtonLinkColorMode
              darkImg={apolloDarkImg}
              height={50}
              href={APOLLO_LINK}
              isExternal
              lightImg={apolloLightImg}
              width={250}
            />
            <ButtonLink
              alt="Storybook"
              height={50}
              href={STORYBOOK_LINK}
              isExternal
              src="/static/storybookLogo/logo.svg"
              width={250}
            />
          </VStack>
        </DrawerBody>
        {isAuthenticated ? (
          <>
            <DrawerHeader>{t("settings")}</DrawerHeader>
            <DrawerBody>
              <VStack spacing={4}>
                <FormControl>
                  <FormLabel htmlFor="color-mode">{t("darkMode")}</FormLabel>
                  <Switch id="color-mode" isChecked={colorMode === "dark"} onChange={handleColorMode} size="lg" />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="locale">{t("language")}</FormLabel>
                  <Select defaultValue={locale} id="locale" onChange={handleChangeLocale}>
                    <option value="ja">日本語</option>
                    <option value="en">English</option>
                  </Select>
                </FormControl>
              </VStack>
            </DrawerBody>
          </>
        ) : null}
      </DrawerContent>
    </Drawer>
  );
};
