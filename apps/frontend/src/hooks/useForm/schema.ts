import { gql } from "graphql-request";

export const LOGIN_MUTATION = gql`
  mutation Login($loginArgs: LoginArgs!) {
    login(loginArgs: $loginArgs) {
      message
    }
  }
`;

export const SIGNUP_MUTATION = gql`
  mutation Signup($signupArgs: SignupArgs!) {
    signup(signupArgs: $signupArgs) {
      message
    }
  }
`;
