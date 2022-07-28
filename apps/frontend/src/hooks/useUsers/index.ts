import useSWRInfinite from "swr/infinite";
import { GET_ALL_USERS_QUERY } from "./schema";
import type { GetAllUsersQuery, GetAllUsersQueryVariables } from "../../generated";
import type { GetKeyType } from "../../libs/swr/types";
import type { UseAllUsersReturnType, UseAllUsersType } from "./type";

export const useAllUsers: UseAllUsersType = ({ currentUserId }) => {
  const getKey: GetKeyType<GetAllUsersQuery, GetAllUsersQueryVariables> = (_index, previousPageData) => {
    const variables: GetAllUsersQueryVariables = {
      first: 5,
      userId: currentUserId
    };

    if (previousPageData === null) {
      return [GET_ALL_USERS_QUERY, variables];
    }

    if (!previousPageData.getAllUsers.pageInfo.hasNextPage) {
      return null;
    }

    return [GET_ALL_USERS_QUERY, { ...variables, after: previousPageData.getAllUsers.pageInfo.endCursor ?? null }];
  };

  const { data, error, mutate } = useSWRInfinite<GetAllUsersQuery, Error>(getKey);
  let users: UseAllUsersReturnType["users"] = null;

  if (data) {
    const lastElement = data[data.length - 1];

    users = {
      getAllUsers: {
        edges: data.map((post) => post.getAllUsers.edges).flat(),
        pageInfo: {
          endCursor: lastElement?.getAllUsers.pageInfo.endCursor ?? null,
          hasNextPage: lastElement?.getAllUsers.pageInfo.hasNextPage ?? false
        }
      }
    };
  }

  const isError = Boolean(error);

  return { isError, isLoading: !isError && !data, mutate, users };
};
