import { gql } from "graphql-request";

export const GET_USER_QUERY = gql`
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

export const LOGOUT_MUTATION = gql`
  mutation Logout {
    logout {
      message
    }
  }
`;
