/* eslint-disable @typescript-eslint/indent */
export type ErrorObjectType =
  | Record<string, unknown>
  | {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      error_message: string;
    };
/* eslint-enable @typescript-eslint/indent */

type ApiErrorHandlerResponseType = {
  errorObject: ErrorObjectType;
  errorStatus: number;
};

export type ApiErrorHandlerType = (
  error: unknown
) => ApiErrorHandlerResponseType;

export type ApiErrorResponseType = {
  response: {
    errors: [
      {
        extensions: {
          exception: {
            status: number;
          };
        };
      }
    ];
  };
};
