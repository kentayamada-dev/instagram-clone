import type { UserPostsQuery } from "../../generated";
import type { KeyedMutator } from "swr";

export type UseUserPostsReturnType = {
  isUserPostsError: boolean;
  isUserPostsLoading: boolean;
  loadMoreUserPosts: () => Promise<unknown[] | undefined>;
  mutateUserPosts: KeyedMutator<UserPostsQuery[]>;
  userPosts: UserPostsQuery["user"]["posts"] | null;
};

type UseUserPostsProps = {
  userId: string;
};

export type UseUserPostsType = (props: UseUserPostsProps) => UseUserPostsReturnType;
