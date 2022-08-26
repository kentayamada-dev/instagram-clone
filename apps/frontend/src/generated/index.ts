export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: string;
};

export type CurrentUserModel = {
  /** Created Date */
  createdAt: Scalars["DateTime"];
  /** Email */
  email: Scalars["String"];
  /** Get Related Follower */
  follower: PaginatedFollowerModel;
  /** Get Related Following */
  following: PaginatedFollowingModel;
  /** ID */
  id: Scalars["String"];
  /** Image URL */
  imageUrl: Scalars["String"];
  /** Get Related Likes */
  likes: PaginatedLikeModel;
  /** Name */
  name: Scalars["String"];
  /** Password */
  password: Scalars["String"];
  /** Get Related Posts */
  posts: PaginatedPostModel;
  /** Updated Date */
  updatedAt: Scalars["DateTime"];
};

export type CurrentUserModelFollowerArgs = {
  after?: InputMaybe<Scalars["String"]>;
  first?: InputMaybe<Scalars["Float"]>;
};

export type CurrentUserModelFollowingArgs = {
  after?: InputMaybe<Scalars["String"]>;
  first?: InputMaybe<Scalars["Float"]>;
};

export type CurrentUserModelLikesArgs = {
  after?: InputMaybe<Scalars["String"]>;
  first?: InputMaybe<Scalars["Float"]>;
};

export type CurrentUserModelPostsArgs = {
  after?: InputMaybe<Scalars["String"]>;
  first?: InputMaybe<Scalars["Float"]>;
};

export type FollowInput = {
  /** User ID */
  userId: Scalars["String"];
};

export type FollowerModel = {
  /** Created Date */
  createdAt: Scalars["DateTime"];
  /** Followed User */
  followedUser: UserModelBase;
  /** Followed User ID */
  followedUserId: Scalars["String"];
  /** ID */
  id: Scalars["String"];
  /** Updated Date */
  updatedAt: Scalars["DateTime"];
};

export type FollowerModelEdge = {
  /** Cursor */
  cursor: Scalars["String"];
  /** Node */
  node: FollowerModel;
};

export type FollowerModelPageInfo = {
  /** End Cursor */
  endCursor?: Maybe<Scalars["String"]>;
  /** Boolean value of whether next page exists */
  hasNextPage: Scalars["Boolean"];
};

export type FollowingModel = {
  /** Created Date */
  createdAt: Scalars["DateTime"];
  /** Following User */
  followingUser: UserModelBase;
  /** Following UserId ID */
  followingUserId: Scalars["String"];
  /** ID */
  id: Scalars["String"];
  /** Updated Date */
  updatedAt: Scalars["DateTime"];
};

export type FollowingModelEdge = {
  /** Cursor */
  cursor: Scalars["String"];
  /** Node */
  node: FollowingModel;
};

export type FollowingModelPageInfo = {
  /** End Cursor */
  endCursor?: Maybe<Scalars["String"]>;
  /** Boolean value of whether next page exists */
  hasNextPage: Scalars["Boolean"];
};

export type LikeInput = {
  /** Post ID */
  postId: Scalars["String"];
};

export type LikeModel = {
  /** Created Date */
  createdAt: Scalars["DateTime"];
  /** ID */
  id: Scalars["String"];
  /** Liked Post */
  post: PostModelBase;
  /** Liked Post ID */
  postId: Scalars["String"];
  /** Updated Date */
  updatedAt: Scalars["DateTime"];
  /** Liked User */
  user: UserModelBase;
  /** Liked User ID */
  userId: Scalars["String"];
};

export type LikeModelEdge = {
  /** Cursor */
  cursor: Scalars["String"];
  /** Node */
  node: LikeModel;
};

export type LikeModelPageInfo = {
  /** End Cursor */
  endCursor?: Maybe<Scalars["String"]>;
  /** Boolean value of whether next page exists */
  hasNextPage: Scalars["Boolean"];
};

export type LoginInput = {
  /** Email */
  email: Scalars["String"];
  /** Password */
  password: Scalars["String"];
};

export type MessageModel = {
  /** Message */
  message: Scalars["String"];
};

export type Mutation = {
  /** Follow User */
  follow: FollowingModel;
  /** Like Post */
  like: LikeModel;
  /** Login */
  login: MessageModel;
  /** Logout */
  logout: MessageModel;
  /** Signup */
  signup: UserModelBase;
  /** Unfollow User */
  unfollow: FollowingModel;
  /** Unlike Post */
  unlike: LikeModel;
  /** Upload Post */
  upload: PostModel;
};

export type MutationFollowArgs = {
  followInput: FollowInput;
};

