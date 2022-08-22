import { gql } from "graphql-request";

export const POSTS_ID_AND_USERS_ID_QUERY = gql`
  query PostsIdAndUsersId {
    posts {
      nodes {
        id
        userId
      }
    }
  }
`;

export const POSTS_ID_AND_USERS_ID_AND_UPDATED_AT_QUERY = gql`
  query PostsIdAndUsersIdUpdatedAt {
    posts {
      nodes {
        id
        userId
        updatedAt
      }
    }
  }
`;

export const POSTS_QUERY = gql`
  query Posts($first: Float, $after: String) {
    posts(first: $first, after: $after) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        id
        caption
        imageUrl
        createdAt
        user {
          id
          name
          imageUrl
        }
      }
    }
  }
`;
