import { gql } from "graphql-request";

export const POST_QUERY = gql`
  query Post($postId: String!) {
    post(postId: $postId) {
      id
      caption
      createdAt
      imageUrl
      user {
        id
        name
        imageUrl
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
