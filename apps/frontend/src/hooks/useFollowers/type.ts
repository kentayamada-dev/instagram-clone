import type { FollowersQuery, UsersQuery } from "../../generated";
import type { KeyedMutator } from "swr";

export type UseFollowersReturnType = {
  followers: { edges: UsersQuery["users"]["edges"]; pageInfo: FollowersQuery["follower"]["pageInfo"] } | null;
  isFollowersError: boolean;
  isFollowersLoading: boolean;
  loadMoreFollowers: () => Promise<unknown[] | undefined>;
  mutateFollowers: KeyedMutator<FollowersQuery[]>;
};

type UseFollowersProps = {
  userId: string;
};

export type UseFollowersType = (props: UseFollowersProps) => UseFollowersReturnType;
