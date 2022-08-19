import type { CurrentUserQuery } from "../../generated";
import type { KeyedMutator } from "swr";

type UseCurrentUserReturnType = {
  currentUser: CurrentUserQuery["currentUser"] | null;
  isCurrentUserLoading: boolean;
  mutateCurrentUser: KeyedMutator<CurrentUserQuery>;
};

export type UseCurrentUserType = () => UseCurrentUserReturnType;
