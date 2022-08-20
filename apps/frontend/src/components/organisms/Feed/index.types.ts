import type { PostsQuery } from "../../../generated";

type FeedPropsType = {
  postsEdge: PostsQuery["posts"]["edges"] | undefined;
};

export type FeedType = (props: FeedPropsType) => JSX.Element;
