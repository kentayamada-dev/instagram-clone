import { ObjectType, Field } from "@nestjs/graphql";
import { UserModelBase } from "../../user/models/base.model";
import { PostModelBase } from "./base.model";

@ObjectType()
export class PostModel extends PostModelBase {
  @Field(() => UserModelBase, { description: "Related User" })
  public readonly user!: UserModelBase;

  @Field({ description: "Related User ID" })
  public readonly userId!: string;
}
