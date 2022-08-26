import { gql } from "graphql-request";

export const CURRENT_USER_QUERY = gql`
  query CurrentUser {
    currentUser {
      id
      name
      imageUrl
      likes {
        nodes {
          postId
        }
      }
      following {
        nodes {
          followingUserId
        }
      }
    }
  }
`;
