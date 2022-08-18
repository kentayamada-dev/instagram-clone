import { gql } from "graphql-request";

export const LOGIN_MUTATION = gql`
  mutation Login($loginInput: LoginInput!) {
    login(loginInput: $loginInput) {
      message
    }
  }
`;

export const SIGNUP_MUTATION = gql`
  mutation Signup($signupInput: SignupInput!) {
    signup(signupInput: $signupInput) {
      id
    }
  }
`;
