import { Box, useColorMode } from "@chakra-ui/react";
import { NextImage } from "../NextImage";
import type { ImageColorModeType } from "./index.types";

export const ImageColorMode: ImageColorModeType = ({ darkImg, lightImg, width = "inherit", height = "inherit" }) => {
  const { colorMode } = useColorMode();

  return (
    <>
      <Box h={height} hidden={colorMode === "light"} w={width}>
        <NextImage alt={lightImg.alt} src={lightImg.src} />
      </Box>
      <Box h={height} hidden={colorMode === "dark"} w={width}>
        <NextImage alt={darkImg.alt} src={darkImg.src} />
      </Box>
    </>
  );
};
