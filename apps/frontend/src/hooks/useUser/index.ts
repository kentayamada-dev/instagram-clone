import useSWR from "swr";
import { USER_QUERY } from "./schema";
import type { UserQuery, UserQueryVariables } from "../../generated";
import type { UseUserType } from "./type";

export const useUser: UseUserType = ({ userId = "", fallbackData }) => {
  const args: UserQueryVariables = {
    userId
  };
  const { data, mutate } = useSWR<UserQuery, Error>([USER_QUERY, args], {
    ...(fallbackData && { fallbackData })
  });
  const user = data?.user ?? null;

  return {
    mutateUser: mutate,
    user
  };
};
