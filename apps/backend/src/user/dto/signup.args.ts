import { Field, InputType } from "@nestjs/graphql";
import { IsUrl, IsNotEmpty } from "class-validator";
import { LoginArgs } from "./login.args";

@InputType()
export class SignupArgs extends LoginArgs {
  @Field({ description: "Name" })
  @IsNotEmpty()
  public readonly name!: string;

  @Field({ description: "Image Url" })
  @IsUrl()
  public readonly imageUrl!: string;
}
