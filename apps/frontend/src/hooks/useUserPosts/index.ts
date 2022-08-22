import React from "react";
import useSWRInfinite from "swr/infinite";
import { wait } from "../../utils/wait";
import { USER_POSTS_QUERY } from "./schema";
import type { UserPostsQuery, UserPostsQueryVariables } from "../../generated";
import type { GetKeyType } from "../../libs/swr/types";
import type { LoadMoreUserPostsType, UseUserPostsReturnType, UseUserPostsType } from "./type";

export const useUserPosts: UseUserPostsType = ({ userId = "" }) => {
  const getKey: GetKeyType<UserPostsQuery, UserPostsQueryVariables> = (_index, previousPageData) => {
    const variables: UserPostsQueryVariables = {
      first: 12,
      userId
    };

    if (previousPageData === null) {
      return [USER_POSTS_QUERY, variables];
    }

    if (!previousPageData.user.posts.pageInfo.hasNextPage) {
      return null;
    }

    return [USER_POSTS_QUERY, { ...variables, after: previousPageData.user.posts.pageInfo.endCursor ?? null }];
  };

  const { data, error, size, setSize, mutate } = useSWRInfinite<UserPostsQuery, Error>(getKey);
  let userPosts: UseUserPostsReturnType["userPosts"] = null;
  const [isThresholdLoading, setIsThresholdLoading] = React.useState(false);

  if (data) {
    const lastElement = data[data.length - 1];

    userPosts = {
      nodes: data.map((post) => post.user.posts.nodes).flat(),
      pageInfo: {
        endCursor: lastElement?.user.posts.pageInfo.endCursor ?? null,
        hasNextPage: lastElement?.user.posts.pageInfo.hasNextPage ?? false
      }
    };
  }

  const isUserPostsError = Boolean(error);
  const isUserPostsLoading = !isUserPostsError && !userPosts && !isThresholdLoading;
  const loadMoreUserPosts: LoadMoreUserPostsType = async () => setSize(size + 1);

  const handleMoreUserPosts: UseUserPostsReturnType["handleMoreUserPosts"] = async () => {
    if (!isUserPostsLoading) {
      setIsThresholdLoading(true);
      await wait(2);
      await loadMoreUserPosts();
      setIsThresholdLoading(false);
    }
  };

  return { handleMoreUserPosts, mutateUserPosts: mutate, userPosts };
};
