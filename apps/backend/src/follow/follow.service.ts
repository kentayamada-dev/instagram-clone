import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import type { FollowArgs } from "./dto/follow.args";
import type { Prisma } from "@prisma/client";

@Injectable()
export class FollowService {
  public constructor(private readonly prismaService: PrismaService) {}

  public async readNextFollower(lastFollowerId: string, userId: string): Promise<string | undefined> {
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
  public async readFollower<T>(select: Prisma.FollowSelect, { first, after, userId }: FollowArgs): Promise<T> {
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

  public async readNextFollowing(lastFollowingId: string, userId: string): Promise<string | undefined> {
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
  public async readFollowing<T>(select: Prisma.FollowSelect, { first, after, userId }: FollowArgs): Promise<T> {
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

  public async createFollow<T>(
    select: Prisma.FollowSelect,
    followedUserId: string,
    followingUserId: string
  ): Promise<T> {
    return (await this.prismaService.follow.create({
      data: {
        followedUserId,
        followingUserId
      },
      select
    })) as unknown as T;
  }

  public async deleteFollow<T>(
    select: Prisma.FollowSelect,
    followedUserId: string,
    followingUserId: string
  ): Promise<T> {
    return (await this.prismaService.follow.delete({
      select,
      where: {
        // eslint-disable-next-line @typescript-eslint/naming-convention, camelcase
        followedUserId_followingUserId: {
          followedUserId,
          followingUserId
        }
      }
    })) as unknown as T;
  }
}
