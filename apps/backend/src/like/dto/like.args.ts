import { ArgsType, Field } from "@nestjs/graphql";
import { PaginationArgs } from "../../pagination/pagination.args";

@ArgsType()
export class LikeArgs extends PaginationArgs {
  @Field(() => String, { description: "Post ID", nullable: true })
  public readonly postId?: string | undefined;

  @Field(() => String, { description: "User ID", nullable: true })
  public readonly userId?: string | undefined;
}
