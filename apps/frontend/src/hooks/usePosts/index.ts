import useSWRInfinite from "swr/infinite";
import { POSTS_QUERY } from "./schema";
import type { PostsQuery, PostsQueryVariables } from "../../generated";
import type { GetKeyType } from "../../libs/swr/types";
import type { UsePostsReturnType, UsePostsType } from "./type";

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

  if (data) {
    const lastElement = data[data.length - 1];

    posts = {
      edges: data.map((post) => post.posts.edges).flat(),
      pageInfo: {
        endCursor: lastElement?.posts.pageInfo.endCursor ?? null,
        hasNextPage: lastElement?.posts.pageInfo.hasNextPage ?? false
      }
    };
  }

  const isPostsError = Boolean(error);
  const isPostsLoading = !isPostsError && !posts;
  const loadMorePosts = async (): Promise<unknown[] | undefined> => setSize(size + 1);

  return { isPostsError, isPostsLoading, loadMorePosts, mutatePosts: mutate, posts };
};