export type MutationLikeArgs = {
  likeInput: LikeInput;
};

export type MutationLoginArgs = {
  loginInput: LoginInput;
};

export type MutationSignupArgs = {
  signupInput: SignupInput;
};

export type MutationUnfollowArgs = {
  followInput: FollowInput;
};

export type MutationUnlikeArgs = {
  likeInput: LikeInput;
};

export type MutationUploadArgs = {
  uploadInput: UploadInput;
};

export type PaginatedFollowerModel = {
  /** Edges */
  edges: Array<FollowerModelEdge>;
  /** Nodes */
  nodes: Array<FollowerModel>;
  /** Page Info */
  pageInfo: FollowerModelPageInfo;
  /** Total Count */
  totalCount: Scalars["Float"];
};

export type PaginatedFollowingModel = {
  /** Edges */
  edges: Array<FollowingModelEdge>;
  /** Nodes */
  nodes: Array<FollowingModel>;
  /** Page Info */
  pageInfo: FollowingModelPageInfo;
  /** Total Count */
  totalCount: Scalars["Float"];
};

export type PaginatedLikeModel = {
  /** Edges */
  edges: Array<LikeModelEdge>;
  /** Nodes */
  nodes: Array<LikeModel>;
  /** Page Info */
  pageInfo: LikeModelPageInfo;
  /** Total Count */
  totalCount: Scalars["Float"];
};

export type PaginatedPostModel = {
  /** Edges */
  edges: Array<PostModelBaseEdge>;
  /** Nodes */
  nodes: Array<PostModelBase>;
  /** Page Info */
  pageInfo: PostModelBasePageInfo;
  /** Total Count */
  totalCount: Scalars["Float"];
};

export type PaginatedPostsModel = {
  /** Edges */
  edges: Array<PostModelEdge>;
  /** Nodes */
  nodes: Array<PostModel>;
  /** Page Info */
  pageInfo: PostModelPageInfo;
  /** Total Count */
  totalCount: Scalars["Float"];
};

export type PaginatedUserModel = {
  /** Edges */
  edges: Array<UserModelBaseEdge>;
  /** Nodes */
  nodes: Array<UserModelBase>;
  /** Page Info */
  pageInfo: UserModelBasePageInfo;
  /** Total Count */
  totalCount: Scalars["Float"];
};

export type PostModel = {
  /** Caption */
  caption?: Maybe<Scalars["String"]>;
  /** Created Date */
  createdAt: Scalars["DateTime"];
  /** ID */
  id: Scalars["String"];
  /** Image URL */
  imageUrl: Scalars["String"];
  /** Get Related Likes */
  likes: PaginatedLikeModel;
  /** Updated Date */
  updatedAt: Scalars["DateTime"];
  /** Related User */
  user: UserModelBase;
  /** Related User ID */
  userId: Scalars["String"];
};

export type PostModelLikesArgs = {
  after?: InputMaybe<Scalars["String"]>;
  first?: InputMaybe<Scalars["Float"]>;
};

export type PostModelBase = {
  /** Caption */
  caption?: Maybe<Scalars["String"]>;
  /** Created Date */
  createdAt: Scalars["DateTime"];
  /** ID */
  id: Scalars["String"];
  /** Image URL */
  imageUrl: Scalars["String"];
  /** Updated Date */
  updatedAt: Scalars["DateTime"];
};

export type PostModelBaseEdge = {
  /** Cursor */
  cursor: Scalars["String"];
  /** Node */
  node: PostModelBase;
};

export type PostModelBasePageInfo = {
  /** End Cursor */
  endCursor?: Maybe<Scalars["String"]>;
  /** Boolean value of whether next page exists */
  hasNextPage: Scalars["Boolean"];
};

export type PostModelEdge = {
  /** Cursor */
  cursor: Scalars["String"];
  /** Node */
  node: PostModel;
};

export type PostModelPageInfo = {
  /** End Cursor */
  endCursor?: Maybe<Scalars["String"]>;
  /** Boolean value of whether next page exists */
  hasNextPage: Scalars["Boolean"];
};

export type Query = {
  /** Get Current User */
  currentUser: CurrentUserModel;
  /** Get Follower */
  follower: PaginatedFollowerModel;
  /** Get Following */
  following: PaginatedFollowingModel;
  /** Get Likes */
  likes: PaginatedLikeModel;
  /** Get Post */
  post: PostModel;
  /** Get Posts */
  posts: PaginatedPostsModel;
  /** Get User */
  user: UserModelBase;
  /** Get Users */
  users: PaginatedUserModel;
};

