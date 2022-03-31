import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useColorModeValue,
  VStack
} from "@chakra-ui/react";
import React from "react";
import { CONSTANTS } from "../../../constants";
import { useTypeSafeTranslation } from "../../../libs/next_translate";
import { ImageLink } from "../../atoms/ImageLink";
import { ImageLinkColorMode } from "../ImageLinkColorMode";
import type { HeaderDrawerProps } from "./index.types";

const {
  COLORS: { SNOW, EBONY },
  LINKS: { GITHUB_LINK, APOLLO_LINK, STORYBOOK_LINK }
} = CONSTANTS;

const HeaderDrawer = ({
  isOpen,
  handleClose
}: HeaderDrawerProps): JSX.Element => {
  const { t } = useTypeSafeTranslation("common");
  const githubDarkImg = React.useMemo(
    () => ({
      alt: "Github Text Dark",
      src: "/static/github/text_dark.svg"
    }),
    []
  );

  const githubLightImg = React.useMemo(
    () => ({
      alt: "Github Text Light",
      src: "/static/github/text_light.svg"
    }),
    []
  );

  const apolloDarkImg = React.useMemo(
    () => ({
      alt: "Apollo Text Dark",
      src: "/static/apollo/text_dark.svg"
    }),
    []
  );

  const apolloLightImg = React.useMemo(
    () => ({
      alt: "Apollo Text Light",
      src: "/static/apollo/text_light.svg"
    }),
    []
  );
  const bgColor = useColorModeValue(SNOW, EBONY);

  return (
    <Drawer isOpen={isOpen} onClose={handleClose}>
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
      </DrawerContent>
    </Drawer>
  );
};

export const MemorizedHeaderDrawer = React.memo(HeaderDrawer);
