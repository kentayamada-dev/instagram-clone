import { Box, Skeleton } from "@chakra-ui/react";
import NextImage from "next/image";
import type { StyledAvatarType } from "./index.types";

export const StyledAvatar: StyledAvatarType = ({ size, src, alt }) => (
  <Box borderRadius="full" minH={`${size}px`} minW={`${size}px`} overflow="hidden" pos="relative">
    {src ? (
      <NextImage alt={alt} layout="fill" objectFit="cover" quality={100} src={src} />
    ) : (
      <Skeleton minH={`${size}px`} minW={`${size}px`} />
    )}
  </Box>
);
