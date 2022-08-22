import type { FollowingQuery, UsersQuery } from "../../generated";
import type { KeyedMutator } from "swr";

export type LoadMoreFollowingType = () => Promise<FollowingQuery[] | undefined>;

export type UseFollowingReturnType = {
  following: { nodes: UsersQuery["users"]["nodes"]; pageInfo: FollowingQuery["following"]["pageInfo"] } | null;
  handleMoreFollowing: () => Promise<void>;
  mutateFollowing: KeyedMutator<FollowingQuery[]>;
};

type UseFollowingProps = {
  userId: string | undefined;
};

export type UseFollowingType = (props: UseFollowingProps) => UseFollowingReturnType;
