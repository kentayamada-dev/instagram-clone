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
  __typename?: "CurrentUserModel";
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

export type CurrentUserModelPostsArgs = {
  after?: InputMaybe<Scalars["String"]>;
  first?: InputMaybe<Scalars["Float"]>;
};

export type FollowInput = {
  /** User ID */
  userId: Scalars["String"];
};

export type FollowerModel = {
  __typename?: "FollowerModel";
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
  __typename?: "FollowerModelEdge";
  /** Cursor */
  cursor: Scalars["String"];
  /** Node */
  node: FollowerModel;
};

export type FollowerModelPageInfo = {
  __typename?: "FollowerModelPageInfo";
  /** End Cursor */
  endCursor?: Maybe<Scalars["String"]>;
  /** Boolean value of whether next page exists */
  hasNextPage: Scalars["Boolean"];
};

export type FollowingModel = {
  __typename?: "FollowingModel";
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
  __typename?: "FollowingModelEdge";
  /** Cursor */
  cursor: Scalars["String"];
  /** Node */
  node: FollowingModel;
};

export type FollowingModelPageInfo = {
  __typename?: "FollowingModelPageInfo";
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
  __typename?: "MessageModel";
  /** Message */
  message: Scalars["String"];
};

export type Mutation = {
  __typename?: "Mutation";
  /** Follow User */
  follow: FollowingModel;
  /** Login */
  login: MessageModel;
  /** Logout */
  logout: MessageModel;
  /** Signup */
  signup: UserModelBase;
  /** Unfollow User */
  unfollow: FollowingModel;
  /** Upload Post */
  upload: PostModel;
};

