import useSWRInfinite from "swr/infinite";
import { FOLLOWERS_QUERY } from "./schema";
import type { FollowersQuery, FollowersQueryVariables } from "../../generated";
import type { GetKeyType } from "../../libs/swr/types";
import type { UseFollowersReturnType, UseFollowersType } from "./type";

export const useFollowers: UseFollowersType = ({ userId }) => {
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

  if (data) {
    const lastElement = data[data.length - 1];
    const flatedData = data.map((follower) => follower.follower.edges).flat();
    const edges = flatedData.map((edge) => ({
      node: edge.node.followedUser
    }));

    followers = {
      edges,
      pageInfo: {
        endCursor: lastElement?.follower.pageInfo.endCursor ?? null,
        hasNextPage: lastElement?.follower.pageInfo.hasNextPage ?? false
      }
    };
  }

  const isFollowersError = Boolean(error);
  const isFollowersLoading = !isFollowersError && !followers;
  const loadMoreFollowers = async (): Promise<unknown[] | undefined> => setSize(size + 1);

  return { followers, isFollowersError, isFollowersLoading, loadMoreFollowers, mutateFollowers: mutate };
};
