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
  Skeleton,
  VStack
} from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import React from "react";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import InfiniteScroll from "react-infinite-scroll-component";
import { useFollow } from "../../../../../hooks/useFollow";
import { useFollowers } from "../../../../../hooks/useFollowers";
import { useFollowing } from "../../../../../hooks/useFollowing";
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
  const { handleFollow, getFollowState } = useFollow({ userId });
  const { t } = useTranslation("common");
  const [isInitialDataFetched, setIsInitialDataFetched] = React.useState(false);
  const { isOpen, onOpen, onClose: handleClose } = useDisclosure();
  const [isFollowing, setIsFollowing] = React.useState(true);
  const useFollowState = <T, U>(followersValue: T, followingValue: U): T | U =>
    isFollowing ? followingValue : followersValue;
  const { followers, handleMoreFollowers, mutateFollowers } = useFollowers({ userId });
  const { following, handleMoreFollowing, mutateFollowing } = useFollowing({ userId: userId ?? "" });
  const usersEdge = useFollowState(followers?.edges, following?.edges);
  const headerTitle = useFollowState(t("followers"), t("following"));
  const text = useFollowState(t("noFollowerMessage"), t("noFollowingMessage"));
  const dataLength = useFollowState(followers?.edges.length, following?.edges.length) ?? 0;
  const hasMore = useFollowState(followers?.pageInfo.hasNextPage, following?.pageInfo.hasNextPage) ?? false;
  const next = useFollowState(handleMoreFollowers, handleMoreFollowing);
  const handleOpenFollowers = (): void => {
    setIsFollowing(false);
    onOpen();
  };

  const handleOpenFollowing = (): void => {
    setIsFollowing(true);
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
          <ModalHeader textAlign="center">{headerTitle}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box h="400px" id="scrollableDiv" overflowY="auto">
              {usersEdge && usersEdge.length > 0 ? (
                <InfiniteScroll
                  dataLength={dataLength}
                  hasMore={hasMore}
                  loader={
                    <Center key={0} pb="5" pt="5">
                      <Spinner size="lg" />
                    </Center>
                  }
                  next={next}
                  scrollableTarget="scrollableDiv"
                >
                  <UsersList
                    getFollowState={getFollowState}
                    handleFollow={handleFollow}
                    isLink={false}
                    usersEdge={usersEdge}
                  />
                </InfiniteScroll>
              ) : (
                <VStack h="100%" pt="10">
                  <AiOutlineUsergroupAdd size={200} />
                  <Text>{text}</Text>
                </VStack>
              )}
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};