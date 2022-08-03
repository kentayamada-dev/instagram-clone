import type { UserPostsQuery } from "../../../generated";

type PostsListProps = {
  posts: UserPostsQuery["user"]["posts"]["edges"] | undefined;
  userId: string;
};

export type PostsListType = (props: PostsListProps) => JSX.Element;
