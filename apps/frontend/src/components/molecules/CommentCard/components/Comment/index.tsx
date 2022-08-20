import { Skeleton, Text } from "@chakra-ui/react";
import type { CommentType } from "./index.types";

export const Comment: CommentType = ({ comment }) => {
  if (!comment) {
    return <Skeleton h="20px" />;
  }

  return <Text>{comment}</Text>;
};
