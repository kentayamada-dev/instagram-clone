import { HStack, Skeleton } from "@chakra-ui/react";
import { StyledAvatar } from "../../atoms/StyledAvatar";
import { TextLink } from "../../atoms/TextLink";
import type { UserCardType } from "./index.types";

export const UserCard: UserCardType = ({ userId, src, userName, size, isVisibleUnderline }) => (
  <HStack p="3" w="100%">
    <StyledAvatar alt="Avatar Image" size={size} src={src} />
    {userId && userName ? (
      <TextLink fontWeight="semibold" href={`/${userId}`} isVisibleUnderline={isVisibleUnderline} text={userName} />
    ) : (
      <Skeleton h="100%" w="80%" />
    )}
  </HStack>
);
