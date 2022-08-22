import type { PostsQuery } from "../../../generated";

type FeedProps = {
  postNodes: PostsQuery["posts"]["nodes"] | undefined;
};

export type FeedType = (props: FeedProps) => JSX.Element;
