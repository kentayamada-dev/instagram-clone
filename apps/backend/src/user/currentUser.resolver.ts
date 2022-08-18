import { HttpException, HttpStatus, UseGuards } from "@nestjs/common";
import { Resolver, Query, ResolveField, Args, Parent } from "@nestjs/graphql";
import { Prisma } from "@prisma/client";
import { CurrentUser } from "../auth/auth.decorator";
import { JwtPayload } from "../auth/auth.types";
import { GqlAuthGuard } from "../auth/gqlAuth.guard";
import { PaginatedFollowerModel } from "../follow/models/paginatedFollower.model";
import { PaginatedFollowingModel } from "../follow/models/paginatedFollowing.model";
import { FieldMap } from "../libs/nestjs/fieldMap.decorator";
import { PaginationArgs } from "../pagination/pagination.args";
import { PaginatedPostModel } from "../post/models/paginatedBase.model";
import { CurrentUserModel } from "./models/currentUser.model";
import { UserCommon } from "./user.common";
import { UserService } from "./user.service";
import type { MapObjectPropertyToBoolean } from "../types";

@Resolver(CurrentUserModel)
export class CurrentUserResolver {
  public constructor(private readonly userCommon: UserCommon, private readonly userService: UserService) {}

  @Query(() => CurrentUserModel, { description: "Get Current User" })
  @UseGuards(GqlAuthGuard)
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  protected async currentUser(@CurrentUser() user: JwtPayload, @FieldMap() fieldMap: any): Promise<CurrentUserModel> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { posts: _posts, follower: _follower, following: _following, ...userProperties } = fieldMap ?? {};

    const select = Prisma.validator<Prisma.UserSelect>()({
      ...(userProperties as MapObjectPropertyToBoolean<Prisma.UserSelect>),
      id: true
    });

    const foundUser = await this.userService.readUser<CurrentUserModel | null>({
      select,
      where: {
        id: user.id
      }
    });

    if (!foundUser) {
      throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    }

    return foundUser;
  }

  @ResolveField(() => PaginatedFollowingModel, { description: "Get Related Following" })
  protected async following(
    @CurrentUser() user: JwtPayload,
    @Args() paginationArgs: PaginationArgs,
    @FieldMap() fieldMap: Record<string, unknown>
  ): Promise<PaginatedFollowingModel> {
    return this.userCommon.getPaginatedFollowing(user.id, paginationArgs, fieldMap);
  }

  @ResolveField(() => PaginatedFollowerModel, { description: "Get Related Follower" })
  protected async follower(
    @CurrentUser() user: JwtPayload,
    @Args() paginationArgs: PaginationArgs,
    @FieldMap() fieldMap: Record<string, unknown>
  ): Promise<PaginatedFollowerModel> {
    return this.userCommon.getPaginatedFollower(user.id, paginationArgs, fieldMap);
  }

  @ResolveField(() => PaginatedPostModel, { description: "Get Related Posts" })
  protected async posts(
    @Parent() user: CurrentUserModel,
    @Args() paginationArgs: PaginationArgs,
    @FieldMap() fieldMap: Record<string, unknown>
  ): Promise<PaginatedPostModel> {
    return this.userCommon.getPaginatedPosts(user.id, paginationArgs, fieldMap);
  }
}