export type QueryFollowerArgs = {
  after?: InputMaybe<Scalars["String"]>;
  first?: InputMaybe<Scalars["Float"]>;
  userId: Scalars["String"];
};

export type QueryFollowingArgs = {
  after?: InputMaybe<Scalars["String"]>;
  first?: InputMaybe<Scalars["Float"]>;
  userId: Scalars["String"];
};

export type QueryLikesArgs = {
  after?: InputMaybe<Scalars["String"]>;
  first?: InputMaybe<Scalars["Float"]>;
  postId?: InputMaybe<Scalars["String"]>;
  userId?: InputMaybe<Scalars["String"]>;
};

export type QueryPostArgs = {
  postId: Scalars["String"];
};

export type QueryPostsArgs = {
  after?: InputMaybe<Scalars["String"]>;
  first?: InputMaybe<Scalars["Float"]>;
};

export type QueryUserArgs = {
  userId: Scalars["String"];
};

export type QueryUsersArgs = {
  after?: InputMaybe<Scalars["String"]>;
  first?: InputMaybe<Scalars["Float"]>;
  userIdExcluded?: InputMaybe<Scalars["String"]>;
  userIdQuery?: InputMaybe<Scalars["String"]>;
};

export type SignupInput = {
  /** Email */
  email: Scalars["String"];
  /** Id */
  id: Scalars["String"];
  /** Image Url */
  imageUrl: Scalars["String"];
  /** Name */
  name: Scalars["String"];
  /** Password */
  password: Scalars["String"];
};

export type UploadInput = {
  /** Caption */
  caption?: InputMaybe<Scalars["String"]>;
  /** Image URL */
  imageUrl: Scalars["String"];
};

export type UserModelBase = {
  /** Created Date */
  createdAt: Scalars["DateTime"];
  /** Get Related Follower */
  follower: PaginatedFollowerModel;
  /** Get Related Following */
  following: PaginatedFollowingModel;
  /** ID */
  id: Scalars["String"];
  /** Image URL */
  imageUrl: Scalars["String"];
  /** Get Related Likes */
  likes: PaginatedLikeModel;
  /** Name */
  name: Scalars["String"];
  /** Get Related Posts */
  posts: PaginatedPostModel;
  /** Updated Date */
  updatedAt: Scalars["DateTime"];
};

export type UserModelBaseFollowerArgs = {
  after?: InputMaybe<Scalars["String"]>;
  first?: InputMaybe<Scalars["Float"]>;
};

export type UserModelBaseFollowingArgs = {
  after?: InputMaybe<Scalars["String"]>;
  first?: InputMaybe<Scalars["Float"]>;
};

export type UserModelBaseLikesArgs = {
  after?: InputMaybe<Scalars["String"]>;
  first?: InputMaybe<Scalars["Float"]>;
};

export type UserModelBasePostsArgs = {
  after?: InputMaybe<Scalars["String"]>;
  first?: InputMaybe<Scalars["Float"]>;
  postIdExcluded?: InputMaybe<Scalars["String"]>;
};

export type UserModelBaseEdge = {
  /** Cursor */
  cursor: Scalars["String"];
  /** Node */
  node: UserModelBase;
};

export type UserModelBasePageInfo = {
  /** End Cursor */
  endCursor?: Maybe<Scalars["String"]>;
  /** Boolean value of whether next page exists */
  hasNextPage: Scalars["Boolean"];
};

export type CurrentUserQueryVariables = Exact<{ [key: string]: never }>;

export type CurrentUserQuery = {
  currentUser: {
    id: string;
    name: string;
    imageUrl: string;
    likes: { nodes: Array<{ postId: string }> };
    following: { nodes: Array<{ followingUserId: string }> };
  };
};

export type FollowMutationVariables = Exact<{
  followInput: FollowInput;
}>;

export type FollowMutation = { follow: { id: string } };

export type UnfollowMutationVariables = Exact<{
  followInput: FollowInput;
}>;

export type UnfollowMutation = { unfollow: { id: string } };

export type FollowersQueryVariables = Exact<{
  userId: Scalars["String"];
  first?: InputMaybe<Scalars["Float"]>;
  after?: InputMaybe<Scalars["String"]>;
}>;

export type FollowersQuery = {
  follower: {
    pageInfo: { hasNextPage: boolean; endCursor?: string | null };
    nodes: Array<{ followedUser: { id: string; name: string; imageUrl: string } }>;
  };
};

export type FollowingQueryVariables = Exact<{
  userId: Scalars["String"];
  first?: InputMaybe<Scalars["Float"]>;
  after?: InputMaybe<Scalars["String"]>;
}>;

