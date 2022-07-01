import { createParamDecorator } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import type { GqlContext } from "./auth.types";
import type { ExecutionContext } from "@nestjs/common";

// eslint-disable-next-line @typescript-eslint/naming-convention
export const CurrentUser = createParamDecorator((_: unknown, context: ExecutionContext) => {
  const ctx = GqlExecutionContext.create(context);

  return ctx.getContext<GqlContext>().req.user;
});
