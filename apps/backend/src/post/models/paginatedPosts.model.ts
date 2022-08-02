import { ObjectType } from "@nestjs/graphql";
import { Paginated } from "../../pagination/pagination.model";
import { PostModel } from "./post.model";

@ObjectType()
export class PaginatedPostsModel extends Paginated(PostModel) {}
