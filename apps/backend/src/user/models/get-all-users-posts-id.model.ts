/* eslint-disable max-classes-per-file */
import { ObjectType, Field } from "@nestjs/graphql";
import type { StrictPropertyCheck } from "../../types";

@ObjectType()
export class GetAllUsersId {
  @Field({ description: "ID" })
  public readonly id!: string;
}

/* eslint-disable @typescript-eslint/indent, @typescript-eslint/prefer-readonly-parameter-types */
export function isPropertyExactlySameAsGetAllUsersId<T extends GetAllUsersId>(
  _: StrictPropertyCheck<
    T,
    GetAllUsersId,
    "Only properties of GetAllUsersId are allowed"
  > &
    T
): boolean {
  return true;
}
/* eslint-enable @typescript-eslint/indent, @typescript-eslint/prefer-readonly-parameter-types */

/* eslint-enable max-classes-per-file */
