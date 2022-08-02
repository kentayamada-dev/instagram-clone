import { ObjectType } from "@nestjs/graphql";
import { Paginated } from "../../pagination/pagination.model";
import { UserModelBase } from "./base.model";

@ObjectType()
export class PaginatedUserModel extends Paginated(UserModelBase) {}
