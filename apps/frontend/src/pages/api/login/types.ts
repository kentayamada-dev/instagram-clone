/* eslint @typescript-eslint/naming-convention: ["error", {selector: "property", format: ["snake_case"] } ]*/

import type { LoginInput } from "../../../generated/graphql";
import type { ApiHandlerType } from "../../../types/api";

type SuccessType = { success: boolean };

type ErrorType = SuccessType & {
  error_message: string;
};

/* eslint-disable @typescript-eslint/indent */
export type LoginHandlerType = ApiHandlerType<
  Record<string, unknown>,
  LoginInput,
  ErrorType | SuccessType
>;
/* eslint-enable @typescript-eslint/indent */
