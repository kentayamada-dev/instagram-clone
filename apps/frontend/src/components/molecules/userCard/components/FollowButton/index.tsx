import { type ThemingProps, Button } from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import { useState } from "react";
import type { FollowButtonType } from "./index.types";

export const FollowButton: FollowButtonType = ({ followState, handleFollow, userId = "", buttonSize = "md" }) => {
  const { t } = useTranslation("common");
  const [isFollowLoading, setIsFollowLoading] = useState(false);
  const isFollow = followState === "follow";
  const colorScheme: ThemingProps["variant"] = isFollow ? "primary" : "secondary";
  const text = isFollow ? t("follow") : t("unfollow");
  const handleButtonClick = (): void => {
    void (async (): Promise<void> => {
      setIsFollowLoading(true);
      await handleFollow({
        followInput: {
          userId
        },
        isFollowing: isFollow
      });
      setIsFollowLoading(false);
    })();
  };

  if (followState === null) {
    return null;
  }

  return (
    <Button isLoading={isFollowLoading} onClick={handleButtonClick} size={buttonSize} variant={colorScheme}>
      {text}
    </Button>
  );
};
