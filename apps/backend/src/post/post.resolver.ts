import { Resolver, Query } from "@nestjs/graphql";
import { PrismaService } from "src/prisma/prisma.service";
import { PostModel } from "./post.model";

@Resolver()
export class PostResolver {
  public constructor(private readonly prismaService: PrismaService) {}

  @Query(() => [PostModel])
  public sayNo() {
    return this.prismaService.post.findMany({
      include: {
        user: true
      }
    });
  }
}
