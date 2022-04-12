import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType()
export class AuthModel {
  @Field({ description: "Access Token" })
  public readonly accessToken!: string;
}
