import { gql } from "graphql-request";

export const FOLLOWERS_QUERY = gql`
  query Followers($userId: String!, $first: Float, $after: String) {
    follower(userId: $userId, first: $first, after: $after) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        followedUser {
          id
          name
          imageUrl
        }
      }
    }
  }
`;
