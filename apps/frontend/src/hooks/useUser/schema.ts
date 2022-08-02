import { gql } from "graphql-request";

export const USER_QUERY = gql`
  query User($userId: String!) {
    user(userId: $userId) {
      id
      name
      imageUrl
      posts {
        nodes {
          id
          caption
          imageUrl
          createdAt
        }
      }
    }
  }
`;

export const LOGOUT_MUTATION = gql`
  mutation Logout {
    logout {
      message
    }
  }
`;
