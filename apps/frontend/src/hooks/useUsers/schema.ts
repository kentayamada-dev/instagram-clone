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
  query Users($first: Float, $after: String, $userIdExcluded: String) {
    users(first: $first, after: $after, userIdExcluded: $userIdExcluded) {
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

export const USERS_FILTER_QUERY = gql`
  query UsersFilter($first: Float, $userIdQuery: String) {
    users(first: $first, userIdQuery: $userIdQuery) {
      nodes {
        id
        name
        imageUrl
      }
    }
  }
`;
