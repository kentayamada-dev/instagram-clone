import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType()
export class UserModelBase {
  @Field({ description: "ID" })
  public readonly id!: string;

  @Field({ description: "Name" })
  public readonly name!: string;

  @Field({ description: "Image URL" })
  public readonly imageUrl!: string;

  @Field({ description: "Created Date" })
  public readonly createdAt!: Date;

  @Field({ description: "Updated Date" })
  public readonly updatedAt!: Date;
}
