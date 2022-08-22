import React from "react";
import useSWRInfinite from "swr/infinite";
import { wait } from "../../utils/wait";
import { FOLLOWERS_QUERY } from "./schema";
import type { FollowersQuery, FollowersQueryVariables } from "../../generated";
import type { GetKeyType } from "../../libs/swr/types";
import type { LoadMoreFollowersType, UseFollowersReturnType, UseFollowersType } from "./type";

export const useFollowers: UseFollowersType = ({ userId = "" }) => {
  const getKey: GetKeyType<FollowersQuery, FollowersQueryVariables> = (_index, previousPageData) => {
    const variables: FollowersQueryVariables = {
      first: 7,
      userId
    };

    if (previousPageData === null) {
      return [FOLLOWERS_QUERY, variables];
    }

    if (!previousPageData.follower.pageInfo.hasNextPage) {
      return null;
    }

    return [FOLLOWERS_QUERY, { ...variables, after: previousPageData.follower.pageInfo.endCursor ?? null }];
  };

  const { data, error, size, setSize, mutate } = useSWRInfinite<FollowersQuery, Error>(getKey);
  let followers: UseFollowersReturnType["followers"] = null;
  const [isThresholdLoading, setIsThresholdLoading] = React.useState(false);

  if (data) {
    const lastElement = data[data.length - 1];
    const flattedData = data.map((followerData) => followerData.follower.nodes).flat();
    const nodes = flattedData.map((node) => node.followedUser);

    followers = {
      nodes,
      pageInfo: {
        endCursor: lastElement?.follower.pageInfo.endCursor ?? null,
        hasNextPage: lastElement?.follower.pageInfo.hasNextPage ?? false
      }
    };
  }
  const isFollowersError = Boolean(error);
  const isFollowersLoading = !isFollowersError && !followers && !isThresholdLoading;
  const loadMoreFollowers: LoadMoreFollowersType = async () => setSize(size + 1);
  const handleMoreFollowers: UseFollowersReturnType["handleMoreFollowers"] = async () => {
    if (!isFollowersLoading) {
      setIsThresholdLoading(true);
      await wait(2);
      await loadMoreFollowers();
      setIsThresholdLoading(false);
    }
  };

  return {
    followers,
    handleMoreFollowers,
    mutateFollowers: mutate
  };
};
