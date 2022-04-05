/* eslint @typescript-eslint/naming-convention: ["error", {selector: "property", format: ["snake_case"] } ]*/

import type { SignupInput } from "../../../generated/graphql";
import type { ApiHandlerType } from "../../../types/api";

type SuccessType = { success: boolean };

type ErrorType = SuccessType & {
  error_message: string;
};

/* eslint-disable @typescript-eslint/indent */
export type SignupHandlerType = ApiHandlerType<
  Record<string, unknown>,
  SignupInput,
  ErrorType | SuccessType
>;
/* eslint-enable @typescript-eslint/indent */
