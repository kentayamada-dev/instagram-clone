import { Resolver, Query, Args } from "@nestjs/graphql";
import { PaginationArgs } from "../pagination/pagination.args";
import { PrismaService } from "../prisma/prisma.service";
import { isPropertyExactlySameAsGetUserModel } from "../user/models/get-user.model";
import {
  isPropertyExactlySameAsGetAllPostsModel,
  PaginatedGetAllPostsModel
} from "./models/get-all-posts.model";
import type { Edge } from "../pagination/pagination.model";
import type { GetAllPostsModel } from "./models/get-all-posts.model";

@Resolver()
export class PostResolver {
  // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
  public constructor(private readonly prismaService: PrismaService) {}

  @Query(() => PaginatedGetAllPostsModel, { description: "Get All Posts" })
  protected async getAllPosts(
    @Args() { cursor, limit }: PaginationArgs
  ): Promise<PaginatedGetAllPostsModel> {
    const lastIndex = -1;
    const firstIndex = 0;
    const posts = await this.prismaService.post
      .findMany({
        // eslint-disable-next-line @typescript-eslint/no-extra-parens
        ...(cursor ? { cursor: { id: cursor }, skip: 1 } : {}),
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
        take: limit
      })
      .then((postsData) => {
        const firstPost = postsData[firstIndex];
        if (
          firstPost &&
          isPropertyExactlySameAsGetAllPostsModel(firstPost) &&
          isPropertyExactlySameAsGetUserModel(firstPost.user)
        ) {
          return postsData;
        }

        return [];
      });

    const lastPost = posts.at(lastIndex);

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
          .then((value) => value[firstIndex]?.id)
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
