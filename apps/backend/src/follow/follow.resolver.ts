import { Args, Query, Resolver } from "@nestjs/graphql";
import { Prisma } from "@prisma/client";
import { FieldMap } from "../libs/nestjs/fieldMap.decorator";
import { isObjectEmpty } from "../utils/helper";
import { FollowArgs } from "./dto/follow.args";
import { FollowService } from "./follow.service";
import { FollowModelBase } from "./models/base.model";
import { PaginatedFollowerModel } from "./models/paginatedFollower.model";
import { PaginatedFollowingModel } from "./models/paginatedFollowing.model";
import type { Edge } from "../pagination/pagination.model";
import type { MapObjectPropertyToBoolean } from "../types";
import type { FollowerModel } from "./models/follower.model";
import type { FollowingModel } from "./models/following.model";

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

    const following = await this.followService.findFollowing<FollowingModel[]>(select, followArgs);
    const lastFollowing = following.at(-1);
    const nextFollowingId = lastFollowing
      ? await this.followService.findNextFollowing(lastFollowing.id, followArgs.userId)
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

    const follower = await this.followService.findFollower<FollowerModel[]>(select, followArgs);
    const lastFollower = follower.at(-1);
    const nextFollowerId = lastFollower
      ? await this.followService.findNextFollower(lastFollower.id, followArgs.userId)
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
}
