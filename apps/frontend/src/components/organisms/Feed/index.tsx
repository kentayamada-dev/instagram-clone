import { Box, VStack } from "@chakra-ui/react";
import { PostCard } from "../../molecules/PostCard";
import type { FeedType } from "./index.types";

export const Feed: FeedType = ({ postNodes }) => (
  <VStack
    spacing={{
      base: 5,
      sm: 10
    }}
  >
    {postNodes ? (
      <>
        {postNodes.map((post) => (
          <Box key={post.id} w="100%">
            <PostCard
              caption={post.caption}
              createdAt={post.createdAt}
              imageUrl={post.imageUrl}
              src={post.user.imageUrl}
              userId={post.user.id}
              userName={post.user.name}
            />
          </Box>
        ))}
      </>
    ) : (
      <>
        {[...Array(3)].map((_, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <Box key={index} w="100%">
            <PostCard />
          </Box>
        ))}
      </>
    )}
  </VStack>
);
