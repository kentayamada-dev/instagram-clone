import type { GetAllPostsQuery } from "../../generated";
import type { KeyedMutator } from "swr";

export type UseAllPostsReturnType = {
  isError: boolean;
  isLoading: boolean;
  loadMorePosts: () => Promise<unknown[] | undefined>;
  mutate: KeyedMutator<GetAllPostsQuery[]>;
  posts: GetAllPostsQuery | null;
};

export type UseAllPostsType = () => UseAllPostsReturnType;
