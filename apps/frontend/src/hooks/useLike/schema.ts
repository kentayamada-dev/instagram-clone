import { gql } from "graphql-request";

export const UNLIKE_MUTATION = gql`
  mutation Unlike($likeInput: LikeInput!) {
    unlike(likeInput: $likeInput) {
      id
    }
  }
`;

export const LIKE_MUTATION = gql`
  mutation Like($likeInput: LikeInput!) {
    like(likeInput: $likeInput) {
      id
    }
  }
`;
