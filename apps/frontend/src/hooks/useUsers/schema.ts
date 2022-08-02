import { gql } from "graphql-request";

export const USERS_ID_QUERY = gql`
  query UsersId {
    users {
      nodes {
        id
      }
    }
  }
`;

export const USERS_QUERY = gql`
  query Users($first: Float, $after: String, $userId: String) {
    users(first: $first, after: $after, userId: $userId) {
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
