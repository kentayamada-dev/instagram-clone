import { ObjectType, Field } from "@nestjs/graphql";
import type { StrictPropertyCheck } from "../../types";

@ObjectType()
export class GetAllUsersId {
  @Field({ description: "ID" })
  public readonly id!: string;
}

export function isPropertyExactlySameAsGetAllUsersId<T extends GetAllUsersId>(
  _: StrictPropertyCheck<T, GetAllUsersId, "Only properties of GetAllUsersId are allowed"> & T
): boolean {
  return true;
}
