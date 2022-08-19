import type { FollowersQuery, UsersQuery } from "../../generated";
import type { KeyedMutator } from "swr";

export type LoadMoreFollowersType = () => Promise<FollowersQuery[] | undefined>;
export type HandleMoreFollowersType = () => Promise<void>;

export type UseFollowersReturnType = {
  followers: { edges: UsersQuery["users"]["edges"]; pageInfo: FollowersQuery["follower"]["pageInfo"] } | null;
  handleMoreFollowers: HandleMoreFollowersType;
  mutateFollowers: KeyedMutator<FollowersQuery[]>;
};

type UseFollowersProps = {
  userId: string | undefined;
};

export type UseFollowersType = (props: UseFollowersProps) => UseFollowersReturnType;
