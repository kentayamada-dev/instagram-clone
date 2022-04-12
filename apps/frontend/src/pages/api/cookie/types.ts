import type { ApiHandlerType } from "../../../types/api";

export type CookieBodyType = {
  key: string;
  value: string;
};

/* eslint-disable @typescript-eslint/indent */
export type CookieHandlerType = ApiHandlerType<
  Record<string, unknown>,
  CookieBodyType,
  Record<string, unknown>
>;
/* eslint-enable @typescript-eslint/indent */
