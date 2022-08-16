import { ObjectType } from "@nestjs/graphql";
import { Paginated } from "../../pagination/pagination.model";
import { FollowingModel } from "./following.model";

@ObjectType()
export class PaginatedFollowingModel extends Paginated(FollowingModel) {}
