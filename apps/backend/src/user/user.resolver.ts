import { HttpException, HttpStatus } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Args, Resolver, Query, Mutation, Context, ResolveField, Parent } from "@nestjs/graphql";
import { Prisma } from "@prisma/client";
import { hash, compare } from "bcrypt";
import { Response } from "express";
import { AuthService } from "../auth/auth.service";
import { PaginatedFollowerModel } from "../follow/models/paginatedFollower.model";
import { PaginatedFollowingModel } from "../follow/models/paginatedFollowing.model";
import { FieldMap } from "../libs/nestjs/fieldMap.decorator";
import { LikeCommon } from "../like/like.common";
import { PaginatedLikeModel } from "../like/models/paginatedLike.model";
import { MessageModel } from "../message/message.model";
import { PaginationArgs } from "../pagination/pagination.args";
import { PostsArgs } from "../post/dto/posts.args";
import { PaginatedPostModel } from "../post/models/paginatedBase.model";
import { LoginInput } from "./dto/login.input";
import { SignupInput } from "./dto/signup.input";
import { UsersArgs } from "./dto/users.args";
import { UserModelBase } from "./models/base.model";
import { PaginatedUserModel } from "./models/paginatedBase.model";
import { UserCommon } from "./user.common";
import { UserService } from "./user.service";
import type { Edge } from "../pagination/pagination.model";
import type { MapObjectPropertyToBoolean } from "../types";
import type { ConfigSchema } from "../utils/config";
import type { CookieOptions } from "express";

@Resolver(UserModelBase)
export class UserResolver {
  private readonly saltRounds = 10;
  private readonly accessTokenKey = "accessToken";
  private readonly cookieOptions: CookieOptions = {
    httpOnly: true
  };

  // eslint-disable-next-line max-params
  public constructor(
    private readonly userCommon: UserCommon,
    private readonly likeCommon: LikeCommon,
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly configService: ConfigService<ConfigSchema>
  ) {
    const urlObject = new URL(this.configService.get("FRONTEND_ORIGIN") ?? "");
    const hostName = urlObject.hostname;
    const domainName = hostName.replace(/^[^.]+\./gu, "");
    const isDevelopment = process.env["NODE_ENV"] === "development";
    this.cookieOptions = {
      ...this.cookieOptions,
      ...(isDevelopment ? {} : { domain: `.${domainName}` }),
      sameSite: "strict",
      secure: !isDevelopment
    };
  }

  @Query(() => UserModelBase, { description: "Get User" })
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  protected async user(@Args("userId") userId: string, @FieldMap() fieldMap: any): Promise<UserModelBase> {
    /* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */
    const {
      likes: _likes,
      posts: _posts,
      follower: _follower,
      following: _following,
      ...userProperties
    } = fieldMap ?? {};
    /* eslint-enable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */

    const select = Prisma.validator<Prisma.UserSelect>()({
      ...(userProperties as MapObjectPropertyToBoolean<Prisma.UserSelect>),
      id: true
    });
    const foundUser = await this.userService.readUser<UserModelBase | null>({ select, where: { id: userId } });

    if (!foundUser) {
      throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    }

    return foundUser;
  }

  @Query(() => PaginatedUserModel, { description: "Get Users" })
  protected async users(
    @Args() usersArgs: UsersArgs,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
    @FieldMap() fieldMap: any
  ): Promise<PaginatedUserModel> {
    /* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */
    const {
      posts: _edgesNodePosts,
      follower: _edgesNodefollower,
      following: _edgesNodefollowing,
      likes: _edgesNodelikes,
      ...edgesNodeProperties
    } = fieldMap?.edges?.node ?? {};

    const {
      posts: _userNodesPosts,
      follower: _userNodesfollower,
      following: _userNodesfollowing,
      likes: _userNodeslikes,
      ...nodesProperties
    } = fieldMap?.nodes ?? {};
    /* eslint-enable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */

    const select = Prisma.validator<Prisma.UserSelect>()({
      ...(edgesNodeProperties as MapObjectPropertyToBoolean<Prisma.UserSelect>),
      ...(nodesProperties as MapObjectPropertyToBoolean<Prisma.UserSelect>),
      id: true
    });

    const foundUsers = await this.userService.readUsers<UserModelBase[]>(select, usersArgs);
    const lastUser = foundUsers.at(-1);
    const nextUserId = lastUser ? await this.userService.readNextUserId(lastUser.id) : null;

    const edges: Edge<UserModelBase>[] = foundUsers.map(
      (user): Edge<UserModelBase> => ({
        cursor: user.id,
        node: user
      })
    );

    return {
      edges,
      nodes: foundUsers,
      pageInfo: {
        endCursor: lastUser?.id,
        hasNextPage: Boolean(nextUserId)
      },
      totalCount: foundUsers.length
    };
  }

