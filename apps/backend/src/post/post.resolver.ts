import { HttpException, HttpStatus, UseGuards } from "@nestjs/common";
import { Resolver, Query, Args, Mutation } from "@nestjs/graphql";
import { CurrentUser } from "../auth/auth.decorator";
import { JwtPayload } from "../auth/auth.types";
import { GqlAuthGuard } from "../auth/gqlAuth.guard";
import { FieldMap } from "../libs/nestjs/fieldMap.decorator";
import { UploadInput } from "./dto/post.input";
import { PaginatedPostsModel } from "./models/paginatedPosts.model";
import { PostModel } from "./models/post.model";
import { PostsArgs } from "./models/posts.args";
import { PostService } from "./post.service";
import type { Edge } from "../pagination/pagination.model";
import type { MapObjectPropertyToBoolean } from "../types";
import type { UserModelBase } from "../user/models/base.model";
import type { PostModelBase } from "./models/base.model";
import type { Prisma } from "@prisma/client";

@Resolver(PostModel)
export class PostResolver {
  public constructor(private readonly postService: PostService) {}

  @Query(() => PostModel, { description: "Get Post" })
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  protected async post(@Args("postId") postId: string, @FieldMap() fieldMap: any): Promise<PostModel> {
    /* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */
    const { user, ...postProperties }: { postProperties: MapObjectPropertyToBoolean<PostModelBase>; user: any } =
      fieldMap ?? {};

    const {
      posts: _userPosts,
      ...userProperties
    }: { posts: any; userProperties: MapObjectPropertyToBoolean<UserModelBase> } = user ?? {};
    /* eslint-enable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */

    const postSelect: Prisma.PostSelect = {
      ...postProperties,
      id: true
    };

    const userSelect: Prisma.UserSelect = {
      ...userProperties,
      id: true
    };

    const foundPost = await this.postService.findPost<PostModel | null>(postSelect, userSelect, postId);

    if (!foundPost) {
      throw new HttpException("Post not found", HttpStatus.NOT_FOUND);
    }

    return foundPost;
  }

  @Query(() => PaginatedPostsModel, { description: "Get Posts" })
  // eslint-disable-next-line max-statements
  protected async posts(
    @Args() postsArgs: PostsArgs,
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
    @FieldMap() fieldMap: any
  ): Promise<PaginatedPostsModel> {
    /* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */
    const {
      user: edgesNodeUser,
      ...edgesNodeProperties
    }: { edgesNodeProperties: MapObjectPropertyToBoolean<PostModelBase>; user: any } = fieldMap?.edges?.node ?? {};

    const {
      posts: _edgesNodeUserPosts,
      ...edgesNodeUserProperties
    }: { edgesNodeUserProperties: MapObjectPropertyToBoolean<UserModelBase>; posts: any } = edgesNodeUser ?? {};

    const {
      user: nodesUser,
      ...nodesProperties
    }: { nodesProperties: MapObjectPropertyToBoolean<PostModelBase>; user: any } = fieldMap?.nodes ?? {};

    const {
      posts: _nodesUserPosts,
      ...nodesUserProperties
    }: { nodesUserProperties: MapObjectPropertyToBoolean<UserModelBase>; posts: any } = nodesUser ?? {};
    /* eslint-enable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */

    const postSelect: Prisma.PostSelect = {
      ...edgesNodeProperties,
      ...nodesProperties,
      id: true
    };
    const userSelect: Prisma.UserSelect = {
      ...edgesNodeUserProperties,
      ...nodesUserProperties,
      id: true
    };

    const posts = await this.postService.findPostsWithUser<PostModel[]>(postSelect, userSelect, postsArgs);
    const lastPost = posts.at(-1);
    const nextPostId = lastPost ? await this.postService.findNextPostId(lastPost.id) : null;

    const edges: Edge<PostModel>[] = posts.map(
      (post): Edge<PostModel> => ({
        cursor: post.id,
        node: post
      })
    );

    return {
      edges,
      nodes: posts,
      pageInfo: {
        endCursor: lastPost?.id,
        hasNextPage: Boolean(nextPostId)
      }
    };
  }

  @Mutation(() => PostModel, { description: "Upload Post" })
  @UseGuards(GqlAuthGuard)
  protected async upload(
    @CurrentUser() currentUser: JwtPayload,
    @Args("uploadInput") uploadInput: UploadInput,
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
    @FieldMap() fieldMap: any
  ): Promise<PostModel> {
    /* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */
    const { user, ...postProperties }: { postProperties: MapObjectPropertyToBoolean<PostModelBase>; user: any } =
      fieldMap ?? {};

    const {
      posts: _edgesNodeUserPosts,
      ...userProperties
    }: { posts: any; userProperties: MapObjectPropertyToBoolean<UserModelBase> } = user ?? {};
    /* eslint-enable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */

    const postSelect: Prisma.PostSelect = {
      ...postProperties,
      id: true
    };
    const userSelect: Prisma.UserSelect = {
      ...userProperties,
      id: true
    };

    const createdPost = await this.postService.upload<PostModel>(postSelect, userSelect, uploadInput, currentUser.id);

    return createdPost;
  }
}
