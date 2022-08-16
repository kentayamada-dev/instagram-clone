import { Field, InputType } from "@nestjs/graphql";
import { Transform } from "class-transformer";
import { IsEmail, Validate } from "class-validator";
import { PasswordValidator } from "../../libs/classValidator/passwordValidator";
import { toLowerCase } from "../../utils/helper";

@InputType()
export class LoginInput {
  @Field({ description: "Email" })
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  @Transform(({ value }) => toLowerCase(value))
  @IsEmail()
  public readonly email!: string;

  @Validate(PasswordValidator, {
    message: "Invalid Password"
  })
  @Field({ description: "Password" })
  public readonly password!: string;
}
