import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType()
export class UserModelBase {
  @Field({ description: "ID" })
  public readonly id!: string;

  @Field({ description: "Name" })
  public readonly name!: string;

  @Field({ description: "Image URL" })
  public readonly imageUrl!: string;
}
