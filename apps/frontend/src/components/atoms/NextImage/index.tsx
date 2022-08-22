import { Box } from "@chakra-ui/react";
import Image from "next/image";
import type { NextImageType } from "./index.types";

export const NextImage: NextImageType = ({ src, alt, width = "inherit", height = "inherit" }) => (
  <Box h={height} pos="relative" w={width}>
    <Image alt={alt} layout="fill" objectFit="contain" quality={100} src={src} />
  </Box>
);
