import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class PostArgs {
  @Field(() => String, { description: "Caption", nullable: true })
  public readonly caption!: string | null;

  @Field({ description: "Image URL" })
  public readonly imageUrl!: string;
}
