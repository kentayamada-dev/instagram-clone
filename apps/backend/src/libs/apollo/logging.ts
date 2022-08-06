import { Plugin } from "@nestjs/apollo";
import type { ApolloServerPlugin, GraphQLRequestListener, GraphQLRequestContext } from "apollo-server-plugin-base";

/* eslint-disable @typescript-eslint/require-await, no-console */
@Plugin()
export class LoggingPlugin implements ApolloServerPlugin {
  // eslint-disable-next-line class-methods-use-this
  public async requestDidStart({
    request: { query, operationName, variables }
  }: GraphQLRequestContext): Promise<GraphQLRequestListener> {
    return {
      async didEncounterErrors({ errors }): Promise<void> {
        const message = {
          errors: JSON.stringify(errors, null, 2)
        };
        console.error(message);
      },
      async willSendResponse(): Promise<void> {
        const message = {
          operationName,
          query,
          variables
        };
        console.log(message);
      }
    };
  }
}
/* eslint-enable @typescript-eslint/require-await, no-console */
