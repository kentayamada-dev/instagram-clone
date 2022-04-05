/* eslint @typescript-eslint/naming-convention: ["error", {selector: "property", format: ["snake_case"] } ]*/

import type { ApiHandlerType } from "../../../types/api";

type SuccessType = { success: boolean };

type ErrorType = SuccessType & {
  error_message: string;
};

/* eslint-disable @typescript-eslint/indent */
export type LogoutHandlerType = ApiHandlerType<
  Record<string, unknown>,
  Record<string, unknown>,
  ErrorType | SuccessType
>;
/* eslint-enable @typescript-eslint/indent */
