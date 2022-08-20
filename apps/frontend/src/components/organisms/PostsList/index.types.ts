import type { UserPostsQuery } from "../../../generated";

type PostsListPropsType = {
  posts: UserPostsQuery["user"]["posts"]["edges"] | undefined;
  userId: string | undefined;
};

export type PostsListType = (props: PostsListPropsType) => JSX.Element;
