import type { GetAllPostsQuery, GetAllUsersQuery, GetCurrentUserQuery } from "../../../types/generated/types";

export type FeedProps = {
  currentUserData: GetCurrentUserQuery | undefined;
  loadMorePosts: () => Promise<void>;
  postsData: GetAllPostsQuery | undefined;
  usersData: GetAllUsersQuery | undefined;
};

export type FeedType = (props: FeedProps) => JSX.Element;
