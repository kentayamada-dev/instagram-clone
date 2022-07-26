import type { GetAllPostsQuery, GetAllUsersQuery, GetCurrentUserQuery } from "../../../types/generated/types";

export type FeedProps = {
  currentUserData: GetCurrentUserQuery | null;
  loadMorePosts: () => Promise<void>;
  postsData: GetAllPostsQuery | null;
  usersData: GetAllUsersQuery | null;
};

export type FeedType = (props: FeedProps) => JSX.Element;
