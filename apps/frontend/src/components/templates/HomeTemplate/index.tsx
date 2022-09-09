import { Center, Spinner, Box, Text, HStack } from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useFollow } from "../../../hooks/useFollow";
import { usePosts } from "../../../hooks/usePosts";
import { useUsers } from "../../../hooks/useUsers";
import { UserCard } from "../../molecules/userCard";
import { Feed } from "../../organisms/Feed";
import { UsersList } from "../../organisms/UsersList";
import type { HomeTemplateType } from "./index.types";

export const HomeTemplate: HomeTemplateType = ({ currentUser }) => {
  const { t } = useTranslation("common");
  const [isInitialDataFetched, setIsInitialDataFetched] = useState(false);
  const { posts, mutatePosts, handleMorePosts } = usePosts();
  const { users, mutateUsers } = useUsers({
    currentUserId: currentUser.id
  });
  const { handleFollow, getFollowState } = useFollow({ userId: currentUser.id });

  useEffect(() => {
    if (!isInitialDataFetched) {
      setIsInitialDataFetched(true);
      void (async (): Promise<void> => {
        if (!posts) {
          await mutatePosts();
        }
        if (!users) {
          await mutateUsers();
        }
      })();
    }
  }, [isInitialDataFetched, mutatePosts, mutateUsers, posts, users]);

  return (
    <HStack
      align="flex-start"
      m={{
        base: 0,
        sm: "0 auto"
      }}
      my={{
        base: 5,
        sm: 10
      }}
      spacing={10}
    >
      <Box
        w={{
          base: "100%",
          sm: "500px"
        }}
      >
        <InfiniteScroll
          dataLength={posts?.nodes.length ?? 0}
          hasMore={posts?.pageInfo.hasNextPage ?? false}
          loader={
            <Center key={0} pb="5" pt="5">
              <Spinner size="lg" />
            </Center>
          }
          // eslint-disable-next-line react/jsx-handler-names
          next={handleMorePosts}
        >
          <Feed postNodes={posts?.nodes} />
        </InfiniteScroll>
      </Box>
      <Box
        display={{
          base: "none",
          lg: "block"
        }}
        w="350px"
      >
        <Box p="10px" w="100%">
          <UserCard size={50} src={currentUser.imageUrl} userId={currentUser.id} userName={currentUser.name} />
        </Box>
        <Text fontWeight="bold" pl="10px" pt="15px" w="100%">
          {t("recommend")}
        </Text>
        <UsersList
          buttonSize="xs"
          getFollowState={getFollowState}
          handleFollow={handleFollow}
          userNodes={users?.nodes}
        />
      </Box>
    </HStack>
  );
};
