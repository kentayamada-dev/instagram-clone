import useSWRInfinite from "swr/infinite";
import { GET_ALL_POSTS_QUERY } from "./schema";
import type { GetKeyType } from "../../libs/swr/types";
import type { GetAllPostsQuery, GetAllPostsQueryVariables } from "../../types/generated/types";
import type { UseAllPostsReturnType, UseAllPostsType } from "./type";

export const useAllPosts: UseAllPostsType = () => {
  const getKey: GetKeyType<GetAllPostsQuery, GetAllPostsQueryVariables> = (_index, previousPageData) => {
    const variables: GetAllPostsQueryVariables = {
      first: 5
    };

    if (previousPageData === null) {
      return [GET_ALL_POSTS_QUERY, variables];
    }

    if (!previousPageData.getAllPosts.pageInfo.hasNextPage) {
      return null;
    }

    return [GET_ALL_POSTS_QUERY, { ...variables, after: previousPageData.getAllPosts.pageInfo.endCursor ?? null }];
  };

  const { data, error, size, setSize, mutate } = useSWRInfinite<GetAllPostsQuery, Error>(getKey);
  let posts: UseAllPostsReturnType["posts"] = null;

  if (data) {
    const lastElement = data[data.length - 1];

    posts = {
      getAllPosts: {
        edges: data.map((post) => post.getAllPosts.edges).flat(),
        pageInfo: {
          endCursor: lastElement?.getAllPosts.pageInfo.endCursor ?? null,
          hasNextPage: lastElement?.getAllPosts.pageInfo.hasNextPage ?? false
        }
      }
    };
  }

  const isError = Boolean(error);

  const loadMorePosts = async (): Promise<unknown[] | undefined> => setSize(size + 1);

  return { isError, isLoading: !isError && !data, loadMorePosts, mutate, posts };
};
