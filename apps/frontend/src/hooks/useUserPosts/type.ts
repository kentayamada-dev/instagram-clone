import type { UserPostsQuery } from "../../generated";
import type { KeyedMutator } from "swr";

export type LoadMoreUserPostsType = () => Promise<UserPostsQuery[] | undefined>;

export type UseUserPostsReturnType = {
  handleMoreUserPosts: () => Promise<void>;
  mutateUserPosts: KeyedMutator<UserPostsQuery[]>;
  userPosts: UserPostsQuery["user"]["posts"] | null;
};

type UseUserPostsProps = {
  userId: string | undefined;
};

export type UseUserPostsType = (props: UseUserPostsProps) => UseUserPostsReturnType;
