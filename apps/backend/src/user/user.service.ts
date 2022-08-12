import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import type { Prisma } from "@prisma/client";

@Injectable()
export class UserService {
  public constructor(private readonly prismaService: PrismaService) {}

  public async findNextUserId(lastUserId: string): Promise<string | undefined> {
    return this.prismaService.user
      .findMany({
        cursor: { id: lastUserId },
        orderBy: {
          createdAt: "desc"
        },
        select: {
          id: true
        },
        skip: 1,
        take: 1
      })
      .then((value) => value[0]?.id);
  }

  // eslint-disable-next-line max-params
  public async findUsers<T>(
    select: Prisma.UserSelect,
    first: number | undefined,
    after: string | undefined,
    where: Prisma.UserWhereInput | null
  ): Promise<T> {
    return (await this.prismaService.user.findMany({
      ...(after && { cursor: { id: after }, skip: 1 }),
      orderBy: {
        createdAt: "desc"
      },
      select,
      ...(typeof first === "number" && { take: first }),
      ...(where && { where })
    })) as unknown as T;
  }

  public async findUser<T>(args: Prisma.UserFindUniqueOrThrowArgs): Promise<T> {
    return (await this.prismaService.user.findUnique({
      ...args
    })) as unknown as T;
  }

  public async createUser(data: Prisma.UserCreateArgs["data"]): Promise<{
    id: string;
  }> {
    return this.prismaService.user.create({
      data,
      select: {
        id: true
      }
    });
  }
}
