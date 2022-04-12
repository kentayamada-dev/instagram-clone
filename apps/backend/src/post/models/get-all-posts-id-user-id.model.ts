import { ObjectType, Field } from "@nestjs/graphql";
import { GetAllUsersId } from "../../user/models/get-all-users-posts-id.model";
import type { StrictPropertyCheck } from "../../types";

@ObjectType()
export class GetAllPostsIdAndUserId {
  @Field({ description: "ID" })
  public readonly id!: string;

  @Field(() => GetAllUsersId, { description: "Related User ID" })
  public readonly user!: GetAllUsersId;
}

/* eslint-disable @typescript-eslint/indent, @typescript-eslint/prefer-readonly-parameter-types */
export function isPropertyExactlySameAsGetAllPostsIdAndUserId<
  T extends GetAllPostsIdAndUserId
>(
  _: StrictPropertyCheck<
    T,
    GetAllPostsIdAndUserId,
    "Only properties of GetAllPostsIdAndUserId are allowed"
  > &
    T
): boolean {
  return true;
}
/* eslint-enable @typescript-eslint/indent, @typescript-eslint/prefer-readonly-parameter-types */
