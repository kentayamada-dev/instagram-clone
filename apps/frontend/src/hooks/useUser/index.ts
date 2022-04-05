import axios from "axios";
import type { LoginType, SignUpType, UseUserType } from "./types";

export const useUser: UseUserType = () => {
  const loginHandler: LoginType = async (loginData) =>
    axios.post("/api/login/", loginData);

  const signUpHandler: SignUpType = async (signupData) =>
    axios.post("/api/signup/", signupData);

  return {
    loginHandler,
    signUpHandler
  };
};
