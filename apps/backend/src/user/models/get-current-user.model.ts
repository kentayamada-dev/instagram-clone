import { ObjectType, Field } from "@nestjs/graphql";
import { GetPostModel } from "../../post/models/get-post.model";
import { GetUserModel } from "./get-user.model";
import type { StrictPropertyCheck } from "../../types";

@ObjectType()
export class GetCurrentUserModel extends GetUserModel {
  @Field(() => [GetPostModel], { description: "Related Post" })
  public readonly posts!: GetPostModel[];
}

/* eslint-disable @typescript-eslint/indent, @typescript-eslint/prefer-readonly-parameter-types */
export function isPropertyExactlySameAsGetCurrentUserModel<
  T extends GetCurrentUserModel
>(
  _: StrictPropertyCheck<
    T,
    GetCurrentUserModel,
    "Only properties of GetCurrentUserModel are allowed"
  > &
    T
): boolean {
  return true;
}
/* eslint-enable @typescript-eslint/indent, @typescript-eslint/prefer-readonly-parameter-types */
