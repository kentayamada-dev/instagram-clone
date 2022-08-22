import { HStack, Skeleton, VStack, Box } from "@chakra-ui/react";
import { StyledAvatar } from "../../atoms/StyledAvatar";
import { TextLink } from "../../atoms/TextLink";
import { Comment } from "./components/Comment";
import type { CommentCardType } from "./index.types";

export const CommentCard: CommentCardType = ({ userId, userName, src, comment }) => (
  <HStack align="flex-start" p={3} spacing={3}>
    <StyledAvatar alt="Avatar Image" size={35} src={src} />
    <Box w="100%">
      {userId && userName ? (
        <VStack align="flex-start" spacing={0}>
          <TextLink fontWeight="semibold" href={`/${userId}`} text={userId} />
        </VStack>
      ) : (
        <Skeleton h="20px" w="40%" />
      )}
      <Comment comment={comment} />
    </Box>
  </HStack>
);
