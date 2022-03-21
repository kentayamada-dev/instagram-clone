import { ObjectType, Field } from "@nestjs/graphql";
import { PostModel } from "src/post/post.model";

@ObjectType()
export class UserModel {
  @Field(() => [PostModel])
  public readonly posts!: [PostModel];

  public readonly id!: string;
  public readonly name!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}
