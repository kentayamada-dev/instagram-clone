import { HttpException, HttpStatus } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Args, Resolver, Query, Mutation, Context, ResolveField, Parent } from "@nestjs/graphql";
import { hash, compare } from "bcrypt";
import { Response } from "express";
import { AuthService } from "../auth/auth.service";
import { FieldMap } from "../libs/nestjs/fieldMap.decorator";
import { MessageModel } from "../message/message.model";
import { PaginationArgs } from "../pagination/pagination.args";
import { PaginatedPostModel } from "../post/models/paginatedBase.model";
import { PostService } from "../post/post.service";
import { LoginInput } from "./dto/login.input";
import { SignupInput } from "./dto/signup.input";
import { UsersArgs } from "./dto/users.args";
import { UserModelBase } from "./models/base.model";
import { PaginatedUserModel } from "./models/paginatedBase.model";
import { UserService } from "./user.service";
import type { Edge } from "../pagination/pagination.model";
import type { PostModelBase } from "../post/models/base.model";
import type { MapObjectPropertyToBoolean } from "../types";
import type { ConfigSchema } from "../utils/config/config.schema";
import type { Prisma } from "@prisma/client";
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
    private readonly postService: PostService,
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

  @Query(() => PaginatedUserModel, { description: "Get Users" })
  protected async users(
    @Args() usersArgs: UsersArgs,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
    @FieldMap() fieldMap: any
  ): Promise<PaginatedUserModel> {
    /* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */
    const {
      posts: _edgesNodePosts,
      ...edgesNodeProperties
    }: { edgesNodeProperties: MapObjectPropertyToBoolean<UserModelBase>; posts: any } = fieldMap?.edges?.node ?? {};

    const {
      posts: _userNodesPosts,
      ...nodesProperties
    }: { nodesProperties: MapObjectPropertyToBoolean<UserModelBase>; posts: any } = fieldMap?.nodes ?? {};
    /* eslint-enable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */

    const select: Prisma.UserSelect = { ...edgesNodeProperties, ...nodesProperties, id: true };
    const foundUsers = await this.userService.findUsers<UserModelBase[]>(select, usersArgs);
    const lastUser = foundUsers.at(-1);
    const nextUserId = lastUser ? await this.userService.findNextUserId(lastUser.id) : null;

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
      }
    };
  }

  @ResolveField(() => PaginatedPostModel, { description: "Get Related Posts" })
  protected async posts(
    @Parent() user: UserModelBase,
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
    const nextPostId = lastPost ? await this.postService.findNextPostId(lastPost.id, user.id) : null;

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

  @Mutation(() => MessageModel, { description: "Signup" })
  protected async signup(
    @Args("signupInput") signupInput: SignupInput,
    @Context("res") res: Response
  ): Promise<MessageModel> {
    const foundUser = await this.userService.findUser<{ id: string } | null>({
      select: {
        id: true
      },
      where: {
        email: signupInput.email
      }
    });

    if (foundUser) {
      throw new HttpException("User already exists", HttpStatus.CONFLICT);
    }

    const { password, ...rest } = signupInput;
    const hashedPassword = await hash(password, this.saltRounds);
    const data: SignupInput = {
      ...rest,
      password: hashedPassword
    };
    const createdUser = await this.userService.createUser(data);

    const { accessToken } = this.authService.getJwtToken(createdUser.id);

    res.cookie(this.accessTokenKey, accessToken, this.cookieOptions);

    return { message: "Cookie has been set successfully" };
  }

  @Mutation(() => MessageModel, { description: "Login" })
  protected async login(
    @Args("loginInput") { email, password }: LoginInput,
    @Context("res") res: Response
  ): Promise<MessageModel> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const foundUser = await this.userService.findUser<{
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

  @Query(() => UserModelBase, { description: "Get User" })
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  protected async user(@Args("userId") userId: string, @FieldMap() fieldMap: any): Promise<UserModelBase> {
    /* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */
    const {
      posts: _posts,
      ...userProperties
    }: { posts: any; userProperties: MapObjectPropertyToBoolean<UserModelBase> } = fieldMap ?? {};
    /* eslint-enable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */

    const select: Prisma.UserSelect = { ...userProperties, id: true };
    const foundUser = await this.userService.findUser<UserModelBase | null>({ select, where: { id: userId } });

    if (!foundUser) {
      throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    }

    return foundUser;
  }
}
