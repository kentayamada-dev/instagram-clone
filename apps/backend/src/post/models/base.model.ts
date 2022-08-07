import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType()
export class PostModelBase {
  @Field({ description: "ID" })
  public readonly id!: string;

  @Field(() => String, { description: "Caption", nullable: true })
  public readonly caption?: string;

  @Field({ description: "Image URL" })
  public readonly imageUrl!: string;

  @Field({ description: "Created Date" })
  public readonly createdAt!: Date;

  @Field({ description: "Updated Date" })
  public readonly updatedAt!: Date;
}
