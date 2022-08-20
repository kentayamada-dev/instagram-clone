import type { UserQuery } from "../../generated";
import type { KeyedMutator } from "swr";

type UseUserReturnType = {
  mutateUser: KeyedMutator<UserQuery>;
  user: UserQuery["user"] | null;
};

type UseUserProps = {
  fallbackData?: UserQuery;
  userId: string | undefined;
};

export type UseUserType = (props: UseUserProps) => UseUserReturnType;
