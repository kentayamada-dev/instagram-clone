import type {
  GetAllPostsQuery,
  GetAllUsersQuery,
  GetCurrentUserQuery
} from "../../../types/generated/types";

export type FeedProps = {
  loadMorePosts: () => Promise<void>;
  postsData: GetAllPostsQuery | undefined;
  currentUserData: GetCurrentUserQuery | undefined;
  usersData: GetAllUsersQuery | undefined;
};

export type FeedType = (props: FeedProps) => JSX.Element;
