import { Box, Center, Spinner, Text } from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import InfiniteScroll from "react-infinite-scroller";
import { UserCard } from "../../molecules/userCard";
import { PostsList } from "../PostsList";
import { UsersList } from "../UsersList";
import type { FeedType } from "./index.types";

export const Feed: FeedType = ({ postsData, loadMorePosts, currentUserData, usersData }) => {
  const { t } = useTranslation("common");

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
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            loadMore={loadMorePosts}
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
            src={currentUserData?.getCurrentUser.imageUrl}
            userId={currentUserData?.getCurrentUser.id}
            userName={currentUserData?.getCurrentUser.name}
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
