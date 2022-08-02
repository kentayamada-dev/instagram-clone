import type { PostsQuery } from "../../../generated";

export type PostsListProps = {
  postsEdge: PostsQuery["posts"]["edges"] | undefined;
};

export type PostsListType = (props: PostsListProps) => JSX.Element;
