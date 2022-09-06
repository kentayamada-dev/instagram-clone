import type { RequestDocument } from "graphql-request";

export type FetcherType = <ReturnType = unknown, VariablesType = unknown>(
  query: RequestDocument,
  variables?: VariablesType,
  headers?: Record<string, string>
) => Promise<ReturnType>;