  @ResolveField(() => PaginatedFollowingModel, { description: "Get Related Following" })
  protected async following(
    @Parent() user: UserModelBase,
    @Args() paginationArgs: PaginationArgs,
    @FieldMap() fieldMap: Record<string, unknown>
  ): Promise<PaginatedFollowingModel> {
    return this.userCommon.getPaginatedFollowing(user.id, paginationArgs, fieldMap);
  }

  @ResolveField(() => PaginatedFollowerModel, { description: "Get Related Follower" })
  protected async follower(
    @Parent() user: UserModelBase,
    @Args() paginationArgs: PaginationArgs,
    @FieldMap() fieldMap: Record<string, unknown>
  ): Promise<PaginatedFollowerModel> {
    return this.userCommon.getPaginatedFollower(user.id, paginationArgs, fieldMap);
  }

  @ResolveField(() => PaginatedLikeModel, { description: "Get Related Likes" })
  protected async likes(
    @Parent() user: UserModelBase,
    @Args() paginationArgs: PaginationArgs,
    @FieldMap() fieldMap: Record<string, unknown>
  ): Promise<PaginatedLikeModel> {
    // eslint-disable-next-line no-undefined
    return this.likeCommon.getPaginatedLikes(undefined, user.id, paginationArgs, fieldMap);
  }

  @ResolveField(() => PaginatedPostModel, { description: "Get Related Posts" })
  protected async posts(
    @Parent() user: UserModelBase,
    @Args() postsArgs: PostsArgs,
    @FieldMap() fieldMap: Record<string, unknown>
  ): Promise<PaginatedPostModel> {
    return this.userCommon.getPaginatedPosts(user.id, postsArgs, fieldMap);
  }

  @Mutation(() => UserModelBase, { description: "Signup" })
  // eslint-disable-next-line max-statements
  protected async signup(
    @Args("signupInput") signupInput: SignupInput,
    @Context("res") res: Response
  ): Promise<UserModelBase> {
    let createdUser: UserModelBase | null = null;
    const { password, ...rest } = signupInput;
    const hashedPassword = await hash(password, this.saltRounds);
    const data: SignupInput = {
      ...rest,
      password: hashedPassword
    };

    const select = Prisma.validator<Prisma.UserSelect>()({
      id: true
    });

    try {
      createdUser = await this.userService.createUser<UserModelBase>(select, data);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        const target = error.meta?.["target"] as string[];

        if (target.includes("id")) {
          throw new HttpException("User ID Is Taken", HttpStatus.CONFLICT);
        }
        if (target.includes("email")) {
          throw new HttpException("Email Is Taken", HttpStatus.CONFLICT);
        }
      }

      throw new HttpException("INTERNAL SERVER ERROR", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    const { accessToken } = this.authService.getJwtToken(createdUser.id);

    res.cookie(this.accessTokenKey, accessToken, this.cookieOptions);

    return createdUser;
  }

  @Mutation(() => MessageModel, { description: "Login" })
  protected async login(
    @Args("loginInput") { email, password }: LoginInput,
    @Context("res") res: Response
  ): Promise<MessageModel> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const foundUser = await this.userService.readUser<{
      id: string;
      password: string;
    } | null>({
      select: {
        id: true,
        password: true
      },
      where: {
        email
      }
    });

    if (!foundUser || !(await compare(password, foundUser.password))) {
      throw new HttpException("Incorrect email or password", HttpStatus.UNAUTHORIZED);
    }

    const { accessToken } = this.authService.getJwtToken(foundUser.id);

    res.cookie(this.accessTokenKey, accessToken, this.cookieOptions);

    return { message: "Cookie has been set successfully" };
  }

  @Mutation(() => MessageModel, { description: "Logout" })
  protected logout(@Context("res") res: Response): MessageModel {
    res.cookie(this.accessTokenKey, "", {
      ...this.cookieOptions,
      httpOnly: true
    });

    return { message: "Cookie has been deleted successfully" };
  }
}
