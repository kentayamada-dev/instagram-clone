import {
  Button,
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
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { constants } from "../../../constants";
import { useTypeSafeTranslation } from "../../../libs/next_translate";
import { ImageLink } from "../../atoms/ImageLink";
import { ImageLinkColorMode } from "../ImageLinkColorMode";
import type { HeaderDrawerType } from "./index.types";

const {
  COLORS: { SNOW, EBONY },
  LINKS: { GITHUB_LINK, APOLLO_LINK, STORYBOOK_LINK }
} = constants;

export const HeaderDrawer: HeaderDrawerType = ({
  handleCloseDrawer,
  isAuthenticated,
  isDrawerOpen
}) => {
  const router = useRouter();
  const { locale, asPath, pathname, query } = router;
  const { colorMode, toggleColorMode } = useColorMode();
  const handleColorMode = (): void => toggleColorMode();
  const { t } = useTypeSafeTranslation("common");
  const handleChangeLocale = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ): Promise<void> => {
    const localeValue = event.target.value;
    Cookies.set("NEXT_LOCALE", localeValue, { path: "/" });
    await router.push({ pathname, query }, asPath, {
      locale: localeValue
    });
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
            <Button h="50px" w="100%">
              <ImageLinkColorMode
                darkImg={githubDarkImg}
                height={30}
                href={GITHUB_LINK}
                lightImg={githubLightImg}
                width={100}
              />
            </Button>
            <Button h="50px" w="100%">
              <ImageLinkColorMode
                darkImg={apolloDarkImg}
                height={30}
                href={APOLLO_LINK}
                lightImg={apolloLightImg}
                width={100}
              />
            </Button>
            <Button h="50px" w="100%">
              <ImageLink
                alt="Storybook"
                height={30}
                href={STORYBOOK_LINK}
                src="/static/storybookLogo/logo.svg"
                width={100}
              />
            </Button>
          </VStack>
        </DrawerBody>
        {isAuthenticated ? (
          <>
            <DrawerHeader>{t("settings")}</DrawerHeader>
            <DrawerBody>
              <VStack spacing={4}>
                <FormControl>
                  <FormLabel htmlFor="color-mode">{t("darkMode")}</FormLabel>
                  <Switch
                    id="color-mode"
                    isChecked={colorMode === "dark"}
                    onChange={handleColorMode}
                    size="lg"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="locale">{t("language")}</FormLabel>
                  <Select
                    defaultValue={locale}
                    id="locale"
                    // eslint-disable-next-line @typescript-eslint/no-misused-promises
                    onChange={handleChangeLocale}
                  >
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
