import { Box, useColorMode } from "@chakra-ui/react";
import Image from "next/image";
import type { ImageColorModeType } from "./index.types";

export const ImageColorMode: ImageColorModeType = ({
  height,
  width,
  darkImg,
  lightImg
}) => {
  const { colorMode } = useColorMode();

  return (
    <Box h={height} pos="relative" w={width}>
      <Box
        alignItems="center"
        display="flex"
        h="inherit"
        justifyContent="center"
        pos="absolute"
      >
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
      <Box
        alignItems="center"
        display="flex"
        h="inherit"
        justifyContent="center"
        pos="absolute"
      >
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
