import type { GetAllUsersQuery } from "../../types/generated/types";
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
