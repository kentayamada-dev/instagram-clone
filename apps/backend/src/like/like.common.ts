import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { isObjectEmpty } from "../utils/helper";
import { LikeService } from "./like.service";
import type { PaginationArgs } from "../pagination/pagination.args";
import type { Edge } from "../pagination/pagination.model";
import type { MapObjectPropertyToBoolean } from "../types";
import type { LikeModel } from "./models/like.model";
import type { PaginatedLikeModel } from "./models/paginatedLike.model";

@Injectable()
export class LikeCommon {
  public constructor(private readonly likeService: LikeService) {}

  // eslint-disable-next-line max-statements, max-params
  public async getPaginatedLikes(
    postId: string | undefined,
    userId: string | undefined,
    paginationArgs: PaginationArgs,
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
    fieldMap: any
  ): Promise<PaginatedLikeModel> {
    /* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */
    const { post: edgesNodePost, user: edgesNodeUser, ...edgesNodeProperties } = fieldMap?.edges?.node ?? {};
    const {
      posts: _edgesNodeUserPosts,
      following: _edgesNodeUserFollowing,
      follower: _edgesNodeUserFollower,
      ...edgesNodeUserProperties
    } = edgesNodeUser ?? {};
    const { user: nodesUser, post: nodesPost, ...nodesProperties } = fieldMap?.nodes ?? {};
    const {
      posts: _nodesUserPosts,
      following: _nodesUserFollowing,
      follower: _nodesUserFollower,
      ...nodesUserProperties
    } = nodesUser ?? {};
    /* eslint-enable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */

    const likeSelect = Prisma.validator<Prisma.LikeSelect>()({
      ...(edgesNodeProperties as MapObjectPropertyToBoolean<Prisma.LikeSelect>),
      ...(nodesProperties as MapObjectPropertyToBoolean<Prisma.LikeSelect>),
      id: true
    });

    const userSelect = Prisma.validator<Prisma.UserSelect>()({
      ...(edgesNodeUserProperties as MapObjectPropertyToBoolean<Prisma.UserSelect>),
      ...(nodesUserProperties as MapObjectPropertyToBoolean<Prisma.UserSelect>)
    });

    const postSelect = Prisma.validator<Prisma.PostSelect>()({
      ...(edgesNodePost as MapObjectPropertyToBoolean<Prisma.PostSelect>),
      ...(nodesPost as MapObjectPropertyToBoolean<Prisma.PostSelect>)
    });

    const select: Prisma.LikeSelect = {
      ...likeSelect,
      ...(!isObjectEmpty(postSelect) && {
        post: {
          select: {
            ...postSelect,
            id: true
          }
        }
      }),
      ...(!isObjectEmpty(userSelect) && {
        user: {
          select: {
            ...userSelect,
            id: true
          }
        }
      })
    };

    const likes = await this.likeService.readLikes<LikeModel[]>(select, { postId, userId, ...paginationArgs });
    const lastLike = likes.at(-1);
    const nextLikeId = lastLike ? await this.likeService.readNextLike(lastLike.id, postId) : null;

    const edges: Edge<LikeModel>[] = likes.map(
      (like): Edge<LikeModel> => ({
        cursor: like.id,
        node: like
      })
    );

    return {
      edges,
      nodes: likes,
      pageInfo: {
        endCursor: lastLike?.id,
        hasNextPage: Boolean(nextLikeId)
      },
      totalCount: likes.length
    };
  }
}
