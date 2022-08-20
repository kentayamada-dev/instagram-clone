import { HStack, Skeleton, VStack, Text } from "@chakra-ui/react";
import { constants } from "../../../constants";
import { StyledAvatar } from "../../atoms/StyledAvatar";
import { TextLink } from "../../atoms/TextLink";
import { FollowButton } from "./components/FollowButton";
import type { FollowStateType } from "../../../hooks/useFollow/type";
import type { UserCardType } from "./index.types";

const {
  COLORS: { SUVA_GREY }
} = constants;

export const UserCard: UserCardType = ({
  getFollowState,
  userId,
  src,
  userName,
  size,
  shouldUserNameHidden = false,
  isLink = true,
  handleFollow
}) => {
  const followState: FollowStateType = getFollowState ? getFollowState(userId) : null;

  return (
    <HStack justify="space-between" p={3}>
      <HStack spacing={5}>
        <StyledAvatar alt="Avatar Image" size={size} src={src} />
        {userId && userName ? (
          <VStack align="flex-start" spacing={0}>
            {isLink ? <TextLink fontWeight="semibold" href={`/${userId}`} text={userId} /> : <Text>{userId}</Text>}
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
      {userId && followState && handleFollow ? (
        <FollowButton followState={followState} handleFollow={handleFollow} userId={userId} />
      ) : null}
    </HStack>
  );
};
