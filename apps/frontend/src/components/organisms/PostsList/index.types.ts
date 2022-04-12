import type { GetAllPostsQuery } from "../../../types/generated/types";

export type PostsListProps = {
  postsEdge: GetAllPostsQuery["getAllPosts"]["edges"];
};

export type PostsListType = (props: PostsListProps) => JSX.Element;
