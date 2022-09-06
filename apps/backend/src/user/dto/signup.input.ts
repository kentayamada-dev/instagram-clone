import { Field, InputType } from "@nestjs/graphql";
import { IsUrl, IsNotEmpty, Validate } from "class-validator";
import { UserIdValidator } from "../../lib/classValidator/userIdValidator";
import { LoginInput } from "./login.input";

@InputType()
export class SignupInput extends LoginInput {
  @Field({ description: "Id" })
  @Validate(UserIdValidator, {
    message: "Invalid Id"
  })
  public readonly id!: string;

  @Field({ description: "Name" })
  @IsNotEmpty()
  public readonly name!: string;

  @Field({ description: "Image Url" })
  @IsUrl()
  public readonly imageUrl!: string;
}
