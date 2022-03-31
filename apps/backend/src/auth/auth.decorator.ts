import { createParamDecorator } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import type { ExecutionContext } from "@nestjs/common";

// eslint-disable-next-line @typescript-eslint/naming-convention
export const CurrentUser = createParamDecorator(
  (_: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
    return ctx.getContext().req.user;
  }
);
