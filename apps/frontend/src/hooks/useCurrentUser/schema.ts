import { gql } from "graphql-request";

export const GET_CURRENT_USER_QUERY = gql`
  query GetCurrentUser {
    getCurrentUser {
      id
      name
      imageUrl
    }
  }
`;
