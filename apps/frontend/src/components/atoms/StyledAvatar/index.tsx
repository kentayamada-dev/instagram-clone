import { Box, Skeleton } from "@chakra-ui/react";
import Image from "next/image";
import type { StyledAvatarType } from "./index.types";

export const StyledAvatar: StyledAvatarType = ({ size, src, alt }) => (
  <Box borderRadius="full" h={`${size}px`} overflow="hidden" pos="relative" w={`${size}px`}>
    {src ? <Image alt={alt} layout="fill" objectFit="cover" quality={100} src={src} /> : <Skeleton h="100%" w="100%" />}
  </Box>
);
