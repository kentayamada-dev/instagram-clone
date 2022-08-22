import type { FollowersQuery, UsersQuery } from "../../generated";
import type { KeyedMutator } from "swr";

export type LoadMoreFollowersType = () => Promise<FollowersQuery[] | undefined>;

export type UseFollowersReturnType = {
  followers: { nodes: UsersQuery["users"]["nodes"]; pageInfo: FollowersQuery["follower"]["pageInfo"] } | null;
  handleMoreFollowers: () => Promise<void>;
  mutateFollowers: KeyedMutator<FollowersQuery[]>;
};

type UseFollowersProps = {
  userId: string | undefined;
};

export type UseFollowersType = (props: UseFollowersProps) => UseFollowersReturnType;
