import { ArgsType, Field } from "@nestjs/graphql";
import { PaginationArgs } from "../../pagination/pagination.args";

@ArgsType()
export class PostsArgs extends PaginationArgs {
  @Field({ description: "Post ID to be excluded", nullable: true })
  public readonly postIdExcluded?: string;
}
