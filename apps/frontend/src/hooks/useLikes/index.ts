import { useState } from "react";
import useSWRInfinite from "swr/infinite";
import { wait } from "../../utils/wait";
import { LIKES_QUERY } from "./schema";
import type { LikesQuery, LikesQueryVariables } from "../../generated";
import type { GetKeyType } from "../../lib/swr/types";
import type { LoadMoreLikesType, UseLikesReturnType, UseLikesType } from "./type";

export const useLikes: UseLikesType = ({ postId = "" }) => {
  const getKey: GetKeyType<LikesQuery, LikesQueryVariables> = (_index, previousPageData) => {
    const variables: LikesQueryVariables = {
      first: 7,
      postId
    };

    if (previousPageData === null) {
      return [LIKES_QUERY, variables];
    }

    if (!previousPageData.likes.pageInfo.hasNextPage) {
      return null;
    }

    return [LIKES_QUERY, { ...variables, after: previousPageData.likes.pageInfo.endCursor ?? null }];
  };

  const { data, error, size, setSize, mutate } = useSWRInfinite<LikesQuery, Error>(getKey);
  let likes: UseLikesReturnType["likes"] = null;
  const [isThresholdLoading, setIsThresholdLoading] = useState(false);

  if (data) {
    const lastElement = data[data.length - 1];
    const flattedData = data.map((like) => like.likes.nodes).flat();
    const nodes = flattedData.map((node) => node.user);

    likes = {
      nodes,
      pageInfo: {
        endCursor: lastElement?.likes.pageInfo.endCursor ?? null,
        hasNextPage: lastElement?.likes.pageInfo.hasNextPage ?? false
      }
    };
  }

  const isFollowingError = Boolean(error);
  const isFollowingLoading = !isFollowingError && !likes && !isThresholdLoading;
  const loadMoreLikes: LoadMoreLikesType = async () => setSize(size + 1);
  const handleMoreLikes: UseLikesReturnType["handleMoreLikes"] = async () => {
    if (!isFollowingLoading) {
      setIsThresholdLoading(true);
      await wait(2);
      await loadMoreLikes();
      setIsThresholdLoading(false);
    }
  };

  return {
    handleMoreLikes,
    likes,
    mutateLikes: mutate
  };
};
