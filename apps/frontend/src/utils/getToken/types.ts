import type { TokenBodyType } from "../../pages/api/token/types";
import type { AxiosResponse } from "axios";

export type GetTokenType = (
  jwtToken: string
) => Promise<AxiosResponse<TokenBodyType, null>>;
