import { gql } from "graphql-request";

export const FOLLOW_MUTATION = gql`
  mutation Follow($followInput: FollowInput!) {
    follow(followInput: $followInput) {
      id
    }
  }
`;

export const UNFOLLOW_MUTATION = gql`
  mutation Unfollow($followInput: FollowInput!) {
    unfollow(followInput: $followInput) {
      id
    }
  }
`;
