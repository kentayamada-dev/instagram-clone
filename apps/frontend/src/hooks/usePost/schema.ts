import { gql } from "graphql-request";

export const POST_QUERY = gql`
  query Post($first: Float, $postId: String!, $postIdExcluded: String) {
    post(postId: $postId) {
      id
      caption
      createdAt
      imageUrl
      user {
        id
        name
        imageUrl
        posts(first: $first, postIdExcluded: $postIdExcluded) {
          nodes {
            id
            imageUrl
          }
        }
      }
    }
  }
`;

export const UPLOAD_MUTATION = gql`
  mutation Upload($uploadInput: UploadInput!) {
    upload(uploadInput: $uploadInput) {
      id
      caption
      createdAt
      imageUrl
    }
  }
`;
