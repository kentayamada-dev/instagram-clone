import { Flex, VStack, Text, Divider, Box } from "@chakra-ui/react";
import React from "react";
import { ImageLink } from "../../atoms/ImageLink";
import { ImageLinkColorMode } from "../../molecules/ImageLinkColorMode";

export const Footer = (): JSX.Element => {
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
    <Box minH="8vh" w="100%">
      <Divider m="0 auto" width="80%" />
      <Flex align="center" justify="space-around">
        <VStack>
          <Text fontSize="xs">Created by</Text>
          <Text fontSize="md" fontWeight="extrabold">
            Kenta Yamada
          </Text>
        </VStack>
        <VStack>
          <Text fontSize="xs">Referenced to</Text>
          <ImageLink
            alt="Instagram"
            height={30}
            href="https://www.instagram.com/"
            src="/static/instagram/text.svg"
            width={100}
          />
        </VStack>
        <VStack>
          <Text fontSize="xs">Hosting by</Text>
          <ImageLinkColorMode
            darkImg={darkImg}
            height={30}
            href="https://vercel.com/"
            lightImg={lightImg}
            width={100}
          />
        </VStack>
      </Flex>
    </Box>
  );
};
