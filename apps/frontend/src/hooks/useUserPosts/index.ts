import useSWRInfinite from "swr/infinite";
import { USER_POSTS_QUERY } from "./schema";
import type { UserPostsQuery, UserPostsQueryVariables } from "../../generated";
import type { GetKeyType } from "../../libs/swr/types";
import type { UseUserPostsReturnType, UseUserPostsType } from "./type";

export const useUserPosts: UseUserPostsType = ({ userId }) => {
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

  if (data) {
    const lastElement = data[data.length - 1];

    userPosts = {
      edges: data.map((post) => post.user.posts.edges).flat(),
      pageInfo: {
        endCursor: lastElement?.user.posts.pageInfo.endCursor ?? null,
        hasNextPage: lastElement?.user.posts.pageInfo.hasNextPage ?? false
      }
    };
  }

  const isUserPostsError = Boolean(error);
  const isUserPostsLoading = !isUserPostsError && !userPosts;
  const loadMoreUserPosts = async (): Promise<unknown[] | undefined> => setSize(size + 1);

  return { isUserPostsError, isUserPostsLoading, loadMoreUserPosts, mutateUserPosts: mutate, userPosts };
};
