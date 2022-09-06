import { GraphQLClient } from "graphql-request";
import { constants } from "../../constants";
import type { FetcherType } from "./types";

const { API_URL } = constants;

const graphQLClient = new GraphQLClient(API_URL, {
  credentials: "include"
});

export const fetcher: FetcherType = async (query, variables, headers) =>
  graphQLClient.request(query, variables, headers);
