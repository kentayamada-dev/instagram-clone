import useSWRInfinite from "swr/infinite";
import { FOLLOWING_QUERY } from "./schema";
import type { FollowingQuery, FollowingQueryVariables } from "../../generated";
import type { GetKeyType } from "../../libs/swr/types";
import type { UseFollowingReturnType, UseFollowingType } from "./type";

export const useFollowing: UseFollowingType = ({ userId }) => {
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

  if (data) {
    const lastElement = data[data.length - 1];
    const flatedData = data.map((follower) => follower.following.edges).flat();
    const edges = flatedData.map((edge) => ({
      node: edge.node.followingUser
    }));

    following = {
      edges,
      pageInfo: {
        endCursor: lastElement?.following.pageInfo.endCursor ?? null,
        hasNextPage: lastElement?.following.pageInfo.hasNextPage ?? false
      }
    };
  }

  const isFollowingError = Boolean(error);
  const isFollowingLoading = !isFollowingError && !following;
  const loadMoreFollowing = async (): Promise<unknown[] | undefined> => setSize(size + 1);

  return { following, isFollowingError, isFollowingLoading, loadMoreFollowing, mutateFollowing: mutate };
};
