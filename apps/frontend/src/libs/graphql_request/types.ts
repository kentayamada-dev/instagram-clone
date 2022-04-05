export type ErrorResponseType = {
  response: {
    errors: [
      {
        extensions: {
          exception: {
            status: number;
            message: string;
          };
        };
      }
    ];
  };
};
