import { Field, InputType } from "@nestjs/graphql";
import { IsUrl } from "class-validator";

@InputType()
export class UploadInput {
  @Field(() => String, { description: "Caption", nullable: true })
  public readonly caption?: string;

  @Field({ description: "Image URL" })
  @IsUrl()
  public readonly imageUrl!: string;
}
