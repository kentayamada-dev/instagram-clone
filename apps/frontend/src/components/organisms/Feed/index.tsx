import { Box, Center, Spinner } from "@chakra-ui/react";
import InfiniteScroll from "react-infinite-scroller";
import { PostsList } from "../PostsList";
import { UsersList } from "../UsersList";
import type { FeedType } from "./index.types";

export const Feed: FeedType = ({
  postsData,
  loadMorePosts,
  currentUserData,
  usersData
}) => (
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
        {postsData && (
          <InfiniteScroll
            hasMore={postsData.getAllPosts.pageInfo.hasNextPage}
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            loadMore={loadMorePosts}
            loader={
              <Center key={0} pb="5" pt="5">
                <Spinner size="lg" />
              </Center>
            }
          >
            <PostsList postsEdge={postsData.getAllPosts.edges} />
          </InfiniteScroll>
        )}
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
      <UsersList
        currentUser={currentUserData?.getCurrentUser}
        usersEdge={usersData?.getAllUsers.edges}
      />
    </Box>
  </Center>
);
