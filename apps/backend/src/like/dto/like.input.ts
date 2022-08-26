import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class LikeInput {
  @Field({ description: "Post ID" })
  public readonly postId!: string;
}
