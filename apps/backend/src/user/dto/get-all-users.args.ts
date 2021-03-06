import { ArgsType, Field } from "@nestjs/graphql";
import { PaginationArgs } from "../../pagination/pagination.args";

@ArgsType()
export class GetAllUsersArgs extends PaginationArgs {
  @Field({ description: "User id to exclude", nullable: true })
  public readonly userId?: string;
}
