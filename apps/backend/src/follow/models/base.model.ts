import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType()
export class FollowModelBase {
  @Field({ description: "ID" })
  public readonly id!: string;

  @Field({ description: "Created Date" })
  public readonly createdAt!: Date;

  @Field({ description: "Updated Date" })
  public readonly updatedAt!: Date;
}
