import type { PostsQuery } from "../../../generated";

type FeedProps = {
  postsEdge: PostsQuery["posts"]["edges"] | undefined;
};

export type FeedType = (props: FeedProps) => JSX.Element;
