import useSWR from "swr";
import { GET_CURRENT_USER_QUERY } from "./schema";
import type { GetCurrentUserQuery } from "../../generated";
import type { UseCurrentUserType } from "./type";

export const useCurrentUser: UseCurrentUserType = () => {
  const { data, error, mutate } = useSWR<GetCurrentUserQuery, Error>(GET_CURRENT_USER_QUERY);
  const isError = Boolean(error);

  return {
    currentUser: data ?? null,
    isError,
    isLoading: !isError && !data,
    mutate
  };
};
