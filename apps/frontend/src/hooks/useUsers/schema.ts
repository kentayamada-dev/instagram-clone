import { gql } from "graphql-request";

export const GET_ALL_USERS_ID_QUERY = gql`
  query GetAllUsersId {
    getAllUsersId {
      id
    }
  }
`;

export const GET_ALL_USERS_QUERY = gql`
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
