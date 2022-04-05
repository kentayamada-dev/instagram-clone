import type { LoginInput, SignupInput } from "../../generated/graphql";
import type { AxiosResponse } from "axios";

export type LoginType = (loginData: LoginInput) => Promise<AxiosResponse>;
export type SignUpType = (signupData: SignupInput) => Promise<AxiosResponse>;

export type UseUserReturnType = {
  loginHandler: LoginType;
  signUpHandler: SignUpType;
};

export type UseUserType = () => UseUserReturnType;
