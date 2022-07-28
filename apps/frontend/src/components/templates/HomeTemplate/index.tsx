import { Center, Spinner, Box, Text } from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import React from "react";
import InfiniteScroll from "react-infinite-scroller";
import { useCurrentUser } from "../../../hooks/useCurrentUser";
import { useAllPosts } from "../../../hooks/usePosts";
import { useAllUsers } from "../../../hooks/useUsers";
import { wait } from "../../../utils/wait";
import { UserCard } from "../../molecules/userCard";
import { PostsList } from "../../organisms/PostsList";
import { UsersList } from "../../organisms/UsersList";
import type { HomeTemplateType } from "./index.types";

export const HomeTemplate: HomeTemplateType = () => {
  const [isInitialDataFetched, setIsInitialDataFetched] = React.useState(false);
  const { t } = useTranslation("common");
  const { currentUser, isError: isCurrentUserError } = useCurrentUser();
  const {
    posts: postsData,
    loadMorePosts: fetchMorePosts,
    isLoading: isLoadingPosts,
    mutate: mutatePosts,
    isError: isAllPostsError
  } = useAllPosts();
  const {
    users: usersData,
    mutate: mutateAllUsers,
    isError: isAllUsersError
  } = useAllUsers({
    currentUserId: currentUser?.getCurrentUser.id ?? ""
  });
  const isTooManyRequestsErrorOccurred = !isCurrentUserError && !isAllUsersError && !isAllPostsError;
  const [isLoading, setIsLoading] = React.useState(false);
  const handleMorePosts = async (): Promise<void> => {
    if (!isLoading && !isLoadingPosts && isTooManyRequestsErrorOccurred) {
      setIsLoading(true);
      await wait(2);
      await fetchMorePosts();
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    // eslint-disable-next-line no-void
    void (async (): Promise<void> => {
      if (isTooManyRequestsErrorOccurred && !isInitialDataFetched) {
        setIsInitialDataFetched(true);
        if (postsData === null) {
          await mutatePosts();
        }
        if (usersData === null) {
          await mutateAllUsers();
        }
      }
    })();
  }, [isInitialDataFetched, isTooManyRequestsErrorOccurred, mutateAllUsers, mutatePosts, postsData, usersData]);

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
            hasMore={postsData?.getAllPosts.pageInfo.hasNextPage}
            // eslint-disable-next-line react/jsx-handler-names, @typescript-eslint/no-misused-promises
            loadMore={handleMorePosts}
            loader={
              <Center key={0} pb="5" pt="5">
                <Spinner size="lg" />
              </Center>
            }
          >
            <PostsList postsEdge={postsData?.getAllPosts.edges} />
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
          <UserCard
            size={50}
            src={currentUser?.getCurrentUser.imageUrl}
            userId={currentUser?.getCurrentUser.id}
            userName={currentUser?.getCurrentUser.name}
          />
          <Text fontWeight="bold" pl="10px" pt="15px" w="100%">
            {t("recommend")}
          </Text>
          <UsersList usersEdge={usersData?.getAllUsers.edges} />
        </Box>
      </Box>
    </Center>
  );
};
