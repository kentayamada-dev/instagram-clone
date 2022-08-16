import type { FollowingQuery, UsersQuery } from "../../generated";
import type { KeyedMutator } from "swr";

export type UseFollowingReturnType = {
  following: { edges: UsersQuery["users"]["edges"]; pageInfo: FollowingQuery["following"]["pageInfo"] } | null;
  isFollowingError: boolean;
  isFollowingLoading: boolean;
  loadMoreFollowing: () => Promise<unknown[] | undefined>;
  mutateFollowing: KeyedMutator<FollowingQuery[]>;
};

type UseFollowingProps = {
  userId: string;
};

export type UseFollowingType = (props: UseFollowingProps) => UseFollowingReturnType;
