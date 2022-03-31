import { ObjectType, Field } from "@nestjs/graphql";
import type { StrictPropertyCheck } from "../../types";

@ObjectType()
export class GetUserModel {
  @Field({ description: "ID" })
  public readonly id!: string;

  @Field({ description: "Name" })
  public readonly name!: string;

  @Field({ description: "Image URL" })
  public readonly imageUrl!: string;
}

/* eslint-disable @typescript-eslint/indent, @typescript-eslint/prefer-readonly-parameter-types */
export function isPropertyExactlySameAsGetUserModel<T extends GetUserModel>(
  _: StrictPropertyCheck<
    T,
    GetUserModel,
    "Only properties of GetUserModel are allowed"
  > &
    T
): boolean {
  return true;
}

/* eslint-enable @typescript-eslint/indent, @typescript-eslint/prefer-readonly-parameter-types */
