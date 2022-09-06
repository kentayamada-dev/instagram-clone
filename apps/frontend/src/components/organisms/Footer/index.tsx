import { Flex, VStack, Text, Divider, Link } from "@chakra-ui/react";
import { constants } from "../../../constants";
import { useLocale } from "../../../lib/next_router";
import { ImageLink } from "../../atoms/ImageLink";
import { ImageLinkColorMode } from "../../molecules/ImageLinkColorMode";
import type { FooterType } from "./index.types";

const {
  COLORS: { DODGER_BLUE, SUVA_GREY }
} = constants;

export const Footer: FooterType = () => {
  const support = useLocale("Support", "サポート");
  const reference = useLocale("Reference", "参考");
  const hosting = useLocale("Hosting", "ホスティング");
  const darkImg = {
    alt: "Vercel Logo Dark",
    src: "/static/vercel/logo_dark.png"
  };

  const lightImg = {
    alt: "Vercel Logo Light",
    src: "/static/vercel/logo_light.png"
  };

  return (
    <VStack justify="space-around" minH="inherit" overflow="hidden" spacing={0} w="100%">
      <Divider borderColor={SUVA_GREY} w="80%" />
      <Flex justify="space-around" w="100%">
        <VStack spacing={1}>
          <Text fontSize="xs">{support}</Text>
          <Link
            _hover={{
              textDecoration: "none"
            }}
            color={DODGER_BLUE}
            fontSize="xx-small"
            fontWeight="semibold"
            href="mailto:user@support@instagram-clone.net"
          >
            support@instagram-clone.net
          </Link>
        </VStack>
        <VStack spacing={1}>
          <Text fontSize="xs">{reference}</Text>
          <ImageLink
            alt="Instagram Text"
            height={23}
            href="https://www.instagram.com/"
            isExternal
            src="/static/instagram/text.svg"
            width={85}
          />
        </VStack>
        <VStack spacing={1}>
          <Text fontSize="xs">{hosting}</Text>
          <ImageLinkColorMode
            darkImg={darkImg}
            height={23}
            href="https://vercel.com/"
            isExternal
            lightImg={lightImg}
            width={85}
          />
        </VStack>
      </Flex>
    </VStack>
  );
};
