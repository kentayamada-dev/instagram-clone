import { HttpException, HttpStatus, UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Prisma } from "@prisma/client";
import { CurrentUser } from "../auth/auth.decorator";
import { JwtPayload } from "../auth/auth.types";
import { GqlAuthGuard } from "../auth/gqlAuth.guard";
import { FieldMap } from "../lib/nestjs/fieldMap.decorator";
import { extractUserProperties, isObjectEmpty } from "../utils/helper";
import { LikeArgs } from "./dto/like.args";
import { LikeInput } from "./dto/like.input";
import { LikeCommon } from "./like.common";
import { LikeService } from "./like.service";
import { LikeModel } from "./models/like.model";
import { PaginatedLikeModel } from "./models/paginatedLike.model";
import type { MapObjectPropertyToBoolean } from "../types";

@Resolver(LikeModel)
export class LikeResolver {
  public constructor(private readonly likeService: LikeService, private readonly likeCommon: LikeCommon) {}

  @Query(() => PaginatedLikeModel, { description: "Get Likes" })
  protected async likes(
    @Args() likeArgs: LikeArgs,
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
    @FieldMap() fieldMap: any
  ): Promise<PaginatedLikeModel> {
    const { postId, userId, ...paginationArgs } = likeArgs;

    return this.likeCommon.getPaginatedLikes(postId, userId, paginationArgs, fieldMap);
  }

  @Mutation(() => LikeModel, { description: "Like Post" })
  @UseGuards(GqlAuthGuard)
  // eslint-disable-next-line max-statements
  protected async like(
    @CurrentUser() currentUser: JwtPayload,
    @Args("likeInput") likeInput: LikeInput,
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
    @FieldMap() fieldMap: any
  ): Promise<LikeModel> {
    let likeData: LikeModel | null = null;
    /* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */
    const { post, user, ...likeProperties } = fieldMap ?? {};
    const userProperties = extractUserProperties(user);
    /* eslint-enable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */

    const likeSelect = Prisma.validator<Prisma.LikeSelect>()({
      ...(likeProperties as MapObjectPropertyToBoolean<Prisma.LikeSelect>),
      id: true
    });

    const userSelect = Prisma.validator<Prisma.UserSelect>()({ ...userProperties });

    const postSelect = Prisma.validator<Prisma.PostSelect>()({
      ...(post as MapObjectPropertyToBoolean<Prisma.PostSelect>)
    });

    const select: Prisma.LikeSelect = {
      ...likeSelect,
      ...(!isObjectEmpty(postSelect) && {
        post: {
          select: {
            ...postSelect,
            id: true
          }
        }
      }),
      ...(!isObjectEmpty(userSelect) && {
        user: {
          select: {
            ...userSelect,
            id: true
          }
        }
      })
    };

    try {
      likeData = await this.likeService.createLike<LikeModel>(select, likeInput.postId, currentUser.id);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        const target = error.meta?.["target"] as string[];

        if (JSON.stringify(target) === JSON.stringify(["userId", "postId"])) {
          throw new HttpException("Post Already Liked", HttpStatus.CONFLICT);
        }
      }

      throw new HttpException("INTERNAL SERVER ERROR", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return likeData;
  }

  @Mutation(() => LikeModel, { description: "Unlike Post" })
  @UseGuards(GqlAuthGuard)
  // eslint-disable-next-line max-statements
  protected async unlike(
    @CurrentUser() currentUser: JwtPayload,
    @Args("likeInput") likeInput: LikeInput,
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
    @FieldMap() fieldMap: any
  ): Promise<LikeModel> {
    let likeData: LikeModel | null = null;
    /* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */
    const { post, user, ...likeProperties } = fieldMap ?? {};
    const userProperties = extractUserProperties(user);
    /* eslint-enable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */

    const likeSelect = Prisma.validator<Prisma.LikeSelect>()({
      ...(likeProperties as MapObjectPropertyToBoolean<Prisma.LikeSelect>),
      id: true
    });

    const userSelect = Prisma.validator<Prisma.UserSelect>()({ ...userProperties });

    const postSelect = Prisma.validator<Prisma.PostSelect>()({
      ...(post as MapObjectPropertyToBoolean<Prisma.PostSelect>)
    });

    const select: Prisma.LikeSelect = {
      ...likeSelect,
      ...(!isObjectEmpty(postSelect) && {
        post: {
          select: {
            ...postSelect,
            id: true
          }
        }
      }),
      ...(!isObjectEmpty(userSelect) && {
        user: {
          select: {
            ...userSelect,
            id: true
          }
        }
      })
    };

    try {
      likeData = await this.likeService.deleteLike<LikeModel>(select, likeInput.postId, currentUser.id);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        const isAlreadyUnfollowed = error.meta?.["cause"] === "Record to delete does not exist.";

        if (isAlreadyUnfollowed) {
          throw new HttpException("Post Already Unliked", HttpStatus.CONFLICT);
        }
      }

      throw new HttpException("INTERNAL SERVER ERROR", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return likeData;
  }
}
