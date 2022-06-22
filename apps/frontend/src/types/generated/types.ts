import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
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
const defaultOptions = {} as const;
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
  getCurrentUser: {
    __typename?: "GetUserModel";
    id: string;
    name: string;
    imageUrl: string;
  };
};

export type LoginMutationVariables = Exact<{
  loginArgs: LoginArgs;
}>;

export type LoginMutation = {
  __typename?: "Mutation";
  login: { __typename?: "MessageModel"; message: string };
};

export type SignupMutationVariables = Exact<{
  signupArgs: SignupArgs;
}>;

export type SignupMutation = {
  __typename?: "Mutation";
  signup: { __typename?: "MessageModel"; message: string };
};

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
    user: {
      __typename?: "GetUserModel";
      id: string;
      name: string;
      imageUrl: string;
    };
  };
};

export type PostMutationVariables = Exact<{
  postArgs: PostArgs;
}>;

export type PostMutation = {
  __typename?: "Mutation";
  post: {
    __typename?: "GetPostModel";
    id: string;
    caption?: string | null;
    createdAt: any;
    imageUrl: string;
  };
};

export type GetAllPostsIdAndUserIdQueryVariables = Exact<{
  [key: string]: never;
}>;

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
    pageInfo: {
      __typename?: "GetAllPostsModelPageInfo";
      hasNextPage: boolean;
      endCursor?: string | null;
    };
    edges: Array<{
      __typename?: "GetAllPostsModelEdge";
      node: {
        __typename?: "GetAllPostsModel";
        id: string;
        caption?: string | null;
        createdAt: any;
        imageUrl: string;
        user: {
          __typename?: "GetUserModel";
          id: string;
          name: string;
          imageUrl: string;
        };
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

export type LogoutMutation = {
  __typename?: "Mutation";
  logout: { __typename?: "MessageModel"; message: string };
};

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
    pageInfo: {
      __typename?: "GetAllUsersModelPageInfo";
      hasNextPage: boolean;
      endCursor?: string | null;
    };
    edges: Array<{
      __typename?: "GetAllUsersModelEdge";
      node: {
        __typename?: "GetAllUsersModel";
        id: string;
        name: string;
        imageUrl: string;
      };
    }>;
  };
};

export const GetCurrentUserDocument = gql`
  query GetCurrentUser {
    getCurrentUser {
      id
      name
      imageUrl
    }
  }
`;

/**
 * __useGetCurrentUserQuery__
 *
 * To run a query within a React component, call `useGetCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCurrentUserQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetCurrentUserQuery,
    GetCurrentUserQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(
    GetCurrentUserDocument,
    options
  );
}
export function useGetCurrentUserLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetCurrentUserQuery,
    GetCurrentUserQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(
    GetCurrentUserDocument,
    options
  );
}
export type GetCurrentUserQueryHookResult = ReturnType<
  typeof useGetCurrentUserQuery
>;
export type GetCurrentUserLazyQueryHookResult = ReturnType<
  typeof useGetCurrentUserLazyQuery
>;
export type GetCurrentUserQueryResult = Apollo.QueryResult<
  GetCurrentUserQuery,
  GetCurrentUserQueryVariables
>;
export const LoginDocument = gql`
  mutation Login($loginArgs: LoginArgs!) {
    login(loginArgs: $loginArgs) {
      message
    }
  }
`;
export type LoginMutationFn = Apollo.MutationFunction<
  LoginMutation,
  LoginMutationVariables
>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      loginArgs: // value for 'loginArgs'
 *   },
 * });
 */
export function useLoginMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LoginMutation,
    LoginMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<LoginMutation, LoginMutationVariables>(
    LoginDocument,
    options
  );
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<
  LoginMutation,
  LoginMutationVariables
>;
export const SignupDocument = gql`
  mutation Signup($signupArgs: SignupArgs!) {
    signup(signupArgs: $signupArgs) {
      message
    }
  }
`;
export type SignupMutationFn = Apollo.MutationFunction<
  SignupMutation,
  SignupMutationVariables
>;

/**
 * __useSignupMutation__
 *
 * To run a mutation, you first call `useSignupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signupMutation, { data, loading, error }] = useSignupMutation({
 *   variables: {
 *      signupArgs: // value for 'signupArgs'
 *   },
 * });
 */
