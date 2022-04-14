import type { GetAllPostsQuery } from "../../../types/generated/types";

export type PostsListProps = {
  postsEdge: GetAllPostsQuery["getAllPosts"]["edges"] | undefined;
};

export type PostsListType = (props: PostsListProps) => JSX.Element;
