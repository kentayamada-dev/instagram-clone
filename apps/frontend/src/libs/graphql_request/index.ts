import { GraphQLClient } from "graphql-request";
import { getSdkWithHooks } from "../../generated/graphql";

const client = new GraphQLClient(
  process.env["NEXT_PUBLIC_INSTAGRAM_CLONE_API_URL"] ?? ""
);

export const sdk = getSdkWithHooks(client);
