import { ObjectType } from "@nestjs/graphql";
import { Paginated } from "../../pagination/pagination.model";
import { LikeModel } from "./like.model";

@ObjectType()
export class PaginatedLikeModel extends Paginated(LikeModel) {}
