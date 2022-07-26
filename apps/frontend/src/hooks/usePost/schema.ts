import { gql } from "graphql-request";

export const GET_POST_QUERY = gql`
  query GetPost($getPostId: String!) {
    getPost(id: $getPostId) {
      id
      caption
      createdAt
      user {
        id
        name
        imageUrl
      }
      imageUrl
    }
  }
`;

export const POST_MUTATION = gql`
  mutation Post($postArgs: PostArgs!) {
    post(postArgs: $postArgs) {
      id
      caption
      createdAt
      imageUrl
    }
  }
`;
