import type { LoginInput } from "../../../generated/graphql";
import type { ApiHandlerType, AuthResponseType } from "../../../types/api";

/* eslint-disable @typescript-eslint/indent */
export type LoginHandlerType = ApiHandlerType<
  Record<string, unknown>,
  LoginInput,
  AuthResponseType
>;
/* eslint-enable @typescript-eslint/indent */
