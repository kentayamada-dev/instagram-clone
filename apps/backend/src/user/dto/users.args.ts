import { ArgsType, Field } from "@nestjs/graphql";
import { PaginationArgs } from "../../pagination/pagination.args";

@ArgsType()
export class UsersArgs extends PaginationArgs {
  @Field({ description: "User ID to be excluded", nullable: true })
  public readonly userIdExcluded?: string;

  @Field({ description: "User ID search query", nullable: true })
  public readonly userIdQuery?: string;
}
