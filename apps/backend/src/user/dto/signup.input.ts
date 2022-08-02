import { Field, InputType } from "@nestjs/graphql";
import { IsUrl, IsNotEmpty } from "class-validator";
import { LoginInput } from "./login.input";

@InputType()
export class SignupInput extends LoginInput {
  @Field({ description: "Name" })
  @IsNotEmpty()
  public readonly name!: string;

  @Field({ description: "Image Url" })
  @IsUrl()
  public readonly imageUrl!: string;
}
