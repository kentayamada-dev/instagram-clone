import { Box, VStack } from "@chakra-ui/react";
import { PostCard } from "../../molecules/postCard";
import type { FeedType } from "./index.types";

export const Feed: FeedType = ({ postsEdge }) => (
  <VStack spacing={10}>
    {postsEdge ? (
      <>
        {postsEdge.map((postEdge) => {
          const post = postEdge.node;

          return (
            <Box key={post.id} w="100%">
              <PostCard
                caption={post.caption}
                imageUrl={post.imageUrl}
                src={post.user.imageUrl}
                userId={post.user.id}
                userName={post.user.name}
              />
            </Box>
          );
        })}
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
