import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class FollowInput {
  @Field({ description: "User ID" })
  public readonly userId!: string;
}
