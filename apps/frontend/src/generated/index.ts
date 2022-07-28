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

export type GetAllPostsIdAndUserId = {
  __typename?: "GetAllPostsIdAndUserId";
  /** ID */
  id: Scalars["String"];
  /** Related User ID */
  user: GetAllUsersId;
};

export type GetAllPostsModel = {
  __typename?: "GetAllPostsModel";
  /** Caption */
  caption?: Maybe<Scalars["String"]>;
  /** Created Date */
  createdAt: Scalars["DateTime"];
  /** ID */
  id: Scalars["String"];
  /** Image URL */
  imageUrl: Scalars["String"];
  /** Related User */
  user: GetUserModel;
};

export type GetAllPostsModelEdge = {
  __typename?: "GetAllPostsModelEdge";
  /** Cursor */
  cursor: Scalars["String"];
  /** Node */
  node: GetAllPostsModel;
};

export type GetAllPostsModelPageInfo = {
  __typename?: "GetAllPostsModelPageInfo";
  /** End Cursor */
  endCursor?: Maybe<Scalars["String"]>;
  /** Boolean value of whether next page exists */
  hasNextPage: Scalars["Boolean"];
};

export type GetAllUsersId = {
  __typename?: "GetAllUsersId";
  /** ID */
  id: Scalars["String"];
};

export type GetAllUsersModel = {
  __typename?: "GetAllUsersModel";
  /** ID */
  id: Scalars["String"];
  /** Image URL */
  imageUrl: Scalars["String"];
  /** Name */
  name: Scalars["String"];
};

export type GetAllUsersModelEdge = {
  __typename?: "GetAllUsersModelEdge";
  /** Cursor */
  cursor: Scalars["String"];
  /** Node */
  node: GetAllUsersModel;
};

export type GetAllUsersModelPageInfo = {
  __typename?: "GetAllUsersModelPageInfo";
  /** End Cursor */
  endCursor?: Maybe<Scalars["String"]>;
  /** Boolean value of whether next page exists */
  hasNextPage: Scalars["Boolean"];
};

export type GetCurrentUserModel = {
  __typename?: "GetCurrentUserModel";
  /** ID */
  id: Scalars["String"];
  /** Image URL */
  imageUrl: Scalars["String"];
  /** Name */
  name: Scalars["String"];
  /** Related Post */
  posts: Array<GetPostModel>;
};

export type GetPostModel = {
  __typename?: "GetPostModel";
  /** Caption */
  caption?: Maybe<Scalars["String"]>;
  /** Created Date */
  createdAt: Scalars["DateTime"];
  /** ID */
  id: Scalars["String"];
  /** Image URL */
  imageUrl: Scalars["String"];
};

export type GetUserModel = {
  __typename?: "GetUserModel";
  /** ID */
  id: Scalars["String"];
  /** Image URL */
  imageUrl: Scalars["String"];
  /** Name */
  name: Scalars["String"];
};

export type LoginArgs = {
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
  /** Post */
  post: GetPostModel;
  /** Signup */
  signup: MessageModel;
};

export type MutationLoginArgs = {
  loginArgs: LoginArgs;
};

export type MutationPostArgs = {
  postArgs: PostArgs;
};

export type MutationSignupArgs = {
  signupArgs: SignupArgs;
};

export type PaginatedGetAllPostsModel = {
  __typename?: "PaginatedGetAllPostsModel";
  /** Edges */
  edges: Array<GetAllPostsModelEdge>;
  /** Nodes */
  nodes: Array<GetAllPostsModel>;
  /** Page Info */
  pageInfo: GetAllPostsModelPageInfo;
};

export type PaginatedGetAllUsersModel = {
  __typename?: "PaginatedGetAllUsersModel";
  /** Edges */
  edges: Array<GetAllUsersModelEdge>;
  /** Nodes */
  nodes: Array<GetAllUsersModel>;
  /** Page Info */
  pageInfo: GetAllUsersModelPageInfo;
};

export type PostArgs = {
  /** Caption */
  caption?: InputMaybe<Scalars["String"]>;
  /** Image URL */
  imageUrl: Scalars["String"];
};

export type Query = {
  __typename?: "Query";
  /** Get All Posts */
  getAllPosts: PaginatedGetAllPostsModel;
  /** Get All Posts ID and Related User ID */
  getAllPostsIdAndUserId: Array<GetAllPostsIdAndUserId>;
  /** Get All Users */
  getAllUsers: PaginatedGetAllUsersModel;
  /** Get All Users ID */
  getAllUsersId: Array<GetAllUsersId>;
  /** Get Current User */
  getCurrentUser: GetUserModel;
  /** Get Post */
  getPost: GetAllPostsModel;
  /** Get User */
  getUser: GetCurrentUserModel;
};

