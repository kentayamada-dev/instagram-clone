import { HttpException, HttpStatus, UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Prisma } from "@prisma/client";
import { CurrentUser } from "../auth/auth.decorator";
import { JwtPayload } from "../auth/auth.types";
import { GqlAuthGuard } from "../auth/gqlAuth.guard";
import { FieldMap } from "../libs/nestjs/fieldMap.decorator";
import { isObjectEmpty } from "../utils/helper";
import { FollowArgs } from "./dto/follow.args";
import { FollowInput } from "./dto/follow.input";
import { FollowService } from "./follow.service";
import { FollowModelBase } from "./models/base.model";
import { FollowingModel } from "./models/following.model";
import { PaginatedFollowerModel } from "./models/paginatedFollower.model";
import { PaginatedFollowingModel } from "./models/paginatedFollowing.model";
import type { Edge } from "../pagination/pagination.model";
import type { MapObjectPropertyToBoolean } from "../types";
import type { FollowerModel } from "./models/follower.model";

@Resolver(FollowModelBase)
export class FollowResolver {
  public constructor(private readonly followService: FollowService) {}

  @Query(() => PaginatedFollowingModel, { description: "Get Following" })
  // eslint-disable-next-line max-statements
  protected async following(
    @Args() followArgs: FollowArgs,
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
    @FieldMap() fieldMap: any
  ): Promise<PaginatedFollowingModel> {
    /* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */
    const { followingUser: edgesNodeFollowingUser, ...edgesNodeProperties } = fieldMap?.edges?.node ?? {};
    const {
      posts: _edgesNodeFollowingPosts,
      following: _edgesNodeFollowingUserFollowing,
      follower: _edgesNodeFollowingUserFollower,
      ...edgesNodeFollowingProperties
    } = edgesNodeFollowingUser ?? {};
    const { followingUser: nodesFollowingUser, ...nodesProperties } = fieldMap?.nodes ?? {};
    const {
      posts: _nodesFollowingPosts,
      following: _nodesFollowingUserFollowing,
      follower: _nodesFollowingUserFollower,
      ...nodesFollowingProperties
    } = nodesFollowingUser ?? {};
    /* eslint-enable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */

    const followSelect = Prisma.validator<Prisma.FollowSelect>()({
      ...(edgesNodeProperties as MapObjectPropertyToBoolean<Prisma.FollowSelect>),
      ...(nodesProperties as MapObjectPropertyToBoolean<Prisma.FollowSelect>),
      id: true
    });

    const followingSelect = Prisma.validator<Prisma.UserSelect>()({
      ...(edgesNodeFollowingProperties as MapObjectPropertyToBoolean<Prisma.UserSelect>),
      ...(nodesFollowingProperties as MapObjectPropertyToBoolean<Prisma.UserSelect>)
    });

    const select: Prisma.FollowSelect = {
      ...followSelect,
      ...(!isObjectEmpty(followingSelect) && {
        followingUser: {
          select: {
            ...followingSelect,
            id: true
          }
        }
      })
    };

    const following = await this.followService.readFollowing<FollowingModel[]>(select, followArgs);
    const lastFollowing = following.at(-1);
    const nextFollowingId = lastFollowing
      ? await this.followService.readNextFollowing(lastFollowing.id, followArgs.userId)
      : null;

    const edges: Edge<FollowingModel>[] = following.map(
      (post): Edge<FollowingModel> => ({
        cursor: post.id,
        node: post
      })
    );

    return {
      edges,
      nodes: following,
      pageInfo: {
        endCursor: lastFollowing?.id,
        hasNextPage: Boolean(nextFollowingId)
      },
      totalCount: following.length
    };
  }

  @Query(() => PaginatedFollowerModel, { description: "Get Follower" })
  // eslint-disable-next-line max-statements
  protected async follower(
    @Args() followArgs: FollowArgs,
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
    @FieldMap() fieldMap: any
  ): Promise<PaginatedFollowerModel> {
    /* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */
    const { followedUser: edgesNodeFollowedUser, ...edgesNodeProperties } = fieldMap?.edges?.node ?? {};
    const {
      posts: _edgesNodeFollowedUserPosts,
      follower: _edgesNodeFollowedUserFollower,
      following: _edgesNodeFollowedUserFollowing,
      ...edgesNodeFollowerProperties
    } = edgesNodeFollowedUser ?? {};
    const { followedUser: nodesFollowedUser, ...nodesProperties } = fieldMap?.nodes ?? {};
    const {
      posts: _nodesFollowedUserPosts,
      follower: _nodesFollowedUserFollower,
      following: _nodesFollowedUserFollowing,
      ...nodesFollowerProperties
    } = nodesFollowedUser ?? {};
    /* eslint-enable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */

    const followSelect = Prisma.validator<Prisma.FollowSelect>()({
      ...(edgesNodeProperties as MapObjectPropertyToBoolean<Prisma.FollowSelect>),
      ...(nodesProperties as MapObjectPropertyToBoolean<Prisma.FollowSelect>),
      id: true
    });

    const followerSelect = Prisma.validator<Prisma.UserSelect>()({
      ...(edgesNodeFollowerProperties as MapObjectPropertyToBoolean<Prisma.UserSelect>),
      ...(nodesFollowerProperties as MapObjectPropertyToBoolean<Prisma.UserSelect>)
    });

    const select: Prisma.FollowSelect = {
      ...followSelect,
      ...(!isObjectEmpty(followerSelect) && {
        followedUser: {
          select: {
            ...followerSelect,
            id: true
          }
        }
      })
    };

    const follower = await this.followService.readFollower<FollowerModel[]>(select, followArgs);
    const lastFollower = follower.at(-1);
    const nextFollowerId = lastFollower
      ? await this.followService.readNextFollower(lastFollower.id, followArgs.userId)
      : null;

    const edges: Edge<FollowerModel>[] = follower.map(
      (post): Edge<FollowerModel> => ({
        cursor: post.id,
        node: post
      })
    );

    return {
      edges,
      nodes: follower,
      pageInfo: {
        endCursor: lastFollower?.id,
        hasNextPage: Boolean(nextFollowerId)
      },
      totalCount: follower.length
    };
  }

