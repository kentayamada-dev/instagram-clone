import type { GetAllPostsQuery } from "../../../generated";

export type PostsListProps = {
  postsEdge: GetAllPostsQuery["getAllPosts"]["edges"] | undefined;
};

export type PostsListType = (props: PostsListProps) => JSX.Element;
