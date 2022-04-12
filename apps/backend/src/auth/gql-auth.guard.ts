import { Injectable } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { AuthGuard } from "@nestjs/passport";
import type { GqlContext } from "./auth.types";
import type { ExecutionContext } from "@nestjs/common";

@Injectable()
export class GqlAuthGuard extends AuthGuard("jwt") {
  // eslint-disable-next-line class-methods-use-this
  protected getRequest(context: ExecutionContext): unknown {
    const ctx = GqlExecutionContext.create(context);

    return ctx.getContext<GqlContext>().req;
  }
}
