import { Flex, VStack, Text, Divider, Center } from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import { constants } from "../../../constants";
import { ImageLink } from "../../atoms/ImageLink";
import { TextLink } from "../../atoms/TextLink";
import { ImageLinkColorMode } from "../../molecules/ImageLinkColorMode";
import type { FooterType } from "./index.types";

const {
  COLORS: { DODGER_BLUE }
} = constants;

export const Footer: FooterType = () => {
  const { t } = useTranslation("footer");
  const darkImg = {
    alt: "Vercel Logo Dark",
    src: "/static/vercel/logo_dark.png"
  };

  const lightImg = {
    alt: "Vercel Logo Light",
    src: "/static/vercel/logo_light.png"
  };

  return (
    <VStack h="inherit" justify="space-around" overflow="hidden" spacing={0} w="100%">
      <Divider w="80%" />
      <Flex justify="space-around" w="100%">
        <VStack>
          <Text fontSize="xs">{t("support")}</Text>
          <Center>
            <TextLink
              fontSize="xx-small"
              fontWeight="semibold"
              href="mailto:user@support@instagram-clone.net"
              text="support@instagram-clone.net"
              textColor={DODGER_BLUE}
            />
          </Center>
        </VStack>
        <VStack>
          <Text fontSize="xs">{t("reference")}</Text>
          <ImageLink
            alt="Instagram Text"
            height={25}
            href="https://www.instagram.com/"
            src="/static/instagram/text.svg"
            width={90}
          />
        </VStack>
        <VStack>
          <Text fontSize="xs">{t("hosting")}</Text>
          <ImageLinkColorMode
            darkImg={darkImg}
            height={25}
            href="https://vercel.com/"
            isExternal
            lightImg={lightImg}
            width={90}
          />
        </VStack>
      </Flex>
    </VStack>
  );
};
