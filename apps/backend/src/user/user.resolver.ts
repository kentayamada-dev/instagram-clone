import { Resolver, Query } from "@nestjs/graphql";
import { PrismaService } from "src/prisma/prisma.service";
import { UserModel } from "./user.model";

@Resolver()
export class UserResolver {
  public constructor(private readonly prismaService: PrismaService) {}

  @Query(() => [UserModel])
  public sayHello() {
    return this.prismaService.user.findMany({
      include: {
        posts: true
      }
    });
  }
}
