import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType()
export class AuthModel {
  @Field({ description: "Message" })
  protected readonly message!: string;
}
