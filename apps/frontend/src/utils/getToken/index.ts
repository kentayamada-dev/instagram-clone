import axios from "axios";
import type { TokenBodyType } from "../../pages/api/token/types";
import type { GetTokenType } from "./types";

export const getToken: GetTokenType = async (jwtToken) =>
  axios.post<TokenBodyType>("/api/token/", { jwtToken });
