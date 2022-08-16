import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import type { FollowArgs } from "./dto/follow.args";
import type { Prisma } from "@prisma/client";

@Injectable()
export class FollowService {
  public constructor(private readonly prismaService: PrismaService) {}

  public async findNextFollower(lastFollowerId: string, userId: string): Promise<string | undefined> {
    return this.prismaService.follow
      .findMany({
        cursor: { id: lastFollowerId },
        orderBy: {
          createdAt: "desc"
        },
        select: {
          id: true
        },
        skip: 1,
        take: 1,
        where: {
          followingUserId: userId
        }
      })
      .then((value) => value[0]?.id);
  }

  // eslint-disable-next-line max-params
  public async findFollower<T>(select: Prisma.FollowSelect, { first, after, userId }: FollowArgs): Promise<T> {
    return (await this.prismaService.follow.findMany({
      ...(after && { cursor: { id: after }, skip: 1 }),
      orderBy: {
        createdAt: "desc"
      },
      select,
      ...(Boolean(first) && { take: first }),
      where: {
        followingUserId: userId
      }
    })) as unknown as T;
  }

  public async findNextFollowing(lastFollowingId: string, userId: string): Promise<string | undefined> {
    return this.prismaService.follow
      .findMany({
        cursor: { id: lastFollowingId },
        orderBy: {
          createdAt: "desc"
        },
        select: {
          id: true
        },
        skip: 1,
        take: 1,
        where: {
          followedUserId: userId
        }
      })
      .then((value) => value[0]?.id);
  }

  // eslint-disable-next-line max-params
  public async findFollowing<T>(select: Prisma.FollowSelect, { first, after, userId }: FollowArgs): Promise<T> {
    return (await this.prismaService.follow.findMany({
      ...(after && { cursor: { id: after }, skip: 1 }),
      orderBy: {
        createdAt: "desc"
      },
      select,
      ...(Boolean(first) && { take: first }),
      where: {
        followedUserId: userId
      }
    })) as unknown as T;
  }
}
