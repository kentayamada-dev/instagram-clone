import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, Validate } from "class-validator";
import { PasswordValidator } from "../../libs/classValidator/passwordValidator";

@InputType()
export class LoginInput {
  @Field({ description: "Email" })
  @IsEmail()
  public readonly email!: string;

  @Validate(PasswordValidator, {
    message: "Password too weak"
  })
  @Field({ description: "Password" })
  public readonly password!: string;
}
