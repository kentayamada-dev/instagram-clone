import type { PostsQuery } from "../../generated";
import type { KeyedMutator } from "swr";

export type HandleMorePostsType = () => Promise<void>;
export type LoadMorePostsType = () => Promise<PostsQuery[] | undefined>;

export type UsePostsReturnType = {
  handleMorePosts: HandleMorePostsType;
  mutatePosts: KeyedMutator<PostsQuery[]>;
  posts: PostsQuery["posts"] | null;
};

export type UsePostsType = () => UsePostsReturnType;
