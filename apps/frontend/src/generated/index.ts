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
  DateTime: any;
};

export type CurrentUserModel = {
  __typename?: "CurrentUserModel";
  /** Created Date */
  createdAt: Scalars["DateTime"];
  /** Email */
  email: Scalars["String"];
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

export type CurrentUserModelPostsArgs = {
  after?: InputMaybe<Scalars["String"]>;
  first?: InputMaybe<Scalars["Float"]>;
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
  /** Login */
  login: MessageModel;
  /** Logout */
  logout: MessageModel;
  /** Signup */
  signup: MessageModel;
  /** Upload Post */
  upload: PostModel;
};

export type MutationLoginArgs = {
  loginInput: LoginInput;
};

export type MutationSignupArgs = {
  signupInput: SignupInput;
};

export type MutationUploadArgs = {
  uploadInput: UploadInput;
};

export type PaginatedPostModel = {
  __typename?: "PaginatedPostModel";
  /** Edges */
  edges: Array<PostModelBaseEdge>;
  /** Nodes */
  nodes: Array<PostModelBase>;
  /** Page Info */
  pageInfo: PostModelBasePageInfo;
};

export type PaginatedPostsModel = {
  __typename?: "PaginatedPostsModel";
  /** Edges */
  edges: Array<PostModelEdge>;
  /** Nodes */
  nodes: Array<PostModel>;
  /** Page Info */
  pageInfo: PostModelPageInfo;
};

export type PaginatedUserModel = {
  __typename?: "PaginatedUserModel";
  /** Edges */
  edges: Array<UserModelBaseEdge>;
  /** Nodes */
  nodes: Array<UserModelBase>;
  /** Page Info */
  pageInfo: UserModelBasePageInfo;
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
  /** Get Post */
  post: PostModel;
  /** Get Posts */
  posts: PaginatedPostsModel;
  /** Get User */
  user: UserModelBase;
  /** Get Users */
  users: PaginatedUserModel;
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
  userId?: InputMaybe<Scalars["String"]>;
};

export type SignupInput = {
  /** Email */
  email: Scalars["String"];
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
  /** ID */
  id: Scalars["String"];
  /** Image URL */
  imageUrl: Scalars["String"];
  /** Name */
  name: Scalars["String"];
  /** Get Related Posts */
  posts: PaginatedPostModel;
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
  currentUser: { __typename?: "CurrentUserModel"; id: string; name: string; imageUrl: string };
};

export type LoginMutationVariables = Exact<{
  loginInput: LoginInput;
}>;

export type LoginMutation = { __typename?: "Mutation"; login: { __typename?: "MessageModel"; message: string } };

export type SignupMutationVariables = Exact<{
  signupInput: SignupInput;
}>;

export type SignupMutation = { __typename?: "Mutation"; signup: { __typename?: "MessageModel"; message: string } };

export type PostQueryVariables = Exact<{
  postId: Scalars["String"];
}>;

export type PostQuery = {
  __typename?: "Query";
  post: {
    __typename?: "PostModel";
    id: string;
    caption?: string | null;
    createdAt: any;
    imageUrl: string;
    user: { __typename?: "UserModelBase"; id: string; name: string; imageUrl: string };
  };
};

export type UploadMutationVariables = Exact<{
  uploadInput: UploadInput;
}>;

export type UploadMutation = {
  __typename?: "Mutation";
  upload: { __typename?: "PostModel"; id: string; caption?: string | null; createdAt: any; imageUrl: string };
};

export type PostsIdAndUsersIdQueryVariables = Exact<{ [key: string]: never }>;

export type PostsIdAndUsersIdQuery = {
  __typename?: "Query";
  posts: { __typename?: "PaginatedPostsModel"; nodes: Array<{ __typename?: "PostModel"; id: string; userId: string }> };
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
        createdAt: any;
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
    posts: {
      __typename?: "PaginatedPostModel";
      nodes: Array<{
        __typename?: "PostModelBase";
        id: string;
        caption?: string | null;
        imageUrl: string;
        createdAt: any;
      }>;
    };
  };
};

export type LogoutMutationVariables = Exact<{ [key: string]: never }>;

export type LogoutMutation = { __typename?: "Mutation"; logout: { __typename?: "MessageModel"; message: string } };

export type UsersIdQueryVariables = Exact<{ [key: string]: never }>;

export type UsersIdQuery = {
  __typename?: "Query";
  users: { __typename?: "PaginatedUserModel"; nodes: Array<{ __typename?: "UserModelBase"; id: string }> };
};

export type UsersQueryVariables = Exact<{
  first?: InputMaybe<Scalars["Float"]>;
  after?: InputMaybe<Scalars["String"]>;
  userId?: InputMaybe<Scalars["String"]>;
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
