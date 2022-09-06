import React from "react";
import useSWRInfinite from "swr/infinite";
import { wait } from "../../utils/wait";
import { POSTS_QUERY } from "./schema";
import type { PostsQuery, PostsQueryVariables } from "../../generated";
import type { GetKeyType } from "../../lib/swr/types";
import type { HandleMorePostsType, LoadMorePostsType, UsePostsReturnType, UsePostsType } from "./type";

export const usePosts: UsePostsType = () => {
  const getKey: GetKeyType<PostsQuery, PostsQueryVariables> = (_index, previousPageData) => {
    const variables: PostsQueryVariables = {
      first: 5
    };

    if (previousPageData === null) {
      return [POSTS_QUERY, variables];
    }

    if (!previousPageData.posts.pageInfo.hasNextPage) {
      return null;
    }

    return [POSTS_QUERY, { ...variables, after: previousPageData.posts.pageInfo.endCursor ?? null }];
  };

  const { data, error, size, setSize, mutate } = useSWRInfinite<PostsQuery, Error>(getKey);
  let posts: UsePostsReturnType["posts"] = null;
  const [isThresholdLoading, setIsThresholdLoading] = React.useState(false);

  if (data) {
    const lastElement = data[data.length - 1];

    posts = {
      nodes: data.map((post) => post.posts.nodes).flat(),
      pageInfo: {
        endCursor: lastElement?.posts.pageInfo.endCursor ?? null,
        hasNextPage: lastElement?.posts.pageInfo.hasNextPage ?? false
      }
    };
  }

  const isPostsError = Boolean(error);
  const isPostsLoading = !isPostsError && !posts && !isThresholdLoading;
  const loadMorePosts: LoadMorePostsType = async () => setSize(size + 1);
  const handleMorePosts: HandleMorePostsType = async () => {
    if (!isPostsLoading) {
      setIsThresholdLoading(true);
      await wait(2);
      await loadMorePosts();
      setIsThresholdLoading(false);
    }
  };

  return { handleMorePosts, mutatePosts: mutate, posts };
};
