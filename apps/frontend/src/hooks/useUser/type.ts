import type { UserQuery } from "../../generated";
import type { KeyedMutator } from "swr";

type UseUserReturnType = {
  isUserError: boolean;
  isUserLoading: boolean;
  mutateUser: KeyedMutator<UserQuery>;
  user: UserQuery["user"] | null;
};

type UseUserProps = {
  fallbackData?: UserQuery;
  userId: string;
};

export type UseUserType = (props: UseUserProps) => UseUserReturnType;
