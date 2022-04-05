import { GraphQLClient } from "graphql-request";
import { getSdkWithHooks } from "../../generated/graphql";

const client = new GraphQLClient(process.env["INSTAGRAM_CLONE_API_URL"] ?? "");

export const sdk = getSdkWithHooks(client);
