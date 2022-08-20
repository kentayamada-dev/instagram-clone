import type { UserPostsQuery } from "../../../generated";

type PostsListProps = {
  posts: UserPostsQuery["user"]["posts"]["edges"] | undefined;
  userId: string | undefined;
};

export type PostsListType = (props: PostsListProps) => JSX.Element;
