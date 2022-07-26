import type { GetUserQuery } from "../../types/generated/types";
import type { KeyedMutator } from "swr";

type UseUserReturnType = {
  isError: boolean;
  isLoading: boolean;
  mutate: KeyedMutator<GetUserQuery>;
  user: GetUserQuery | null;
};

type UseUserProps = {
  fallbackData?: GetUserQuery;
  shouldRevalidateOnMount?: boolean;
  userId: string;
};

export type UseUserType = (props: UseUserProps) => UseUserReturnType;
