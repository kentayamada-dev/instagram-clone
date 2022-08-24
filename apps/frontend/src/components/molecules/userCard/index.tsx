import { HStack, Skeleton, VStack, Text, Box, Flex } from "@chakra-ui/react";
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
  width = "inherit",
  getFollowState,
  userId,
  src,
  userName,
  size = 35,
  shouldUserNameHidden = false,
  isLink = true,
  handleFollow,
  buttonSize
}) => {
  const followState: FollowStateType = getFollowState ? getFollowState(userId) : null;
  // eslint-disable-next-line no-undefined
  const isFollowButtonVisible = userId !== undefined && handleFollow !== undefined;

  return (
    <HStack justify="space-between" w={width}>
      <HStack spacing={3} w="inherit">
        <StyledAvatar alt="Avatar Image" size={size} src={src} />
        {userId && userName ? (
          <Box w={isFollowButtonVisible ? "45%" : "inherit"}>
            <VStack align="flex-start" spacing={0} w="100%">
              {isLink ? (
                <TextLink fontWeight="semibold" href={`/${userId}`} text={userId} />
              ) : (
                <Text noOfLines={1}>{userId}</Text>
              )}
              {!shouldUserNameHidden && (
                <Text color={SUVA_GREY} fontSize="xs" noOfLines={1}>
                  {userName}
                </Text>
              )}
            </VStack>
          </Box>
        ) : (
          <Skeleton h="30px" w="100%" />
        )}
        {isFollowButtonVisible ? (
          <Flex justify="flex-end" w="inherit">
            <FollowButton
              buttonSize={buttonSize}
              followState={followState}
              handleFollow={handleFollow}
              userId={userId}
            />
          </Flex>
        ) : null}
      </HStack>
    </HStack>
  );
};
