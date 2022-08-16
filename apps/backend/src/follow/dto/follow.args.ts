import { ArgsType, Field } from "@nestjs/graphql";
import { PaginationArgs } from "../../pagination/pagination.args";

@ArgsType()
export class FollowArgs extends PaginationArgs {
  @Field({ description: "User ID" })
  public readonly userId!: string;
}
