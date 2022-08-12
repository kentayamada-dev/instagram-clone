import { HStack, Skeleton, Text, VStack } from "@chakra-ui/react";
import { constants } from "../../../constants";
import { StyledAvatar } from "../../atoms/StyledAvatar";
import { TextLink } from "../../atoms/TextLink";
import type { UserCardType } from "./index.types";

const {
  COLORS: { SUVA_GREY }
} = constants;

export const UserCard: UserCardType = ({ userId, src, userName, size, shouldUserNameHidden = false }) => (
  <HStack p="3" w="100%">
    <StyledAvatar alt="Avatar Image" size={size} src={src} />
    {userId && userName ? (
      <VStack align="flex-start" spacing={0}>
        <TextLink fontWeight="semibold" href={`/${userId}`} text={userId} />
        {!shouldUserNameHidden && (
          <Text color={SUVA_GREY} fontSize="xs">
            {userName}
          </Text>
        )}
      </VStack>
    ) : (
      <Skeleton h="100%" w="80%" />
    )}
  </HStack>
);
