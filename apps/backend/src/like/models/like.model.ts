import { ObjectType, Field } from "@nestjs/graphql";
import { PostModelBase } from "../../post/models/base.model";
import { UserModelBase } from "../../user/models/base.model";

@ObjectType()
export class LikeModel {
  @Field({ description: "ID" })
  public readonly id!: string;

  @Field(() => UserModelBase, { description: "Liked User" })
  public readonly user!: UserModelBase;

  @Field({ description: "Liked User ID" })
  public readonly userId!: string;

  @Field(() => PostModelBase, { description: "Liked Post" })
  public readonly post!: PostModelBase;

  @Field({ description: "Liked Post ID" })
  public readonly postId!: string;

  @Field({ description: "Created Date" })
  public readonly createdAt!: Date;

  @Field({ description: "Updated Date" })
  public readonly updatedAt!: Date;
}
