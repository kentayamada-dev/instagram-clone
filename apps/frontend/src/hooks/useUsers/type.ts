import type { UsersQuery } from "../../generated";
import type { KeyedMutator } from "swr";

export type UseUsersReturnType = {
  isUsersError: boolean;
  isUsersLoading: boolean;
  mutateUsers: KeyedMutator<UsersQuery[]>;
  users: UsersQuery["users"] | null;
};

type UseUsersProps = {
  currentUserId: string;
};

export type UseUsersType = (props: UseUsersProps) => UseUsersReturnType;
