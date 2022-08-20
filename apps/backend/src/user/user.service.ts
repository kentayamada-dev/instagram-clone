import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import type { UsersArgs } from "./dto/users.args";
import type { Prisma } from "@prisma/client";

@Injectable()
export class UserService {
  public constructor(private readonly prismaService: PrismaService) {}

  public async readNextUserId(lastUserId: string): Promise<string | undefined> {
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
  public async readUsers<T>(
    select: Prisma.UserSelect,
    { after, first, userIdExcluded, userIdQuery }: UsersArgs
  ): Promise<T> {
    const userWhere: Prisma.UserWhereInput = {
      ...(userIdQuery && {
        id: {
          contains: userIdQuery,
          mode: "insensitive"
        }
      }),
      ...(userIdExcluded && {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        NOT: {
          id: {
            equals: userIdExcluded
          }
        }
      })
    };

    return (await this.prismaService.user.findMany({
      ...(after && { cursor: { id: after }, skip: 1 }),
      orderBy: {
        createdAt: "desc"
      },
      select,
      ...(typeof first === "number" && { take: first }),
      ...((userIdExcluded || userIdQuery) && { where: userWhere })
    })) as unknown as T;
  }

  public async readUser<T>(args: Prisma.UserFindUniqueOrThrowArgs): Promise<T> {
    return (await this.prismaService.user.findUnique({
      ...args
    })) as unknown as T;
  }

  public async createUser<T>(select: Prisma.UserSelect, data: Prisma.UserCreateArgs["data"]): Promise<T> {
    return (await this.prismaService.user.create({
      data,
      select
    })) as unknown as T;
  }
}
