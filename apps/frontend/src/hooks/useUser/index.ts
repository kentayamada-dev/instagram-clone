import useSWR from "swr";
import { USER_QUERY } from "./schema";
import type { UserQuery } from "../../generated";
import type { UseUserType } from "./type";

export const useUser: UseUserType = ({ userId, fallbackData }) => {
  const { data, error, mutate } = useSWR<UserQuery, Error>([USER_QUERY, { userId }], {
    ...(fallbackData && { fallbackData })
  });
  const isUserError = Boolean(error);
  const user = data?.user ?? null;
  const isUserLoading = !isUserError && !user;

  return {
    isUserError,
    isUserLoading,
    mutateUser: mutate,
    user
  };
};
