import { Injectable } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { ThrottlerGuard } from "@nestjs/throttler";
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
    const ctx = gqlCtx.getContext();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
    return { req: ctx.req, res: ctx.res };
  }
}
