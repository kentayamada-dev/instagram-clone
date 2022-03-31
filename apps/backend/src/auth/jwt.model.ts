import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType()
export class JwtModel {
  @Field({ description: "Access Token" })
  protected readonly accessToken!: string;
}