export function useSignupMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SignupMutation,
    SignupMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SignupMutation, SignupMutationVariables>(
    SignupDocument,
    options
  );
}
export type SignupMutationHookResult = ReturnType<typeof useSignupMutation>;
export type SignupMutationResult = Apollo.MutationResult<SignupMutation>;
export type SignupMutationOptions = Apollo.BaseMutationOptions<
  SignupMutation,
  SignupMutationVariables
>;
export const GetPostDocument = gql`
  query GetPost($getPostId: String!) {
    getPost(id: $getPostId) {
      id
      caption
      createdAt
      user {
        id
        name
        imageUrl
      }
      imageUrl
    }
  }
`;

/**
 * __useGetPostQuery__
 *
 * To run a query within a React component, call `useGetPostQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostQuery({
 *   variables: {
 *      getPostId: // value for 'getPostId'
 *   },
 * });
 */
export function useGetPostQuery(
  baseOptions: Apollo.QueryHookOptions<GetPostQuery, GetPostQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetPostQuery, GetPostQueryVariables>(
    GetPostDocument,
    options
  );
}
export function useGetPostLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetPostQuery, GetPostQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetPostQuery, GetPostQueryVariables>(
    GetPostDocument,
    options
  );
}
export type GetPostQueryHookResult = ReturnType<typeof useGetPostQuery>;
export type GetPostLazyQueryHookResult = ReturnType<typeof useGetPostLazyQuery>;
export type GetPostQueryResult = Apollo.QueryResult<
  GetPostQuery,
  GetPostQueryVariables
>;
export const PostDocument = gql`
  mutation Post($postArgs: PostArgs!) {
    post(postArgs: $postArgs) {
      id
      caption
      createdAt
      imageUrl
    }
  }
`;
export type PostMutationFn = Apollo.MutationFunction<
  PostMutation,
  PostMutationVariables
>;

/**
 * __usePostMutation__
 *
 * To run a mutation, you first call `usePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [postMutation, { data, loading, error }] = usePostMutation({
 *   variables: {
 *      postArgs: // value for 'postArgs'
 *   },
 * });
 */
export function usePostMutation(
  baseOptions?: Apollo.MutationHookOptions<PostMutation, PostMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<PostMutation, PostMutationVariables>(
    PostDocument,
    options
  );
}
export type PostMutationHookResult = ReturnType<typeof usePostMutation>;
export type PostMutationResult = Apollo.MutationResult<PostMutation>;
export type PostMutationOptions = Apollo.BaseMutationOptions<
  PostMutation,
  PostMutationVariables
>;
export const GetAllPostsIdAndUserIdDocument = gql`
  query GetAllPostsIdAndUserId {
    getAllPostsIdAndUserId {
      id
      user {
        id
      }
    }
  }
`;

/**
 * __useGetAllPostsIdAndUserIdQuery__
 *
 * To run a query within a React component, call `useGetAllPostsIdAndUserIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllPostsIdAndUserIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllPostsIdAndUserIdQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllPostsIdAndUserIdQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetAllPostsIdAndUserIdQuery,
    GetAllPostsIdAndUserIdQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetAllPostsIdAndUserIdQuery,
    GetAllPostsIdAndUserIdQueryVariables
  >(GetAllPostsIdAndUserIdDocument, options);
}
export function useGetAllPostsIdAndUserIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetAllPostsIdAndUserIdQuery,
    GetAllPostsIdAndUserIdQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetAllPostsIdAndUserIdQuery,
    GetAllPostsIdAndUserIdQueryVariables
  >(GetAllPostsIdAndUserIdDocument, options);
}
export type GetAllPostsIdAndUserIdQueryHookResult = ReturnType<
  typeof useGetAllPostsIdAndUserIdQuery
>;
export type GetAllPostsIdAndUserIdLazyQueryHookResult = ReturnType<
  typeof useGetAllPostsIdAndUserIdLazyQuery
>;
export type GetAllPostsIdAndUserIdQueryResult = Apollo.QueryResult<
  GetAllPostsIdAndUserIdQuery,
  GetAllPostsIdAndUserIdQueryVariables
>;
export const GetAllPostsDocument = gql`
  query GetAllPosts($first: Float!, $after: String) {
    getAllPosts(first: $first, after: $after) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          id
          caption
          createdAt
          imageUrl
          user {
            id
            name
            imageUrl
          }
        }
      }
    }
  }
`;

/**
 * __useGetAllPostsQuery__
 *
 * To run a query within a React component, call `useGetAllPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllPostsQuery({
 *   variables: {
 *      first: // value for 'first'
 *      after: // value for 'after'
 *   },
 * });
 */
