import { ArgsType, Field } from "@nestjs/graphql";
import { PaginationArgs } from "../../pagination/pagination.args";

@ArgsType()
export class PostsArgs extends PaginationArgs {
  @Field({ description: "Post id to exclude", nullable: true })
  public readonly postId?: string;
}
