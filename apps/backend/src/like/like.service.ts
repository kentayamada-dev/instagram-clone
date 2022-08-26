import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import type { LikeArgs } from "./dto/like.args";
import type { Prisma } from "@prisma/client";

@Injectable()
export class LikeService {
  public constructor(private readonly prismaService: PrismaService) {}

  public async readNextLike(lastLikeId: string, postId: string | undefined): Promise<string | undefined> {
    return this.prismaService.like
      .findMany({
        cursor: { id: lastLikeId },
        orderBy: {
          createdAt: "desc"
        },
        select: {
          id: true
        },
        skip: 1,
        take: 1,
        ...(postId && {
          where: {
            postId
          }
        })
      })
      .then((value) => value[0]?.id);
  }

  // eslint-disable-next-line max-params
  public async readLikes<T>(select: Prisma.LikeSelect, { first, after, postId, userId }: LikeArgs): Promise<T> {
    return (await this.prismaService.like.findMany({
      ...(after && { cursor: { id: after }, skip: 1 }),
      orderBy: {
        createdAt: "desc"
      },
      select,
      ...(Boolean(first) && { take: first }),
      ...(postId && {
        where: {
          postId
        }
      }),
      ...(userId && {
        where: {
          userId
        }
      })
    })) as unknown as T;
  }

  public async createLike<T>(select: Prisma.LikeSelect, postId: string, userId: string): Promise<T> {
    return (await this.prismaService.like.create({
      data: {
        postId,
        userId
      },
      select
    })) as unknown as T;
  }

  public async deleteLike<T>(select: Prisma.LikeSelect, postId: string, userId: string): Promise<T> {
    return (await this.prismaService.like.delete({
      select,
      where: {
        // eslint-disable-next-line @typescript-eslint/naming-convention, camelcase
        userId_postId: {
          postId,
          userId
        }
      }
    })) as unknown as T;
  }
}
