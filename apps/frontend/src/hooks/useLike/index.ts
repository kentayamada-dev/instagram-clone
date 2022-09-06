import { fetcher } from "../../lib/graphql_request";
import { useCurrentUser } from "../useCurrentUser";
import { usePost } from "../usePost";
import { LIKE_MUTATION, UNLIKE_MUTATION } from "./schema";
import type { LikeMutation, LikeMutationVariables, UnlikeMutation, UnlikeMutationVariables } from "../../generated";
import type { UseLikeReturnType, UseLikeType } from "./type";

export const useLike: UseLikeType = ({ postId = "" }) => {
  const { currentUser, mutateCurrentUser } = useCurrentUser();
  const { mutatePost } = usePost({ postId });
  const isPostLiked = Boolean(currentUser?.likes.nodes.find((like) => like.postId === postId));

  const handleLike: UseLikeReturnType["handleLike"] = async () => {
    if (isPostLiked) {
      await fetcher<UnlikeMutation, UnlikeMutationVariables>(UNLIKE_MUTATION, {
        likeInput: {
          postId
        }
      });
    } else {
      await fetcher<LikeMutation, LikeMutationVariables>(LIKE_MUTATION, {
        likeInput: {
          postId
        }
      });
    }

    await mutatePost();
    await mutateCurrentUser();
  };

  return {
    handleLike,
    isPostLiked
  };
};
