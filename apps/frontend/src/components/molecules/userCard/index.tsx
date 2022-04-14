import { HStack, Link, Text, Skeleton } from "@chakra-ui/react";
import NextLink from "next/link";
import { StyledAvatar } from "../../atoms/StyledAvatar";
import type { UserCardType } from "./index.types";

export const UserCard: UserCardType = ({ userId, src, userName, size }) => (
  <HStack p="3" w="100%">
    <StyledAvatar alt="Avatar Image" size={size} src={src} />
    {userId && userName ? (
      <NextLink href={`/${userId}`} passHref>
        <Link>
          <Text fontWeight="bold">{userName}</Text>
        </Link>
      </NextLink>
    ) : (
      <Skeleton h="100%" w="80%" />
    )}
  </HStack>
);