export type QueryGetAllPostsArgs = {
  after?: InputMaybe<Scalars["String"]>;
  first: Scalars["Float"];
};

export type QueryGetAllUsersArgs = {
  after?: InputMaybe<Scalars["String"]>;
  first: Scalars["Float"];
  userId?: InputMaybe<Scalars["String"]>;
};

export type QueryGetPostArgs = {
  id: Scalars["String"];
};

export type QueryGetUserArgs = {
  id: Scalars["String"];
};

export type SignupArgs = {
  /** Email */
  email: Scalars["String"];
  /** Image Url */
  imageUrl: Scalars["String"];
  /** Name */
  name: Scalars["String"];
  /** Password */
  password: Scalars["String"];
};

export type GetCurrentUserQueryVariables = Exact<{ [key: string]: never }>;

export type GetCurrentUserQuery = {
  __typename?: "Query";
  getCurrentUser: { __typename?: "GetUserModel"; id: string; name: string; imageUrl: string };
};

export type LoginMutationVariables = Exact<{
  loginArgs: LoginArgs;
}>;

export type LoginMutation = { __typename?: "Mutation"; login: { __typename?: "MessageModel"; message: string } };

export type SignupMutationVariables = Exact<{
  signupArgs: SignupArgs;
}>;

export type SignupMutation = { __typename?: "Mutation"; signup: { __typename?: "MessageModel"; message: string } };

export type GetPostQueryVariables = Exact<{
  getPostId: Scalars["String"];
}>;

export type GetPostQuery = {
  __typename?: "Query";
  getPost: {
    __typename?: "GetAllPostsModel";
    id: string;
    caption?: string | null;
    createdAt: any;
    imageUrl: string;
    user: { __typename?: "GetUserModel"; id: string; name: string; imageUrl: string };
  };
};

export type PostMutationVariables = Exact<{
  postArgs: PostArgs;
}>;

export type PostMutation = {
  __typename?: "Mutation";
  post: { __typename?: "GetPostModel"; id: string; caption?: string | null; createdAt: any; imageUrl: string };
};

export type GetAllPostsIdAndUserIdQueryVariables = Exact<{ [key: string]: never }>;

export type GetAllPostsIdAndUserIdQuery = {
  __typename?: "Query";
  getAllPostsIdAndUserId: Array<{
    __typename?: "GetAllPostsIdAndUserId";
    id: string;
    user: { __typename?: "GetAllUsersId"; id: string };
  }>;
};

export type GetAllPostsQueryVariables = Exact<{
  first: Scalars["Float"];
  after?: InputMaybe<Scalars["String"]>;
}>;

export type GetAllPostsQuery = {
  __typename?: "Query";
  getAllPosts: {
    __typename?: "PaginatedGetAllPostsModel";
    pageInfo: { __typename?: "GetAllPostsModelPageInfo"; hasNextPage: boolean; endCursor?: string | null };
    edges: Array<{
      __typename?: "GetAllPostsModelEdge";
      node: {
        __typename?: "GetAllPostsModel";
        id: string;
        caption?: string | null;
        createdAt: any;
        imageUrl: string;
        user: { __typename?: "GetUserModel"; id: string; name: string; imageUrl: string };
      };
    }>;
  };
};

export type GetUserQueryVariables = Exact<{
  getUserId: Scalars["String"];
}>;

export type GetUserQuery = {
  __typename?: "Query";
  getUser: {
    __typename?: "GetCurrentUserModel";
    id: string;
    name: string;
    imageUrl: string;
    posts: Array<{
      __typename?: "GetPostModel";
      id: string;
      caption?: string | null;
      createdAt: any;
      imageUrl: string;
    }>;
  };
};

export type LogoutMutationVariables = Exact<{ [key: string]: never }>;

export type LogoutMutation = { __typename?: "Mutation"; logout: { __typename?: "MessageModel"; message: string } };

export type GetAllUsersIdQueryVariables = Exact<{ [key: string]: never }>;

export type GetAllUsersIdQuery = {
  __typename?: "Query";
  getAllUsersId: Array<{ __typename?: "GetAllUsersId"; id: string }>;
};

export type GetAllUsersQueryVariables = Exact<{
  first: Scalars["Float"];
  after?: InputMaybe<Scalars["String"]>;
  userId?: InputMaybe<Scalars["String"]>;
}>;

export type GetAllUsersQuery = {
  __typename?: "Query";
  getAllUsers: {
    __typename?: "PaginatedGetAllUsersModel";
    pageInfo: { __typename?: "GetAllUsersModelPageInfo"; hasNextPage: boolean; endCursor?: string | null };
    edges: Array<{
      __typename?: "GetAllUsersModelEdge";
      node: { __typename?: "GetAllUsersModel"; id: string; name: string; imageUrl: string };
    }>;
  };
};
