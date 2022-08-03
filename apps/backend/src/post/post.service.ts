import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import type { PaginationArgs } from "../pagination/pagination.args";
import type { UploadInput } from "./dto/post.input";
import type { Prisma } from "@prisma/client";

@Injectable()
export class PostService {
  public constructor(private readonly prismaService: PrismaService) {}

  public async findNextPostId(lastPostId: string, userId?: string): Promise<string | undefined> {
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

  public async findPosts<T>(select: Prisma.PostSelect, { first, after }: PaginationArgs, userId: string): Promise<T> {
    return (await this.prismaService.post.findMany({
      ...(after && { cursor: { id: after }, skip: 1 }),
      orderBy: {
        createdAt: "desc"
      },
      select,
      ...(Boolean(first) && { take: first }),
      where: {
        userId
      }
    })) as unknown as T;
  }

  public async findPostsWithUser<T>(
    postSelect: Prisma.PostSelect,
    userSelect: Prisma.UserSelect,
    { first, after }: PaginationArgs
  ): Promise<T> {
    return (await this.prismaService.post.findMany({
      ...(after ? { cursor: { id: after }, skip: 1 } : {}),
      orderBy: {
        createdAt: "desc"
      },
      select: {
        ...postSelect,
        user: {
          select: {
            ...userSelect
          }
        }
      },
      ...(Boolean(first) && { take: first })
    })) as unknown as T;
  }

  public async findPost<T>(postSelect: Prisma.PostSelect, userSelect: Prisma.UserSelect, postId: string): Promise<T> {
    return (await this.prismaService.post.findUnique({
      select: {
        ...postSelect,
        user: {
          select: {
            ...userSelect
          }
        }
      },
      where: {
        id: postId
      }
    })) as unknown as T;
  }

  // eslint-disable-next-line max-params
  public async upload<T>(
    postSelect: Prisma.PostSelect,
    userSelect: Prisma.UserSelect,
    { caption, imageUrl }: UploadInput,
    userId: string
  ): Promise<T> {
    return (await this.prismaService.post.create({
      data: {
        imageUrl,
        ...(caption && { caption }),
        userId
      },
      select: {
        ...postSelect,
        user: {
          select: {
            ...userSelect
          }
        }
      }
    })) as unknown as T;
  }
}
