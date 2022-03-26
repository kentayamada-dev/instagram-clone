import { Box, useColorMode } from "@chakra-ui/react";
import Image from "next/image";
import type { ImageColorModeProps } from "./index.types";

export const ImageColorMode = ({
  height,
  width,
  darkImg,
  lightImg
}: ImageColorModeProps): JSX.Element => {
  const { colorMode } = useColorMode();

  return (
    <Box h={height} pos="relative" w={width}>
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
    </Box>
  );
};
