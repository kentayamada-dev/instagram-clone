import { createParamDecorator } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import type { ExecutionContext } from "@nestjs/common";

/* eslint-disable @typescript-eslint/naming-convention, @typescript-eslint/no-unsafe-return, @typescript-eslint/strict-boolean-expressions, @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment */
function getNodeData(node: any): Record<string, unknown> {
  const { selectionSet } = node || {};
  let fields: any = true;
  if (selectionSet) {
    fields = {};
    selectionSet.selections.forEach((selection: any) => {
      const name = selection.name.value;
      fields[name] = getNodeData(selection);
    });
  }

  return fields;
}

export const FieldMap = createParamDecorator((_, ctx: ExecutionContext): Record<string, unknown> => {
  const gqlCtx = GqlExecutionContext.create(ctx);
  const info = gqlCtx.getInfo();
  const [node] = info.fieldNodes;

  return getNodeData(node);
});
/* eslint-enable @typescript-eslint/naming-convention, @typescript-eslint/no-unsafe-return, @typescript-eslint/strict-boolean-expressions, @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment */
