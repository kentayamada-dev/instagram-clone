import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import type { PaginationArgs } from "../pagination/pagination.args";
import type { UploadInput } from "./dto/post.input";
import type { PostsArgs } from "./dto/posts.args";
import type { Prisma } from "@prisma/client";

@Injectable()
export class PostService {
  public constructor(private readonly prismaService: PrismaService) {}

  public async readNextPostId(lastPostId: string, userId?: string): Promise<string | undefined> {
    return this.prismaService.post
      .findMany({
        cursor: { id: lastPostId },
        orderBy: {
          createdAt: "desc"
        },
        ...(userId && {
          where: {
            userId
          }
        }),
        select: {
          id: true
        },
        skip: 1,
        take: 1
      })
      .then((value) => value[0]?.id);
  }

  public async readPosts<T>(
    select: Prisma.PostSelect,
    { first, after, postIdExcluded }: PostsArgs,
    userId: string
  ): Promise<T> {
    return (await this.prismaService.post.findMany({
      ...(after && { cursor: { id: after }, skip: 1 }),
      orderBy: {
        createdAt: "desc"
      },
      select,
      ...(Boolean(first) && { take: first }),
      where: {
        userId,
        ...(postIdExcluded && {
          // eslint-disable-next-line @typescript-eslint/naming-convention
          NOT: {
            id: {
              equals: postIdExcluded
            }
          }
        })
      }
    })) as unknown as T;
  }

  public async readPostsWithUser<T>(select: Prisma.PostSelect, { first, after }: PaginationArgs): Promise<T> {
    return (await this.prismaService.post.findMany({
      ...(after ? { cursor: { id: after }, skip: 1 } : {}),
      orderBy: {
        createdAt: "desc"
      },
      select,
      ...(Boolean(first) && { take: first })
    })) as unknown as T;
  }

  public async readPost<T>(select: Prisma.PostSelect, postId: string): Promise<T> {
    return (await this.prismaService.post.findUnique({
      select,
      where: {
        id: postId
      }
    })) as unknown as T;
  }

  // eslint-disable-next-line max-params
  public async createPost<T>(
    select: Prisma.PostSelect,
    { caption, imageUrl }: UploadInput,
    userId: string
  ): Promise<T> {
    return (await this.prismaService.post.create({
      data: {
        imageUrl,
        ...(caption && { caption }),
        userId
      },
      select
    })) as unknown as T;
  }
}
