import useSWRInfinite from "swr/infinite";
import { USERS_QUERY } from "./schema";
import type { UsersQuery, UsersQueryVariables } from "../../generated";
import type { GetKeyType } from "../../lib/swr/types";
import type { UseUsersReturnType, UseUsersType } from "./type";

export const useUsers: UseUsersType = ({ currentUserId }) => {
  const getKey: GetKeyType<UsersQuery, UsersQueryVariables> = (_index, previousPageData) => {
    const variables: UsersQueryVariables = {
      first: 5,
      userIdExcluded: currentUserId
    };

    if (previousPageData === null) {
      return [USERS_QUERY, variables];
    }

    if (!previousPageData.users.pageInfo.hasNextPage) {
      return null;
    }

    return [USERS_QUERY, { ...variables, after: previousPageData.users.pageInfo.endCursor ?? null }];
  };

  const { data, error, mutate } = useSWRInfinite<UsersQuery, Error>(getKey);
  let users: UseUsersReturnType["users"] = null;

  if (data) {
    const lastElement = data[data.length - 1];

    users = {
      nodes: data.map((post) => post.users.nodes).flat(),
      pageInfo: {
        endCursor: lastElement?.users.pageInfo.endCursor ?? null,
        hasNextPage: lastElement?.users.pageInfo.hasNextPage ?? false
      }
    };
  }

  const isUsersError = Boolean(error);
  const isUsersLoading = !isUsersError && !users;

  return { isUsersError, isUsersLoading, mutateUsers: mutate, users };
};
