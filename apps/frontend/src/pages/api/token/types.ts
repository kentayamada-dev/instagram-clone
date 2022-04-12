import type { NextApiRequest, NextApiResponse } from "next";

type ApiHandlerType<
  QueryType = unknown,
  BodyType = unknown,
  ResponseType = unknown
> = (
  req: Omit<NextApiRequest, "body" | "query"> & {
    query: QueryType;
    body: BodyType;
  },
  res: NextApiResponse<ResponseType>
) => Promise<void> | void;

export type TokenBodyType = {
  token: string;
};

/* eslint-disable @typescript-eslint/indent */
export type TokenHandlerType = ApiHandlerType<
  Record<string, unknown>,
  TokenBodyType,
  Record<string, unknown>
>;
/* eslint-enable @typescript-eslint/indent */