export type FollowingQuery = {
  following: {
    nodes: Array<{ followingUser: { id: string; name: string; imageUrl: string } }>;
    pageInfo: { hasNextPage: boolean; endCursor?: string | null };
  };
};

export type LoginMutationVariables = Exact<{
  loginInput: LoginInput;
}>;

export type LoginMutation = { login: { message: string } };

export type SignupMutationVariables = Exact<{
  signupInput: SignupInput;
}>;

export type SignupMutation = { signup: { id: string } };

export type UnlikeMutationVariables = Exact<{
  likeInput: LikeInput;
}>;

export type UnlikeMutation = { unlike: { id: string } };

export type LikeMutationVariables = Exact<{
  likeInput: LikeInput;
}>;

export type LikeMutation = { like: { id: string } };

export type LikesQueryVariables = Exact<{
  first?: InputMaybe<Scalars["Float"]>;
  after?: InputMaybe<Scalars["String"]>;
  postId?: InputMaybe<Scalars["String"]>;
}>;

export type LikesQuery = {
  likes: {
    nodes: Array<{ user: { id: string; name: string; imageUrl: string } }>;
    pageInfo: { hasNextPage: boolean; endCursor?: string | null };
  };
};

export type PostQueryVariables = Exact<{
  first?: InputMaybe<Scalars["Float"]>;
  postId: Scalars["String"];
  postIdExcluded?: InputMaybe<Scalars["String"]>;
}>;

export type PostQuery = {
  post: {
    id: string;
    caption?: string | null;
    createdAt: string;
    imageUrl: string;
    likes: { totalCount: number };
    user: { id: string; name: string; imageUrl: string; posts: { nodes: Array<{ id: string; imageUrl: string }> } };
  };
};

export type UploadMutationVariables = Exact<{
  uploadInput: UploadInput;
}>;

export type UploadMutation = { upload: { id: string; caption?: string | null; createdAt: string; imageUrl: string } };

export type PostsIdAndUsersIdQueryVariables = Exact<{ [key: string]: never }>;

export type PostsIdAndUsersIdQuery = { posts: { nodes: Array<{ id: string; userId: string }> } };

export type PostsIdAndUsersIdUpdatedAtQueryVariables = Exact<{ [key: string]: never }>;

export type PostsIdAndUsersIdUpdatedAtQuery = {
  posts: { nodes: Array<{ id: string; userId: string; updatedAt: string }> };
};

export type PostsQueryVariables = Exact<{
  first?: InputMaybe<Scalars["Float"]>;
  after?: InputMaybe<Scalars["String"]>;
}>;

export type PostsQuery = {
  posts: {
    pageInfo: { hasNextPage: boolean; endCursor?: string | null };
    nodes: Array<{
      id: string;
      caption?: string | null;
      imageUrl: string;
      createdAt: string;
      user: { id: string; name: string; imageUrl: string };
    }>;
  };
};

export type UserQueryVariables = Exact<{
  userId: Scalars["String"];
}>;

export type UserQuery = {
  user: {
    id: string;
    name: string;
    imageUrl: string;
    posts: { totalCount: number };
    follower: { totalCount: number };
    following: { totalCount: number };
  };
};

export type LogoutMutationVariables = Exact<{ [key: string]: never }>;

export type LogoutMutation = { logout: { message: string } };

export type UserPostsQueryVariables = Exact<{
  userId: Scalars["String"];
  first?: InputMaybe<Scalars["Float"]>;
  after?: InputMaybe<Scalars["String"]>;
}>;

export type UserPostsQuery = {
  user: {
    posts: {
      nodes: Array<{ id: string; imageUrl: string }>;
      pageInfo: { endCursor?: string | null; hasNextPage: boolean };
    };
  };
};

export type UsersIdQueryVariables = Exact<{ [key: string]: never }>;

export type UsersIdQuery = { users: { nodes: Array<{ id: string }> } };

export type UsersQueryVariables = Exact<{
  first?: InputMaybe<Scalars["Float"]>;
  after?: InputMaybe<Scalars["String"]>;
  userIdExcluded?: InputMaybe<Scalars["String"]>;
}>;

export type UsersQuery = {
  users: {
    pageInfo: { hasNextPage: boolean; endCursor?: string | null };
    nodes: Array<{ id: string; name: string; imageUrl: string }>;
  };
};

export type UsersFilterQueryVariables = Exact<{
  first?: InputMaybe<Scalars["Float"]>;
  userIdQuery?: InputMaybe<Scalars["String"]>;
}>;

export type UsersFilterQuery = { users: { nodes: Array<{ id: string; name: string; imageUrl: string }> } };
