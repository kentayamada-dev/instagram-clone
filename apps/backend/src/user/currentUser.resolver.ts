import { HttpException, HttpStatus, UseGuards } from "@nestjs/common";
import { Resolver, Query, ResolveField, Args, Parent } from "@nestjs/graphql";
import { CurrentUser } from "../auth/auth.decorator";
import { JwtPayload } from "../auth/auth.types";
import { GqlAuthGuard } from "../auth/gqlAuth.guard";
import { FieldMap } from "../libs/nestjs/fieldMap.decorator";
import { PaginationArgs } from "../pagination/pagination.args";
import { PaginatedPostModel } from "../post/models/paginatedBase.model";
import { PostService } from "../post/post.service";
import { CurrentUserModel } from "./models/currentUser.model";
import { UserService } from "./user.service";
import type { Edge } from "../pagination/pagination.model";
import type { PostModelBase } from "../post/models/base.model";
import type { MapObjectPropertyToBoolean } from "../types";
import type { Prisma } from "@prisma/client";

@Resolver(CurrentUserModel)
export class CurrentUserResolver {
  public constructor(private readonly postService: PostService, private readonly userService: UserService) {}

  @Query(() => CurrentUserModel, { description: "Get Current User" })
  @UseGuards(GqlAuthGuard)
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  protected async currentUser(@CurrentUser() user: JwtPayload, @FieldMap() fieldMap: any): Promise<CurrentUserModel> {
    /* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */
    const {
      posts: _posts,
      ...userProperties
    }: { posts: any; userProperties: MapObjectPropertyToBoolean<CurrentUserModel> } = fieldMap ?? {};
    /* eslint-enable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */

    const select: Prisma.UserSelect = { ...userProperties, id: true };
    const foundUser = await this.userService.findUser<CurrentUserModel | null>({
      select,
      where: {
        id: user.id
      }
    });

    if (!foundUser) {
      throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    }

    return foundUser;
  }

  @ResolveField(() => PaginatedPostModel, { description: "Get Related Posts" })
  protected async posts(
    @Parent() user: CurrentUserModel,
    @Args() paginationArgs: PaginationArgs,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
    @FieldMap() fieldMap: any
  ): Promise<PaginatedPostModel> {
    /* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */
    const edgesNodeProperties: MapObjectPropertyToBoolean<PostModelBase> = fieldMap?.edges?.node ?? {};
    const nodesProperties: MapObjectPropertyToBoolean<PostModelBase> = fieldMap?.nodes ?? {};
    /* eslint-enable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */

    const select: Prisma.PostSelect = { ...edgesNodeProperties, ...nodesProperties, id: true };
    const foundPosts = await this.postService.findPosts<PostModelBase[]>(select, paginationArgs, user.id);
    const lastPost = foundPosts.at(-1);
    const nextPostId = lastPost ? await this.postService.findNextPostId(lastPost.id) : null;

    const edges: Edge<PostModelBase>[] = foundPosts.map(
      (post): Edge<PostModelBase> => ({
        cursor: post.id,
        node: post
      })
    );

    return {
      edges,
      nodes: foundPosts,
      pageInfo: {
        endCursor: lastPost?.id,
        hasNextPage: Boolean(nextPostId)
      }
    };
  }
}
