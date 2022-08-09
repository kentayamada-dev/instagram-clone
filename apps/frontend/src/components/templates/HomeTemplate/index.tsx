import { Center, Spinner, Box, Text } from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import React from "react";
import InfiniteScroll from "react-infinite-scroller";
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
    <Center>
      <Box
        w={{
          base: "100%",
          lg: "900px",
          md: "inherit"
        }}
      >
        <Box
          w={{
            base: "100%",
            md: "600px"
          }}
        >
          <InfiniteScroll
            hasMore={posts?.pageInfo.hasNextPage}
            // eslint-disable-next-line react/jsx-handler-names, @typescript-eslint/no-misused-promises
            loadMore={handleMorePosts}
            loader={
              <Center key={0} pb="5" pt="5">
                <Spinner size="lg" />
              </Center>
            }
          >
            <Feed postsEdge={posts?.edges} />
          </InfiniteScroll>
        </Box>
      </Box>
      <Box
        display={{
          base: "none",
          lg: "block"
        }}
        left="auto"
        ml="600px"
        mt="100px"
        pos="fixed"
        right="auto"
        top="0px"
      >
        <Box w="250px">
          <UserCard size={50} src={currentUser.imageUrl} userId={currentUser.id} userName={currentUser.name} />
          <Text fontWeight="bold" pl="10px" pt="15px" w="100%">
            {t("recommend")}
          </Text>
          <UsersList usersEdge={users?.edges} />
        </Box>
      </Box>
    </Center>
  );
};
