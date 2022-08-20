import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { FollowService } from "../follow/follow.service";
import { PostService } from "../post/post.service";
import { isObjectEmpty } from "../utils/helper";
import type { FollowerModel } from "../follow/models/follower.model";
import type { FollowingModel } from "../follow/models/following.model";
import type { PaginatedFollowerModel } from "../follow/models/paginatedFollower.model";
import type { PaginatedFollowingModel } from "../follow/models/paginatedFollowing.model";
import type { PaginationArgs } from "../pagination/pagination.args";
import type { Edge } from "../pagination/pagination.model";
import type { PostsArgs } from "../post/dto/posts.args";
import type { PostModelBase } from "../post/models/base.model";
import type { PaginatedPostModel } from "../post/models/paginatedBase.model";
import type { MapObjectPropertyToBoolean } from "../types";

@Injectable()
export class UserCommon {
  public constructor(private readonly followService: FollowService, private readonly postService: PostService) {}

  // eslint-disable-next-line max-statements
  public async getPaginatedFollowing(
    userId: string,
    paginationArgs: PaginationArgs,
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
    fieldMap: any
  ): Promise<PaginatedFollowingModel> {
    /* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */
    const { followingUser: edgesNodeFollowingUser, ...edgesNodeProperties } = fieldMap?.edges?.node ?? {};
    const {
      posts: _edgesNodeFollowingUserPosts,
      following: _edgesNodeFollowingUserFollowing,
      follower: _edgesNodeFollowingUserFollower,
      ...edgesNodeFollowingProperties
    } = edgesNodeFollowingUser ?? {};
    const { followingUser: nodesFollowingUser, ...nodesProperties } = fieldMap?.nodes ?? {};
    const {
      posts: _nodesFollowingUserPosts,
      following: _nodesFollowingUserFollowing,
      follower: _nodesFollowingUserFollower,
      ...nodesFollowerProperties
    } = nodesFollowingUser ?? {};
    /* eslint-enable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */

    const followSelect = Prisma.validator<Prisma.FollowSelect>()({
      ...(edgesNodeProperties as MapObjectPropertyToBoolean<Prisma.FollowSelect>),
      ...(nodesProperties as MapObjectPropertyToBoolean<Prisma.FollowSelect>),
      id: true
    });

    const followingSelect = Prisma.validator<Prisma.UserSelect>()({
      ...(edgesNodeFollowingProperties as MapObjectPropertyToBoolean<Prisma.UserSelect>),
      ...(nodesFollowerProperties as MapObjectPropertyToBoolean<Prisma.UserSelect>)
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

    const following = await this.followService.readFollowing<FollowingModel[]>(select, {
      ...paginationArgs,
      userId
    });
    const lastFollowing = following.at(-1);
    const nextFollowingId = lastFollowing ? await this.followService.readNextFollowing(lastFollowing.id, userId) : null;

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

  // eslint-disable-next-line max-statements
  public async getPaginatedFollower(
    userId: string,
    paginationArgs: PaginationArgs,
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
    fieldMap: any
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

    const follower = await this.followService.readFollower<FollowerModel[]>(select, {
      ...paginationArgs,
      userId
    });
    const lastFollower = follower.at(-1);
    const nextFollowerId = lastFollower ? await this.followService.readNextFollower(lastFollower.id, userId) : null;

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

  public async getPaginatedPosts(
    userId: string,
    postsArgs: PostsArgs,
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
    fieldMap: any
  ): Promise<PaginatedPostModel> {
    /* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */
    const edgesNodeProperties = fieldMap?.edges?.node ?? {};
    const nodesProperties = fieldMap?.nodes ?? {};
    /* eslint-enable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */

    const select = Prisma.validator<Prisma.PostSelect>()({
      ...(edgesNodeProperties as MapObjectPropertyToBoolean<Prisma.PostSelect>),
      ...(nodesProperties as MapObjectPropertyToBoolean<Prisma.PostSelect>),
      id: true
    });

    const foundPosts = await this.postService.readPosts<PostModelBase[]>(select, postsArgs, userId);
    const lastPost = foundPosts.at(-1);
    const nextPostId = lastPost ? await this.postService.readNextPostId(lastPost.id, userId) : null;

    const edges: Edge<PostModelBase>[] = foundPosts.map(
      (post): Edge<PostModelBase> => ({
        cursor: post.id,
        node: post
      })
    );

    return {
      edges,
      nodes: foundPosts,
      pageInfo: {
        endCursor: lastPost?.id,
        hasNextPage: Boolean(nextPostId)
      },
      totalCount: foundPosts.length
    };
  }
}
