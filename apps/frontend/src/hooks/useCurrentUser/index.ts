import useSWR from "swr";
import { CURRENT_USER_QUERY } from "./schema";
import type { CurrentUserQuery } from "../../generated";
import type { UseCurrentUserType } from "./type";

export const useCurrentUser: UseCurrentUserType = () => {
  const { data, error, mutate } = useSWR<CurrentUserQuery, Error>(CURRENT_USER_QUERY);
  const isCurrentUserError = Boolean(error);
  const currentUser = data?.currentUser ?? null;
  const isCurrentUserLoading = !isCurrentUserError && !currentUser;

  return {
    currentUser,
    isCurrentUserError,
    isCurrentUserLoading,
    mutateCurrentUser: mutate
  };
};
