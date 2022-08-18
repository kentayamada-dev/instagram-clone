import { HttpException, HttpStatus, UseGuards } from "@nestjs/common";
import { Resolver, Query, Args, Mutation } from "@nestjs/graphql";
import { Prisma } from "@prisma/client";
import { CurrentUser } from "../auth/auth.decorator";
import { JwtPayload } from "../auth/auth.types";
import { GqlAuthGuard } from "../auth/gqlAuth.guard";
import { FieldMap } from "../libs/nestjs/fieldMap.decorator";
import { PaginationArgs } from "../pagination/pagination.args";
import { isObjectEmpty } from "../utils/helper";
import { UploadInput } from "./dto/post.input";
import { PaginatedPostsModel } from "./models/paginatedPosts.model";
import { PostModel } from "./models/post.model";
import { PostService } from "./post.service";
import type { Edge } from "../pagination/pagination.model";
import type { MapObjectPropertyToBoolean } from "../types";

@Resolver(PostModel)
export class PostResolver {
  public constructor(private readonly postService: PostService) {}

  @Query(() => PostModel, { description: "Get Post" })
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  protected async post(@Args("postId") postId: string, @FieldMap() fieldMap: any): Promise<PostModel> {
    /* eslint-disable @typescript-eslint/no-unsafe-assignment */
    const { user, ...postProperties } = fieldMap ?? {};
    const { posts: _userPosts, ...userProperties } = user ?? {};
    /* eslint-enable @typescript-eslint/no-unsafe-assignment */

    const postSelect = Prisma.validator<Prisma.PostSelect>()({
      ...(postProperties as MapObjectPropertyToBoolean<Prisma.PostSelect>),
      id: true
    });

    const userSelect = Prisma.validator<Prisma.UserSelect>()({
      ...(userProperties as MapObjectPropertyToBoolean<Prisma.UserSelect>)
    });

    const select: Prisma.PostSelect = {
      ...postSelect,
      ...(!isObjectEmpty(userSelect) && {
        user: {
          select: {
            ...userSelect,
            id: true
          }
        }
      })
    };

    const foundPost = await this.postService.readPost<PostModel | null>(select, postId);

    if (!foundPost) {
      throw new HttpException("Post not found", HttpStatus.NOT_FOUND);
    }

    return foundPost;
  }

  @Query(() => PaginatedPostsModel, { description: "Get Posts" })
  // eslint-disable-next-line max-statements
  protected async posts(
    @Args() paginationArgs: PaginationArgs,
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
    @FieldMap() fieldMap: any
  ): Promise<PaginatedPostsModel> {
    /* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */
    const { user: edgesNodeUser, ...edgesNodeProperties } = fieldMap?.edges?.node ?? {};
    const { posts: _edgesNodeUserPosts, ...edgesNodeUserProperties } = edgesNodeUser ?? {};
    const { user: nodesUser, ...nodesProperties } = fieldMap?.nodes ?? {};
    const { posts: _nodesUserPosts, ...nodesUserProperties } = nodesUser ?? {};
    /* eslint-enable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */

    const postSelect = Prisma.validator<Prisma.PostSelect>()({
      ...(edgesNodeProperties as MapObjectPropertyToBoolean<Prisma.PostSelect>),
      ...(nodesProperties as MapObjectPropertyToBoolean<Prisma.PostSelect>),
      id: true
    });

    const userSelect = Prisma.validator<Prisma.UserSelect>()({
      ...(edgesNodeUserProperties as MapObjectPropertyToBoolean<Prisma.UserSelect>),
      ...(nodesUserProperties as MapObjectPropertyToBoolean<Prisma.UserSelect>)
    });

    const select: Prisma.PostSelect = {
      ...postSelect,
      ...(!isObjectEmpty(userSelect) && {
        user: {
          select: {
            ...userSelect,
            id: true
          }
        }
      })
    };

    const posts = await this.postService.readPostsWithUser<PostModel[]>(select, paginationArgs);
    const lastPost = posts.at(-1);
    const nextPostId = lastPost ? await this.postService.readNextPostId(lastPost.id) : null;

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
      },
      totalCount: posts.length
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
    /* eslint-disable @typescript-eslint/no-unsafe-assignment */
    const { user, ...postProperties } = fieldMap ?? {};
    const { posts: _edgesNodeUserPosts, ...userProperties } = user ?? {};
    /* eslint-enable @typescript-eslint/no-unsafe-assignment */

    const postSelect = Prisma.validator<Prisma.PostSelect>()({
      ...(postProperties as MapObjectPropertyToBoolean<Prisma.PostSelect>),
      id: true
    });

    const userSelect = Prisma.validator<Prisma.UserSelect>()({
      ...(userProperties as MapObjectPropertyToBoolean<Prisma.UserSelect>)
    });

    const select: Prisma.PostSelect = {
      ...postSelect,
      ...(!isObjectEmpty(userSelect) && {
        user: {
          select: {
            ...userSelect,
            id: true
          }
        }
      })
    };

    const createdPost = await this.postService.createPost<PostModel>(select, uploadInput, currentUser.id);

    return createdPost;
  }
}
