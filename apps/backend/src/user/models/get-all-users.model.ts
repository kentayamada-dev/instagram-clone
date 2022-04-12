/* eslint-disable max-classes-per-file */
import { ObjectType } from "@nestjs/graphql";
import { Paginated } from "../../pagination/pagination.model";
import { GetUserModel } from "./get-user.model";
import type { StrictPropertyCheck } from "../../types";

@ObjectType()
export class GetAllUsersModel extends GetUserModel {}

@ObjectType()
export class PaginatedGetAllUsersModel extends Paginated(GetAllUsersModel) {}

/* eslint-disable @typescript-eslint/indent, @typescript-eslint/prefer-readonly-parameter-types */
export function isPropertyExactlySameAsGetAllUsersModel<
  T extends GetAllUsersModel
>(
  _: StrictPropertyCheck<
    T,
    GetAllUsersModel,
    "Only properties of GetAllUsersModel are allowed"
  > &
    T
): boolean {
  return true;
}
/* eslint-enable @typescript-eslint/indent, @typescript-eslint/prefer-readonly-parameter-types */

/* eslint-enable max-classes-per-file */
