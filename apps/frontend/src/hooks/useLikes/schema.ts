import { gql } from "graphql-request";

export const LIKES_QUERY = gql`
  query Likes($first: Float, $after: String, $postId: String) {
    likes(first: $first, after: $after, postId: $postId) {
      nodes {
        user {
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