  @Mutation(() => FollowingModel, { description: "Follow User" })
  @UseGuards(GqlAuthGuard)
  // eslint-disable-next-line max-statements
  protected async follow(
    @CurrentUser() currentUser: JwtPayload,
    @Args("followInput") followInput: FollowInput,
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
    @FieldMap() fieldMap: any
  ): Promise<FollowingModel> {
    let followData: FollowingModel | null = null;
    /* eslint-disable @typescript-eslint/no-unsafe-assignment */
    const { followingUser, ...followProperties } = fieldMap ?? {};
    const {
      posts: _followingUserPosts,
      following: _followingUserFollowing,
      follower: _followingUserFollower,
      ...followingUserProperties
    } = followingUser ?? {};
    /* eslint-enable @typescript-eslint/no-unsafe-assignment */

    const followSelect = Prisma.validator<Prisma.FollowSelect>()({
      ...(followProperties as MapObjectPropertyToBoolean<Prisma.FollowSelect>),
      id: true
    });

    const followingUserSelect = Prisma.validator<Prisma.UserSelect>()({
      ...(followingUserProperties as MapObjectPropertyToBoolean<Prisma.UserSelect>)
    });

    const select: Prisma.FollowSelect = {
      ...followSelect,
      ...(!isObjectEmpty(followingUserSelect) && {
        followingUser: {
          select: {
            ...followingUserSelect,
            id: true
          }
        }
      })
    };

    try {
      followData = await this.followService.createFollow<FollowingModel>(select, currentUser.id, followInput.userId);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        const target = error.meta?.["target"] as string[];

        if (JSON.stringify(target) === JSON.stringify(["followedUserId", "followingUserId"])) {
          throw new HttpException("User Already Followed", HttpStatus.CONFLICT);
        }
      }

      throw new HttpException("INTERNAL SERVER ERROR", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return followData;
  }

  @Mutation(() => FollowingModel, { description: "Unfollow User" })
  @UseGuards(GqlAuthGuard)
  // eslint-disable-next-line max-statements
  protected async unfollow(
    @CurrentUser() currentUser: JwtPayload,
    @Args("followInput") followInput: FollowInput,
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
    @FieldMap() fieldMap: any
  ): Promise<FollowingModel> {
    let followData: FollowingModel | null = null;
    /* eslint-disable @typescript-eslint/no-unsafe-assignment */
    const { followingUser, ...followProperties } = fieldMap ?? {};
    const {
      posts: _followingUserPosts,
      following: _followingUserFollowing,
      follower: _followingUserFollower,
      ...followingUserProperties
    } = followingUser ?? {};
    /* eslint-enable @typescript-eslint/no-unsafe-assignment */

    const followSelect = Prisma.validator<Prisma.FollowSelect>()({
      ...(followProperties as MapObjectPropertyToBoolean<Prisma.FollowSelect>),
      id: true
    });

    const followingUserSelect = Prisma.validator<Prisma.UserSelect>()({
      ...(followingUserProperties as MapObjectPropertyToBoolean<Prisma.UserSelect>)
    });

    const select: Prisma.FollowSelect = {
      ...followSelect,
      ...(!isObjectEmpty(followingUserSelect) && {
        followingUser: {
          select: {
            ...followingUserSelect,
            id: true
          }
        }
      })
    };

    try {
      followData = await this.followService.deleteFollow<FollowingModel>(select, currentUser.id, followInput.userId);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        const isAlreadyUnfollowed = error.meta?.["cause"] === "Record to delete does not exist.";

        if (isAlreadyUnfollowed) {
          throw new HttpException("User Already Unfollowed", HttpStatus.CONFLICT);
        }
      }

      throw new HttpException("INTERNAL SERVER ERROR", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return followData;
  }
}
