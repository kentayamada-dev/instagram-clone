import type { GetUserQuery } from "../../generated";
import type { KeyedMutator } from "swr";

type UseUserReturnType = {
  isError: boolean;
  isLoading: boolean;
  mutate: KeyedMutator<GetUserQuery>;
  user: GetUserQuery | null;
};

type UseUserProps = {
  fallbackData?: GetUserQuery;
  userId: string;
};

export type UseUserType = (props: UseUserProps) => UseUserReturnType;
