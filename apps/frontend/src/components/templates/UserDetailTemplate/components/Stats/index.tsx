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
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import InfiniteScroll from "react-infinite-scroll-component";
import { useCurrentUser } from "../../../../../hooks/useCurrentUser";
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
  const { currentUser } = useCurrentUser();
  const { handleFollow, getFollowState } = useFollow({ userId });
  const { t } = useTranslation("common");
  const [isInitialDataFetched, setIsInitialDataFetched] = useState(false);
  const { isOpen, onOpen, onClose: handleClose } = useDisclosure();
  const [isFollowingState, setIsFollowingState] = useState(true);
  const useFollowState = <FollowersValueType, FollowingValueType>(
    followersValue: FollowersValueType,
    followingValue: FollowingValueType
  ): FollowersValueType | FollowingValueType => (isFollowingState ? followingValue : followersValue);
  const { followers, handleMoreFollowers, mutateFollowers } = useFollowers({ userId });
  const { following, handleMoreFollowing, mutateFollowing } = useFollowing({ userId });
  const followNodes = useFollowState(followers?.nodes, following?.nodes);
  const headerTitle = useFollowState(t("followers"), t("following"));
  const text = useFollowState(t("noFollowerMessage"), t("noFollowingMessage"));
  const dataLength = useFollowState(followers?.nodes.length, following?.nodes.length) ?? 0;
  const hasMore = useFollowState(followers?.pageInfo.hasNextPage, following?.pageInfo.hasNextPage) ?? false;
  const next = useFollowState(handleMoreFollowers, handleMoreFollowing);
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (): void => {
      if (isOpen) {
        handleClose();
      }
    };
    router.events.on("routeChangeStart", handleRouteChange);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [handleClose, isOpen, router.events]);

  const handleOpenFollow = (isFollowing: boolean) => () => {
    if (currentUser) {
      setIsFollowingState(isFollowing);
      onOpen();
    } else {
      void router.push("/");
    }
  };

  useEffect(() => {
    if (!isInitialDataFetched && userId) {
      setIsInitialDataFetched(true);
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
              onClick={handleOpenFollow(false)}
            >
              {t("followersCount", { count: followersNumber })}
            </Text>
            <Text
              _hover={{
                cursor: "pointer"
              }}
              onClick={handleOpenFollow(true)}
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
              {followNodes && followNodes.length > 0 ? (
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
                  <Box w="inherit">
                    <UsersList getFollowState={getFollowState} handleFollow={handleFollow} userNodes={followNodes} />
                  </Box>
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
