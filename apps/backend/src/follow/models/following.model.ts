import { ObjectType, Field } from "@nestjs/graphql";
import { UserModelBase } from "../../user/models/base.model";
import { FollowModelBase } from "./base.model";

@ObjectType()
export class FollowingModel extends FollowModelBase {
  @Field(() => UserModelBase, { description: "Following User" })
  public readonly followingUser!: UserModelBase;

  @Field({ description: "Following UserId ID" })
  public readonly followingUserId!: string;
}
