import { HStack, Skeleton, VStack, Text, Box, Flex, Center } from "@chakra-ui/react";
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
  const isAvatarLarge = size === 50;
  let styledAvatarWrapperSize = "16%";
  let userIdNameWrapperSize = "84%";
  // eslint-disable-next-line no-undefined
  const isFollowButtonVisible = userId !== undefined && handleFollow !== undefined;
  if (isAvatarLarge) {
    styledAvatarWrapperSize = "20%";
    userIdNameWrapperSize = "80%";
  } else if (isFollowButtonVisible) {
    userIdNameWrapperSize = "44%";
  }

  return (
    <HStack justify="space-between" w={width}>
      <HStack spacing={0} w="inherit">
        <Flex w={styledAvatarWrapperSize}>
          <StyledAvatar alt="Avatar Image" size={size} src={src} />
        </Flex>
        <Box w={userIdNameWrapperSize}>
          {userId && userName ? (
            <VStack align="flex-start" spacing={0} w="fit-content">
              {isLink ? (
                <TextLink fontWeight="semibold" href={`/${userId}`} text={userId} />
              ) : (
                <Text noOfLines={1} w="inherit">
                  {userId}
                </Text>
              )}
              {!shouldUserNameHidden && (
                <Text color={SUVA_GREY} fontSize="xs">
                  {userName}
                </Text>
              )}
            </VStack>
          ) : (
            <Skeleton h="30px" w="inherit" />
          )}
        </Box>
        {isFollowButtonVisible ? (
          <Center w="40%">
            <FollowButton
              buttonSize={buttonSize}
              followState={followState}
              handleFollow={handleFollow}
              userId={userId}
            />
          </Center>
        ) : null}
      </HStack>
    </HStack>
  );
};
