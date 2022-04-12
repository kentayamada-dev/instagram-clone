import { HttpException, HttpStatus } from "@nestjs/common";
import { Resolver, Query, Args } from "@nestjs/graphql";
import { SkipThrottle } from "@nestjs/throttler";
import { PaginationArgs } from "../pagination/pagination.args";
import { PrismaService } from "../prisma/prisma.service";
import { isPropertyExactlySameAsGetUserModel } from "../user/models/get-user.model";
import {
  GetAllPostsIdAndUserId,
  isPropertyExactlySameAsGetAllPostsIdAndUserId
} from "./models/get-all-posts-id-user-id.model";
import {
  GetAllPostsModel,
  isPropertyExactlySameAsGetAllPostsModel,
  PaginatedGetAllPostsModel
} from "./models/get-all-posts.model";
import type { Edge } from "../pagination/pagination.model";

@Resolver()
export class PostResolver {
  // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
  public constructor(private readonly prismaService: PrismaService) {}

  @SkipThrottle()
  @Query(() => [GetAllPostsIdAndUserId], {
    description: "Get All Posts ID and Related User ID"
  })
  protected async getAllPostsIdAndUserId(): Promise<GetAllPostsIdAndUserId[]> {
    const foundPosts = await this.prismaService.post
      .findMany({
        orderBy: { createdAt: "desc" },
        select: { id: true, user: { select: { id: true } } }
      })
      .then((postsData) => {
        const [firstPost] = postsData;
        if (
          firstPost &&
          isPropertyExactlySameAsGetAllPostsIdAndUserId(firstPost)
        ) {
          return postsData;
        }

        return [];
      });

    return foundPosts;
  }

  @SkipThrottle()
  @Query(() => GetAllPostsModel, { description: "Get Post" })
  protected async getPost(@Args("id") id: string): Promise<GetAllPostsModel> {
    const foundPost = await this.prismaService.post
      .findUnique({
        select: {
          caption: true,
          createdAt: true,
          id: true,
          imageUrl: true,
          user: {
            select: {
              id: true,
              imageUrl: true,
              name: true
            }
          }
        },
        where: {
          id
        }
      })
      .then((postsData) => {
        if (!postsData) {
          return null;
        }
        if (isPropertyExactlySameAsGetAllPostsModel(postsData)) {
          if (isPropertyExactlySameAsGetUserModel(postsData.user)) {
            return postsData;
          }

          return postsData;
        }

        return null;
      });

    if (!foundPost) {
      throw new HttpException("Post not found", HttpStatus.UNAUTHORIZED);
    }

    return foundPost;
  }

  @Query(() => PaginatedGetAllPostsModel, { description: "Get All Posts" })
  protected async getAllPosts(
    @Args() { first, after }: PaginationArgs
  ): Promise<PaginatedGetAllPostsModel> {
    const posts = await this.prismaService.post
      .findMany({
        // eslint-disable-next-line @typescript-eslint/no-extra-parens
        ...(after ? { cursor: { id: after }, skip: 1 } : {}),
        orderBy: {
          createdAt: "desc"
        },
        select: {
          caption: true,
          createdAt: true,
          id: true,
          imageUrl: true,
          user: {
            select: {
              id: true,
              imageUrl: true,
              name: true
            }
          }
        },
        take: first
      })
      .then((postsData) => {
        const [firstPost] = postsData;
        if (
          firstPost &&
          isPropertyExactlySameAsGetAllPostsModel(firstPost) &&
          isPropertyExactlySameAsGetUserModel(firstPost.user)
        ) {
          return postsData;
        }

        return [];
      });

    const lastPost = posts.at(-1);

    const nextPostId = lastPost
      ? await this.prismaService.post
          .findMany({
            cursor: { id: lastPost.id },
            orderBy: {
              createdAt: "desc"
            },
            select: {
              id: true
            },
            skip: 1,
            take: 1
          })
          .then((value) => value[0]?.id)
      : [];

    const edges: Edge<GetAllPostsModel>[] = posts.map(
      (post): Edge<GetAllPostsModel> => ({
        cursor: post.id,
        node: post
      })
    );

    return {
      edges,
      nodes: posts,
      pageInfo: {
        endCursor: lastPost?.id,
        hasNextPage: Boolean(nextPostId)
      }
    };
  }
}
