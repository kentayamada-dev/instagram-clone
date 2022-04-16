import { Field, InputType } from "@nestjs/graphql";
import { Transform } from "class-transformer";
import { IsEmail, Validate } from "class-validator";
import { PasswordValidator } from "../../libs/classValidator/passwordValidator";
import { toLowerCase } from "../../utils/helper/cast.helper";

@InputType()
export class LoginArgs {
  @Field({ description: "Email" })
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  @Transform(({ value }) => toLowerCase(value))
  @IsEmail()
  public readonly email!: string;

  @Validate(PasswordValidator, {
    message: "Password too weak"
  })
  @Field({ description: "Password" })
  public readonly password!: string;
}
