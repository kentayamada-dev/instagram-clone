import type { GetCurrentUserQuery } from "../../generated";
import type { KeyedMutator } from "swr";

type UseCurrentUserReturnType = {
  currentUser: GetCurrentUserQuery | null;
  isError: boolean;
  isLoading: boolean;
  mutate: KeyedMutator<GetCurrentUserQuery>;
};

export type UseCurrentUserType = () => UseCurrentUserReturnType;
