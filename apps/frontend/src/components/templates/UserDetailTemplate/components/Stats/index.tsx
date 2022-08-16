import {
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Text,
  Flex,
  Center,
  Spinner,
  Box,
  Skeleton
} from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useFollowers } from "../../../../../hooks/useFollowers";
import { useFollowing } from "../../../../../hooks/useFollowing";
import { wait } from "../../../../../utils/wait";
import { UsersList } from "../../../../organisms/UsersList";
import type { StatsType } from "./index.types";

export const Stats: StatsType = ({
  followersNumber,
  followingNumber,
  postsNumber,
  justifyContent = "space-between",
  width = "100%",
  userId
}) => {
  const { t } = useTranslation("common");
  const [isInitialDataFetched, setIsInitialDataFetched] = React.useState(false);
  const { isOpen, onOpen, onClose: handleClose } = useDisclosure();
  const [isLoading, setIsLoading] = React.useState(false);
  const [followState, setFollowState] = React.useState<"followers" | "following">("following");
  const usefollowState = <T, U>(followersValue: T, followingValue: U): T | U =>
    followState === "followers" ? followersValue : followingValue;
  const { followers, loadMoreFollowers, isFollowersLoading, mutateFollowers } = useFollowers({ userId: userId ?? "" });
  const { following, loadMoreFollowing, isFollowingLoading, mutateFollowing } = useFollowing({ userId: userId ?? "" });
  const handleMoreFollowers = async (): Promise<void> => {
    if (!isLoading && !isFollowersLoading) {
      setIsLoading(true);
      await wait(2);
      await loadMoreFollowers();
      setIsLoading(false);
    }
  };

  const handleMoreFollowing = async (): Promise<void> => {
    if (!isLoading && !isFollowingLoading) {
      setIsLoading(true);
      await wait(2);
      await loadMoreFollowing();
      setIsLoading(false);
    }
  };

  const handleOpenFollowers = (): void => {
    setFollowState("followers");
    onOpen();
  };

  const handleOpenFollowing = (): void => {
    setFollowState("following");
    onOpen();
  };

  React.useEffect(() => {
    if (!isInitialDataFetched && userId) {
      setIsInitialDataFetched(true);
      // eslint-disable-next-line no-void
      void (async (): Promise<void> => {
        if (!following) {
          await mutateFollowing();
        }
        if (!followers) {
          await mutateFollowers();
        }
      })();
    }
  }, [followers, following, isInitialDataFetched, mutateFollowers, mutateFollowing, userId]);

  return (
    <>
      <Flex justifyContent={justifyContent} width={width}>
        {postsNumber !== null && followersNumber !== null && followingNumber !== null ? (
          <>
            <Text>{t("postsCount", { count: postsNumber })}</Text>
            <Text
              _hover={{
                cursor: "pointer"
              }}
              onClick={handleOpenFollowers}
            >
              {t("followersCount", { count: followersNumber })}
            </Text>
            <Text
              _hover={{
                cursor: "pointer"
              }}
              onClick={handleOpenFollowing}
            >
              {t("followingCount", { count: followingNumber })}
            </Text>
          </>
        ) : (
          <Skeleton h="25px" w="100%" />
        )}
      </Flex>
      <Modal isCentered isOpen={isOpen} onClose={handleClose} variant="usersList">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">{usefollowState(t("followers"), t("following"))}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box h="400px" id="scrollableDiv" overflowY="scroll">
              <InfiniteScroll
                dataLength={usefollowState(followers?.edges.length, following?.edges.length) ?? 0}
                hasMore={usefollowState(followers?.pageInfo.hasNextPage, following?.pageInfo.hasNextPage) ?? false}
                loader={
                  <Center key={0} pb="5" pt="5">
                    <Spinner size="lg" />
                  </Center>
                }
                next={usefollowState(handleMoreFollowers, handleMoreFollowing)}
                scrollableTarget="scrollableDiv"
              >
                <UsersList usersEdge={usefollowState(followers?.edges, following?.edges)} />
              </InfiniteScroll>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
