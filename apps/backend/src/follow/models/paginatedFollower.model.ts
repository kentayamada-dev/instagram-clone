import { ObjectType } from "@nestjs/graphql";
import { Paginated } from "../../pagination/pagination.model";
import { FollowerModel } from "./follower.model";

@ObjectType()
export class PaginatedFollowerModel extends Paginated(FollowerModel) {}
