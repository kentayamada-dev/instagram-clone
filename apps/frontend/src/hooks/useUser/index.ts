import useSWR from "swr";
import { GET_USER_QUERY } from "./schema";
import type { GetUserQuery } from "../../generated";
import type { UseUserType } from "./type";

export const useUser: UseUserType = ({ userId, fallbackData }) => {
  const { data, error, mutate } = useSWR<GetUserQuery, Error>([GET_USER_QUERY, { getUserId: userId }], {
    ...(fallbackData ? { fallbackData } : {})
  });
  const isError = Boolean(error);

  return {
    isError,
    isLoading: !isError && !data,
    mutate,
    user: data ?? null
  };
};
