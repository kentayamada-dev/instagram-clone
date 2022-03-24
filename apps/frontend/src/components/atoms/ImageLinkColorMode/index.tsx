import { Box, Link, useColorMode } from "@chakra-ui/react";
import Image from "next/image";
import NextLink from "next/link";
import type { ImageLinkColorModeProps } from "./index.types";

export const ImageLinkColorMode = ({
  height,
  href,
  width,
  darkImg,
  lightImg
}: ImageLinkColorModeProps): JSX.Element => {
  const { colorMode } = useColorMode();

  return (
    <NextLink href={href} passHref>
      <Link h={height} pos="relative" w={width}>
        <Box h="inherit" pos="absolute">
          <Image
            alt={lightImg.alt}
            height={height}
            hidden={colorMode === "light"}
            objectFit="contain"
            quality={100}
            src={lightImg.src}
            width={width}
          />
        </Box>
        <Box h="inherit" pos="absolute">
          <Image
            alt={darkImg.alt}
            height={height}
            hidden={colorMode === "dark"}
            objectFit="contain"
            quality={100}
            src={darkImg.src}
            width={width}
          />
        </Box>
      </Link>
    </NextLink>
  );
};
