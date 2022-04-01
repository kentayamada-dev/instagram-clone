/* eslint-disable max-classes-per-file */
import { ObjectType, Field } from "@nestjs/graphql";
import { Paginated } from "../../pagination/pagination.model";
import { GetUserModel } from "../../user/models/get-user.model";
import { GetPostModel } from "./get-post.model";
import type { StrictPropertyCheck } from "../../types";

@ObjectType()
export class GetAllPostsModel extends GetPostModel {
  @Field(() => GetUserModel, { description: "Related User" })
  public readonly user!: GetUserModel;
}

@ObjectType()
export class PaginatedGetAllPostsModel extends Paginated(GetAllPostsModel) {}

/* eslint-disable @typescript-eslint/indent, @typescript-eslint/prefer-readonly-parameter-types */
export function isPropertyExactlySameAsGetAllPostsModel<
  T extends GetAllPostsModel
>(
  _: StrictPropertyCheck<
    T,
    GetAllPostsModel,
    "Only properties of GetAllPostsModel are allowed"
  > &
    T
): boolean {
  return true;
}
/* eslint-enable @typescript-eslint/indent, @typescript-eslint/prefer-readonly-parameter-types */

/* eslint-enable max-classes-per-file */
