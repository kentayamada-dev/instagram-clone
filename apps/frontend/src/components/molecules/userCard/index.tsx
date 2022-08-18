import { Button, HStack, Skeleton, VStack, Text } from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import React from "react";
import { constants } from "../../../constants";
import { StyledAvatar } from "../../atoms/StyledAvatar";
import { TextLink } from "../../atoms/TextLink";
import type { UserCardType } from "./index.types";
import type { ThemingProps } from "@chakra-ui/react";

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
  // eslint-disable-next-line react/no-unstable-nested-components, react/no-multi-comp
  const FollowButton = (): JSX.Element | null => {
    const [isFollowLoading, setIsFollowLoading] = React.useState(false);
    const { t } = useTranslation("common");
    if (userId && getFollowState) {
      const followState = getFollowState(userId);
      if (followState) {
        const isFollow = getFollowState(userId) === "follow";
        const text = isFollow ? t("follow") : t("unfollow");
        const handleButtonClick = async (): Promise<void> => {
          setIsFollowLoading(true);
          await handleFollow({
            followInput: {
              userId
            },
            isFollowing: isFollow
          });
          setIsFollowLoading(false);
        };

        const colorScheme: ThemingProps["variant"] = isFollow ? "primary" : "secondary";

        return (
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          <Button isLoading={isFollowLoading} onClick={handleButtonClick} variant={colorScheme}>
            {text}
          </Button>
        );
      }
    }

    return null;
  };

  return (
    <HStack justify="space-between" p={3}>
      <HStack spacing={3}>
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
      <FollowButton />
    </HStack>
  );
};
