import type { PostsQuery } from "../../generated";
import type { KeyedMutator } from "swr";

export type UsePostsReturnType = {
  isPostsError: boolean;
  isPostsLoading: boolean;
  loadMorePosts: () => Promise<unknown[] | undefined>;
  mutatePosts: KeyedMutator<PostsQuery[]>;
  posts: PostsQuery["posts"] | null;
};

export type UsePostsType = () => UsePostsReturnType;
