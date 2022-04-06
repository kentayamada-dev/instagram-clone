import type { SignupInput } from "../../../generated/graphql";
import type { ApiHandlerType, AuthResponseType } from "../../../types/api";

/* eslint-disable @typescript-eslint/indent */
export type SignupHandlerType = ApiHandlerType<
  Record<string, unknown>,
  SignupInput,
  AuthResponseType
>;
/* eslint-enable @typescript-eslint/indent */
