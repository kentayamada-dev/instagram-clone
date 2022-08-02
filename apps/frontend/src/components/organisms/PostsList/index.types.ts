import type { PostsQuery } from "../../../generated";

type PostsListProps = {
  postsEdge: PostsQuery["posts"]["edges"] | undefined;
};

export type PostsListType = (props: PostsListProps) => JSX.Element;
