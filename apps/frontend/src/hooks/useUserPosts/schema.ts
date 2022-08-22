import { gql } from "graphql-request";

export const USER_POSTS_QUERY = gql`
  query UserPosts($userId: String!, $first: Float, $after: String) {
    user(userId: $userId) {
      posts(first: $first, after: $after) {
        nodes {
          id
          imageUrl
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  }
`;
