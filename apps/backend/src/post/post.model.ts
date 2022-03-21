import { ObjectType, Field } from "@nestjs/graphql";
import { UserModel } from "src/user/user.model";

@ObjectType()
export class PostModel {
  @Field(() => UserModel, { description: "ユーザー" })
  public readonly user!: UserModel;

  @Field({ description: "id" })
  public readonly id!: string;

  @Field({ description: "title" })
  public readonly title!: string;

  @Field({ description: "createdAt" })
  public readonly createdAt!: Date;

  @Field({ description: "updatedAt" })
  public readonly updatedAt!: Date;
}
