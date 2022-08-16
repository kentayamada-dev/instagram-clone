import { Center, Spinner, Box, Text, HStack } from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { usePosts } from "../../../hooks/usePosts";
import { useUsers } from "../../../hooks/useUsers";
import { wait } from "../../../utils/wait";
import { UserCard } from "../../molecules/userCard";
import { Feed } from "../../organisms/Feed";
import { UsersList } from "../../organisms/UsersList";
import type { HomeTemplateType } from "./index.types";

export const HomeTemplate: HomeTemplateType = ({ currentUser }) => {
  const { t } = useTranslation("common");
  const [isLoadingMorePosts, setIsLoadingMorePosts] = React.useState(false);
  const [isInitialDataFetched, setIsInitialDataFetched] = React.useState(false);
  const { posts, loadMorePosts, isPostsLoading, mutatePosts } = usePosts();
  const { users, mutateUsers } = useUsers({
    currentUserId: currentUser.id
  });

  const handleMorePosts = async (): Promise<void> => {
    if (!isLoadingMorePosts && !isPostsLoading) {
      setIsLoadingMorePosts(true);
      await wait(2);
      await loadMorePosts();
      setIsLoadingMorePosts(false);
    }
  };

  React.useEffect(() => {
    if (!isInitialDataFetched) {
      setIsInitialDataFetched(true);
      // eslint-disable-next-line no-void
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
          dataLength={posts?.edges.length ?? 0}
          hasMore={posts?.pageInfo.hasNextPage ?? false}
          loader={
            <Center key={0} pb="5" pt="5">
              <Spinner size="lg" />
            </Center>
          }
          // eslint-disable-next-line react/jsx-handler-names
          next={handleMorePosts}
        >
          <Feed postsEdge={posts?.edges} />
        </InfiniteScroll>
      </Box>
      <Box
        display={{
          base: "none",
          lg: "block"
        }}
      >
        <UserCard size={50} src={currentUser.imageUrl} userId={currentUser.id} userName={currentUser.name} />
        <Text fontWeight="bold" pl="10px" pt="15px" w="100%">
          {t("recommend")}
        </Text>
        <UsersList usersEdge={users?.edges} />
      </Box>
    </HStack>
  );
};
