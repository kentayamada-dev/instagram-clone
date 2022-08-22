import type { UserPostsQuery } from "../../../generated";

type PostsListProps = {
  posts: UserPostsQuery["user"]["posts"]["nodes"] | undefined;
  userId: string | undefined;
};

export type PostsListType = (props: PostsListProps) => JSX.Element;
