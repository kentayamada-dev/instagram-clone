import { ObjectType, Field } from "@nestjs/graphql";
import { UserModelBase } from "./base.model";

@ObjectType()
export class CurrentUserModel extends UserModelBase {
  @Field({ description: "Email" })
  public readonly email!: string;

  @Field({ description: "Password" })
  public readonly password!: string;
}
