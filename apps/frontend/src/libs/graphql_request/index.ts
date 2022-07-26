import { GraphQLClient } from "graphql-request";
import { constants } from "../../constants";
import type { RequestDocument } from "graphql-request";

const { API_URL } = constants;

const graphQLClient = new GraphQLClient(API_URL, {
  credentials: "include"
});

export const fetcher = async <ReturnType = unknown, VariablesType = unknown>(
  query: RequestDocument,
  variables?: VariablesType,
  headers?: Record<string, string>
): Promise<ReturnType> => graphQLClient.request(query, variables, headers);
