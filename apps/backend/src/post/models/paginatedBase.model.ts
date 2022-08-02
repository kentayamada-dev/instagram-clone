import { ObjectType } from "@nestjs/graphql";
import { Paginated } from "../../pagination/pagination.model";
import { PostModelBase } from "./base.model";

@ObjectType()
export class PaginatedPostModel extends Paginated(PostModelBase) {}
