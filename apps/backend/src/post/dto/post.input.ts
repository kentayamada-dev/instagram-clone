import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class UploadInput {
  @Field(() => String, { description: "Caption", nullable: true })
  public readonly caption?: string;

  @Field({ description: "Image URL" })
  public readonly imageUrl!: string;
}
