import { Flex, VStack, Text, Divider, Center } from "@chakra-ui/react";
import React from "react";
import { ImageLink } from "../../atoms/ImageLink";
import { ImageLinkColorMode } from "../../molecules/ImageLinkColorMode";
import type { FooterType } from "./index.types";

export const Footer: FooterType = () => {
  const darkImg = React.useMemo(
    () => ({
      alt: "Vercel Logo Dark",
      src: "/static/vercel/logo_dark.png"
    }),
    []
  );

  const lightImg = React.useMemo(
    () => ({
      alt: "Vercel Logo Light",
      src: "/static/vercel/logo_light.png"
    }),
    []
  );

  return (
    <VStack justify="space-around" minH="10vh" w="100%">
      <Divider w="80%" />
      <Flex justify="space-around" w="100%">
        <VStack>
          <Text fontSize="xs">Created by</Text>
          <Center>
            <Text fontSize="md" fontWeight="extrabold">
              Kenta Yamada
            </Text>
          </Center>
        </VStack>
        <VStack>
          <Text fontSize="xs">Referenced to</Text>
          <ImageLink
            alt="Instagram"
            height={25}
            href="https://www.instagram.com/"
            src="/static/instagram/text.svg"
            width={90}
          />
        </VStack>
        <VStack>
          <Text fontSize="xs">Hosting by</Text>
          <ImageLinkColorMode
            darkImg={darkImg}
            height={25}
            href="https://vercel.com/"
            lightImg={lightImg}
            width={90}
          />
        </VStack>
      </Flex>
    </VStack>
  );
};
