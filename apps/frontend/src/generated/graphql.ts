// @ts-nocheck
import { GraphQLClient } from "graphql-request";
import * as Dom from "graphql-request/dist/types.dom";
import gql from "graphql-tag";
import { ClientError } from "graphql-request/dist/types";
import useSWR, {
  SWRConfiguration as SWRConfigInterface,
  Key as SWRKeyInterface
} from "swr";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
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

export type GetAllUsersModel = {
  __typename?: "GetAllUsersModel";
  /** Created Date */
  createdAt: Scalars["DateTime"];
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

export type JwtModel = {
  __typename?: "JwtModel";
  /** Access Token */
  accessToken: Scalars["String"];
};

export type LoginInput = {
  /** Email */
  email: Scalars["String"];
  /** Password */
  password: Scalars["String"];
};

export type Mutation = {
  __typename?: "Mutation";
  /** Login */
  login: JwtModel;
  /** Signup */
  signup: JwtModel;
};

export type MutationLoginArgs = {
  loginData: LoginInput;
};

export type MutationSignupArgs = {
  signupData: SignupInput;
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

export type Query = {
  __typename?: "Query";
  /** Get All Posts */
  getAllPosts: PaginatedGetAllPostsModel;
  /** Get All Users */
  getAllUsers: PaginatedGetAllUsersModel;
  /** Get Current User */
  getCurrentUser: GetCurrentUserModel;
};

export type QueryGetAllPostsArgs = {
  cursor?: InputMaybe<Scalars["String"]>;
  limit: Scalars["Float"];
};

export type QueryGetAllUsersArgs = {
  cursor?: InputMaybe<Scalars["String"]>;
  limit: Scalars["Float"];
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

export type SignupMutationVariables = Exact<{
  signupData: SignupInput;
}>;

export type SignupMutation = {
  __typename?: "Mutation";
  signup: { __typename?: "JwtModel"; accessToken: string };
};

export type LoginMutationVariables = Exact<{
  loginData: LoginInput;
}>;

export type LoginMutation = {
  __typename?: "Mutation";
  login: { __typename?: "JwtModel"; accessToken: string };
};

export const SignupDocument = gql`
  mutation signup($signupData: SignupInput!) {
    signup(signupData: $signupData) {
      accessToken
    }
  }
`;
export const LoginDocument = gql`
  mutation login($loginData: LoginInput!) {
    login(loginData: $loginData) {
      accessToken
    }
  }
`;

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string
) => Promise<T>;

const defaultWrapper: SdkFunctionWrapper = (
  action,
  _operationName,
  _operationType
) => action();

export function getSdk(
  client: GraphQLClient,
  withWrapper: SdkFunctionWrapper = defaultWrapper
) {
  return {
    signup(
      variables: SignupMutationVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<SignupMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<SignupMutation>(SignupDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders
          }),
        "signup",
        "mutation"
      );
    },
    login(
      variables: LoginMutationVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<LoginMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<LoginMutation>(LoginDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders
          }),
        "login",
        "mutation"
      );
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;
export function getSdkWithHooks(
  client: GraphQLClient,
  withWrapper: SdkFunctionWrapper = defaultWrapper
) {
  const sdk = getSdk(client, withWrapper);
  const genKey = <V extends Record<string, unknown> = Record<string, unknown>>(
    name: string,
    object: V = {} as V
  ): SWRKeyInterface => [
    name,
    ...Object.keys(object)
      .sort()
      .map((key) => object[key])
  ];
  return {
    ...sdk
  };
}
export type SdkWithHooks = ReturnType<typeof getSdkWithHooks>;
