import { gql } from "graphql-request";

export const GET_ALL_POSTS_ID_AND_USER_ID_QUERY = gql`
  query GetAllPostsIdAndUserId {
    getAllPostsIdAndUserId {
      id
      user {
        id
      }
    }
  }
`;

export const GET_ALL_POSTS_QUERY = gql`
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
