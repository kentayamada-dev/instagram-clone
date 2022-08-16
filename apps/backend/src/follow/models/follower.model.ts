import { ObjectType, Field } from "@nestjs/graphql";
import { UserModelBase } from "../../user/models/base.model";
import { FollowModelBase } from "./base.model";

@ObjectType()
export class FollowerModel extends FollowModelBase {
  @Field(() => UserModelBase, { description: "Followed User" })
  public readonly followedUser!: UserModelBase;

  @Field({ description: "Followed User ID" })
  public readonly followedUserId!: string;
}
