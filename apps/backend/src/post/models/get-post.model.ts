import { ObjectType, Field } from "@nestjs/graphql";
import type { StrictPropertyCheck } from "../../types";

@ObjectType()
export class GetPostModel {
  @Field({ description: "ID" })
  public readonly id!: string;

  @Field(() => String, { description: "Caption", nullable: true })
  public readonly caption!: string | null;

  @Field({ description: "Created Date" })
  public readonly createdAt!: Date;

  @Field({ description: "Image URL" })
  public readonly imageUrl!: string;
}

export function isPropertyExactlySameAsGetPostModel<T extends GetPostModel>(
  _: StrictPropertyCheck<
    T,
    GetPostModel,
    "Only properties of GetPostModel are allowed"
  > &
    T
): boolean {
  return true;
}