export type MutationFollowArgs = {
  followInput: FollowInput;
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

export type MutationUploadArgs = {
  uploadInput: UploadInput;
};

export type PaginatedFollowerModel = {
  __typename?: "PaginatedFollowerModel";
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
  __typename?: "PaginatedFollowingModel";
  /** Edges */
  edges: Array<FollowingModelEdge>;
  /** Nodes */
  nodes: Array<FollowingModel>;
  /** Page Info */
  pageInfo: FollowingModelPageInfo;
  /** Total Count */
  totalCount: Scalars["Float"];
};

export type PaginatedPostModel = {
  __typename?: "PaginatedPostModel";
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
  __typename?: "PaginatedPostsModel";
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
  __typename?: "PaginatedUserModel";
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
  __typename?: "PostModel";
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
  /** Related User */
  user: UserModelBase;
  /** Related User ID */
  userId: Scalars["String"];
};

export type PostModelBase = {
  __typename?: "PostModelBase";
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
  __typename?: "PostModelBaseEdge";
  /** Cursor */
  cursor: Scalars["String"];
  /** Node */
  node: PostModelBase;
};

export type PostModelBasePageInfo = {
  __typename?: "PostModelBasePageInfo";
  /** End Cursor */
  endCursor?: Maybe<Scalars["String"]>;
  /** Boolean value of whether next page exists */
  hasNextPage: Scalars["Boolean"];
};

export type PostModelEdge = {
  __typename?: "PostModelEdge";
  /** Cursor */
  cursor: Scalars["String"];
  /** Node */
  node: PostModel;
};

export type PostModelPageInfo = {
  __typename?: "PostModelPageInfo";
  /** End Cursor */
  endCursor?: Maybe<Scalars["String"]>;
  /** Boolean value of whether next page exists */
  hasNextPage: Scalars["Boolean"];
};

export type Query = {
  __typename?: "Query";
  /** Get Current User */
  currentUser: CurrentUserModel;
  /** Get Follower */
  follower: PaginatedFollowerModel;
  /** Get Following */
  following: PaginatedFollowingModel;
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
  __typename?: "UserModelBase";
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

export type UserModelBasePostsArgs = {
  after?: InputMaybe<Scalars["String"]>;
  first?: InputMaybe<Scalars["Float"]>;
};

export type UserModelBaseEdge = {
  __typename?: "UserModelBaseEdge";
  /** Cursor */
  cursor: Scalars["String"];
  /** Node */
  node: UserModelBase;
};

export type UserModelBasePageInfo = {
  __typename?: "UserModelBasePageInfo";
  /** End Cursor */
  endCursor?: Maybe<Scalars["String"]>;
  /** Boolean value of whether next page exists */
  hasNextPage: Scalars["Boolean"];
};

export type CurrentUserQueryVariables = Exact<{ [key: string]: never }>;

export type CurrentUserQuery = {
  __typename?: "Query";
  currentUser: {
    __typename?: "CurrentUserModel";
    id: string;
    name: string;
    imageUrl: string;
    following: {
      __typename?: "PaginatedFollowingModel";
      nodes: Array<{ __typename?: "FollowingModel"; followingUserId: string }>;
    };
  };
};

export type FollowMutationVariables = Exact<{
  followInput: FollowInput;
}>;

export type FollowMutation = { __typename?: "Mutation"; follow: { __typename?: "FollowingModel"; id: string } };

export type UnfollowMutationVariables = Exact<{
  followInput: FollowInput;
}>;

export type UnfollowMutation = { __typename?: "Mutation"; unfollow: { __typename?: "FollowingModel"; id: string } };

export type FollowersQueryVariables = Exact<{
  userId: Scalars["String"];
  first?: InputMaybe<Scalars["Float"]>;
  after?: InputMaybe<Scalars["String"]>;
}>;

export type FollowersQuery = {
  __typename?: "Query";
  follower: {
    __typename?: "PaginatedFollowerModel";
    pageInfo: { __typename?: "FollowerModelPageInfo"; hasNextPage: boolean; endCursor?: string | null };
    edges: Array<{
      __typename?: "FollowerModelEdge";
      node: {
        __typename?: "FollowerModel";
        followedUser: { __typename?: "UserModelBase"; id: string; name: string; imageUrl: string };
      };
    }>;
  };
};

export type FollowingQueryVariables = Exact<{
  userId: Scalars["String"];
  first?: InputMaybe<Scalars["Float"]>;
  after?: InputMaybe<Scalars["String"]>;
}>;

export type FollowingQuery = {
  __typename?: "Query";
  following: {
    __typename?: "PaginatedFollowingModel";
    edges: Array<{
      __typename?: "FollowingModelEdge";
      node: {
        __typename?: "FollowingModel";
        followingUser: { __typename?: "UserModelBase"; id: string; name: string; imageUrl: string };
      };
    }>;
    pageInfo: { __typename?: "FollowingModelPageInfo"; hasNextPage: boolean; endCursor?: string | null };
  };
};

export type LoginMutationVariables = Exact<{
  loginInput: LoginInput;
}>;

export type LoginMutation = { __typename?: "Mutation"; login: { __typename?: "MessageModel"; message: string } };

export type SignupMutationVariables = Exact<{
  signupInput: SignupInput;
}>;

export type SignupMutation = { __typename?: "Mutation"; signup: { __typename?: "UserModelBase"; id: string } };

export type PostQueryVariables = Exact<{
  postId: Scalars["String"];
}>;

export type PostQuery = {
  __typename?: "Query";
  post: {
    __typename?: "PostModel";
    id: string;
    caption?: string | null;
    createdAt: string;
    imageUrl: string;
    user: { __typename?: "UserModelBase"; id: string; name: string; imageUrl: string };
  };
};

export type UploadMutationVariables = Exact<{
  uploadInput: UploadInput;
}>;

export type UploadMutation = {
  __typename?: "Mutation";
  upload: { __typename?: "PostModel"; id: string; caption?: string | null; createdAt: string; imageUrl: string };
};

export type PostsIdAndUsersIdQueryVariables = Exact<{ [key: string]: never }>;

export type PostsIdAndUsersIdQuery = {
  __typename?: "Query";
  posts: { __typename?: "PaginatedPostsModel"; nodes: Array<{ __typename?: "PostModel"; id: string; userId: string }> };
};

export type PostsIdAndUsersIdUpdatedAtQueryVariables = Exact<{ [key: string]: never }>;

export type PostsIdAndUsersIdUpdatedAtQuery = {
  __typename?: "Query";
  posts: {
    __typename?: "PaginatedPostsModel";
    nodes: Array<{ __typename?: "PostModel"; id: string; userId: string; updatedAt: string }>;
  };
};

export type PostsQueryVariables = Exact<{
  first?: InputMaybe<Scalars["Float"]>;
  after?: InputMaybe<Scalars["String"]>;
}>;

export type PostsQuery = {
  __typename?: "Query";
  posts: {
    __typename?: "PaginatedPostsModel";
    pageInfo: { __typename?: "PostModelPageInfo"; hasNextPage: boolean; endCursor?: string | null };
    edges: Array<{
      __typename?: "PostModelEdge";
      node: {
        __typename?: "PostModel";
        id: string;
        caption?: string | null;
        imageUrl: string;
        createdAt: string;
        user: { __typename?: "UserModelBase"; id: string; name: string; imageUrl: string };
      };
    }>;
  };
};

export type UserQueryVariables = Exact<{
  userId: Scalars["String"];
}>;

export type UserQuery = {
  __typename?: "Query";
  user: {
    __typename?: "UserModelBase";
    id: string;
    name: string;
    imageUrl: string;
    posts: { __typename?: "PaginatedPostModel"; totalCount: number };
    follower: { __typename?: "PaginatedFollowerModel"; totalCount: number };
    following: { __typename?: "PaginatedFollowingModel"; totalCount: number };
  };
};

export type LogoutMutationVariables = Exact<{ [key: string]: never }>;

export type LogoutMutation = { __typename?: "Mutation"; logout: { __typename?: "MessageModel"; message: string } };

export type UserPostsQueryVariables = Exact<{
  userId: Scalars["String"];
  first?: InputMaybe<Scalars["Float"]>;
  after?: InputMaybe<Scalars["String"]>;
}>;

export type UserPostsQuery = {
  __typename?: "Query";
  user: {
    __typename?: "UserModelBase";
    posts: {
      __typename?: "PaginatedPostModel";
      edges: Array<{
        __typename?: "PostModelBaseEdge";
        node: { __typename?: "PostModelBase"; id: string; imageUrl: string };
      }>;
      pageInfo: { __typename?: "PostModelBasePageInfo"; endCursor?: string | null; hasNextPage: boolean };
    };
  };
};

export type UsersIdQueryVariables = Exact<{ [key: string]: never }>;

export type UsersIdQuery = {
  __typename?: "Query";
  users: { __typename?: "PaginatedUserModel"; nodes: Array<{ __typename?: "UserModelBase"; id: string }> };
};

export type UsersQueryVariables = Exact<{
  first?: InputMaybe<Scalars["Float"]>;
  after?: InputMaybe<Scalars["String"]>;
  userIdExcluded?: InputMaybe<Scalars["String"]>;
}>;

export type UsersQuery = {
  __typename?: "Query";
  users: {
    __typename?: "PaginatedUserModel";
    pageInfo: { __typename?: "UserModelBasePageInfo"; hasNextPage: boolean; endCursor?: string | null };
    edges: Array<{
      __typename?: "UserModelBaseEdge";
      node: { __typename?: "UserModelBase"; id: string; name: string; imageUrl: string };
    }>;
  };
};

export type UsersFilterQueryVariables = Exact<{
  first?: InputMaybe<Scalars["Float"]>;
  userIdQuery?: InputMaybe<Scalars["String"]>;
}>;

export type UsersFilterQuery = {
  __typename?: "Query";
  users: {
    __typename?: "PaginatedUserModel";
    nodes: Array<{ __typename?: "UserModelBase"; id: string; name: string; imageUrl: string }>;
  };
};
