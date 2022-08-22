import { gql } from "graphql-request";

export const FOLLOWING_QUERY = gql`
  query Following($userId: String!, $first: Float, $after: String) {
    following(userId: $userId, first: $first, after: $after) {
      nodes {
        followingUser {
          id
          name
          imageUrl
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;
