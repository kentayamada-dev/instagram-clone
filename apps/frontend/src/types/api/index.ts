import type { NextApiRequest, NextApiResponse } from "next";

export type ApiHandlerType<QueryType = unknown, BodyType = unknown, ResponseType = unknown> = (
  req: Omit<NextApiRequest, "body" | "query"> & {
    query: QueryType;
    body: BodyType;
  },
  res: NextApiResponse<ResponseType>
) => Promise<void> | void;
