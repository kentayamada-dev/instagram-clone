import type { LikesQuery, UsersQuery } from "../../generated";
import type { KeyedMutator } from "swr";

export type LoadMoreLikesType = () => Promise<LikesQuery[] | undefined>;

export type UseLikesReturnType = {
  handleMoreLikes: () => Promise<void>;
  likes: { nodes: UsersQuery["users"]["nodes"]; pageInfo: LikesQuery["likes"]["pageInfo"] } | null;
  mutateLikes: KeyedMutator<LikesQuery[]>;
};

type UseLikesProps = {
  postId: string | undefined;
};

export type UseLikesType = (props: UseLikesProps) => UseLikesReturnType;
