import type { FollowingQuery, UsersQuery } from "../../generated";
import type { KeyedMutator } from "swr";

export type LoadMoreFollowingType = () => Promise<FollowingQuery[] | undefined>;
export type HandleMoreFollowingType = () => Promise<void>;

export type UseFollowingReturnType = {
  following: { edges: UsersQuery["users"]["edges"]; pageInfo: FollowingQuery["following"]["pageInfo"] } | null;
  handleMoreFollowing: HandleMoreFollowingType;
  mutateFollowing: KeyedMutator<FollowingQuery[]>;
};

type UseFollowingProps = {
  userId: string | undefined;
};

export type UseFollowingType = (props: UseFollowingProps) => UseFollowingReturnType;
