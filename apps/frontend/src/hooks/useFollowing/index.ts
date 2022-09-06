import React from "react";
import useSWRInfinite from "swr/infinite";
import { wait } from "../../utils/wait";
import { FOLLOWING_QUERY } from "./schema";
import type { FollowingQuery, FollowingQueryVariables } from "../../generated";
import type { GetKeyType } from "../../lib/swr/types";
import type { LoadMoreFollowingType, UseFollowingReturnType, UseFollowingType } from "./type";

export const useFollowing: UseFollowingType = ({ userId = "" }) => {
  const getKey: GetKeyType<FollowingQuery, FollowingQueryVariables> = (_index, previousPageData) => {
    const variables: FollowingQueryVariables = {
      first: 7,
      userId
    };

    if (previousPageData === null) {
      return [FOLLOWING_QUERY, variables];
    }

    if (!previousPageData.following.pageInfo.hasNextPage) {
      return null;
    }

    return [FOLLOWING_QUERY, { ...variables, after: previousPageData.following.pageInfo.endCursor ?? null }];
  };

  const { data, error, size, setSize, mutate } = useSWRInfinite<FollowingQuery, Error>(getKey);
  let following: UseFollowingReturnType["following"] = null;
  const [isThresholdLoading, setIsThresholdLoading] = React.useState(false);

  if (data) {
    const lastElement = data[data.length - 1];
    const flattedData = data.map((follower) => follower.following.nodes).flat();
    const nodes = flattedData.map((node) => node.followingUser);

    following = {
      nodes,
      pageInfo: {
        endCursor: lastElement?.following.pageInfo.endCursor ?? null,
        hasNextPage: lastElement?.following.pageInfo.hasNextPage ?? false
      }
    };
  }

  const isFollowingError = Boolean(error);
  const isFollowingLoading = !isFollowingError && !following && !isThresholdLoading;
  const loadMoreFollowing: LoadMoreFollowingType = async () => setSize(size + 1);
  const handleMoreFollowing: UseFollowingReturnType["handleMoreFollowing"] = async () => {
    if (!isFollowingLoading) {
      setIsThresholdLoading(true);
      await wait(2);
      await loadMoreFollowing();
      setIsThresholdLoading(false);
    }
  };

  return {
    following,
    handleMoreFollowing,
    mutateFollowing: mutate
  };
};
