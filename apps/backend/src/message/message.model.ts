import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType()
export class MessageModel {
  @Field({ description: "Message" })
  public readonly message!: string;
}
