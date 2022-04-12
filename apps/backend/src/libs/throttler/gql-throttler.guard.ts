import { Injectable } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { ThrottlerGuard } from "@nestjs/throttler";
import type { GqlContext } from "../../auth/auth.types";
import type { ExecutionContext } from "@nestjs/common";

type GetRequestResponse = ReturnType<ThrottlerGuard["getRequestResponse"]>;

@Injectable()
export class GqlThrottlerGuard extends ThrottlerGuard {
  // eslint-disable-next-line class-methods-use-this
  protected override getRequestResponse(
    context: ExecutionContext
  ): GetRequestResponse {
    const gqlCtx = GqlExecutionContext.create(context);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { req, res } = gqlCtx.getContext<GqlContext>();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    return { req, res };
  }
}
