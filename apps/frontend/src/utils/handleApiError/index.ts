import type { ErrorResponseType } from "../../libs/graphql_request/types";
import type { ErrorObjectType, ApiErrorHandlerType } from "./types";

export const apiErrorHandler: ApiErrorHandlerType = (error) => {
  const { message, status } = (error as ErrorResponseType).response.errors[0]
    .extensions.exception;

  const errorObject: ErrorObjectType = {
    // eslint-disable-next-line @typescript-eslint/naming-convention, camelcase
    error_message: message
  };

  return {
    errorObject,
    errorStatus: status
  };
};