export function useGetAllPostsQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetAllPostsQuery,
    GetAllPostsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetAllPostsQuery, GetAllPostsQueryVariables>(
    GetAllPostsDocument,
    options
  );
}
export function useGetAllPostsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetAllPostsQuery,
    GetAllPostsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetAllPostsQuery, GetAllPostsQueryVariables>(
    GetAllPostsDocument,
    options
  );
}
export type GetAllPostsQueryHookResult = ReturnType<typeof useGetAllPostsQuery>;
export type GetAllPostsLazyQueryHookResult = ReturnType<
  typeof useGetAllPostsLazyQuery
>;
export type GetAllPostsQueryResult = Apollo.QueryResult<
  GetAllPostsQuery,
  GetAllPostsQueryVariables
>;
export const GetUserDocument = gql`
  query GetUser($getUserId: String!) {
    getUser(id: $getUserId) {
      id
      name
      imageUrl
      posts {
        id
        caption
        createdAt
        imageUrl
      }
    }
  }
`;

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *      getUserId: // value for 'getUserId'
 *   },
 * });
 */
export function useGetUserQuery(
  baseOptions: Apollo.QueryHookOptions<GetUserQuery, GetUserQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetUserQuery, GetUserQueryVariables>(
    GetUserDocument,
    options
  );
}
export function useGetUserLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetUserQuery, GetUserQueryVariables>(
    GetUserDocument,
    options
  );
}
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserQueryResult = Apollo.QueryResult<
  GetUserQuery,
  GetUserQueryVariables
>;
export const LogoutDocument = gql`
  mutation Logout {
    logout {
      message
    }
  }
`;
export type LogoutMutationFn = Apollo.MutationFunction<
  LogoutMutation,
  LogoutMutationVariables
>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LogoutMutation,
    LogoutMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(
    LogoutDocument,
    options
  );
}
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<
  LogoutMutation,
  LogoutMutationVariables
>;
export const GetAllUsersIdDocument = gql`
  query GetAllUsersId {
    getAllUsersId {
      id
    }
  }
`;

/**
 * __useGetAllUsersIdQuery__
 *
 * To run a query within a React component, call `useGetAllUsersIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllUsersIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllUsersIdQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllUsersIdQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetAllUsersIdQuery,
    GetAllUsersIdQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetAllUsersIdQuery, GetAllUsersIdQueryVariables>(
    GetAllUsersIdDocument,
    options
  );
}
export function useGetAllUsersIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetAllUsersIdQuery,
    GetAllUsersIdQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetAllUsersIdQuery, GetAllUsersIdQueryVariables>(
    GetAllUsersIdDocument,
    options
  );
}
export type GetAllUsersIdQueryHookResult = ReturnType<
  typeof useGetAllUsersIdQuery
>;
export type GetAllUsersIdLazyQueryHookResult = ReturnType<
  typeof useGetAllUsersIdLazyQuery
>;
export type GetAllUsersIdQueryResult = Apollo.QueryResult<
  GetAllUsersIdQuery,
  GetAllUsersIdQueryVariables
>;
export const GetAllUsersDocument = gql`
  query GetAllUsers($first: Float!, $after: String, $userId: String) {
    getAllUsers(first: $first, after: $after, userId: $userId) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          id
          name
          imageUrl
        }
      }
    }
  }
`;

/**
 * __useGetAllUsersQuery__
 *
 * To run a query within a React component, call `useGetAllUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllUsersQuery({
 *   variables: {
 *      first: // value for 'first'
 *      after: // value for 'after'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetAllUsersQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetAllUsersQuery,
    GetAllUsersQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetAllUsersQuery, GetAllUsersQueryVariables>(
    GetAllUsersDocument,
    options
  );
}
export function useGetAllUsersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetAllUsersQuery,
    GetAllUsersQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetAllUsersQuery, GetAllUsersQueryVariables>(
    GetAllUsersDocument,
    options
  );
}
export type GetAllUsersQueryHookResult = ReturnType<typeof useGetAllUsersQuery>;
export type GetAllUsersLazyQueryHookResult = ReturnType<
  typeof useGetAllUsersLazyQuery
>;
export type GetAllUsersQueryResult = Apollo.QueryResult<
  GetAllUsersQuery,
  GetAllUsersQueryVariables
>;
