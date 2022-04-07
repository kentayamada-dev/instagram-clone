import type { ApiHandlerType } from "../../../types/api";

export type TokenBodyType = {
  jwtToken: string;
};

/* eslint-disable @typescript-eslint/indent */
export type TokenHandlerType = ApiHandlerType<
  Record<string, unknown>,
  TokenBodyType,
  Record<string, unknown>
>;
/* eslint-enable @typescript-eslint/indent */
