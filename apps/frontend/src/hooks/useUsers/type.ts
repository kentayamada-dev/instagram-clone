import type { GetAllUsersQuery } from "../../generated";
import type { KeyedMutator } from "swr";

export type UseAllUsersReturnType = {
  isError: boolean;
  isLoading: boolean;
  mutate: KeyedMutator<GetAllUsersQuery[]>;
  users: GetAllUsersQuery | null;
};

type UseAllUsersProps = {
  currentUserId: string;
};

export type UseAllUsersType = (props: UseAllUsersProps) => UseAllUsersReturnType;
