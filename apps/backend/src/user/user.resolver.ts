import { HttpException, HttpStatus, UseGuards } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Args, Resolver, Query, Mutation, Context } from "@nestjs/graphql";
import { SkipThrottle } from "@nestjs/throttler";
import { hash, compare } from "bcrypt";
import { Response } from "express";
import { CurrentUser } from "../auth/auth.decorator";
import { AuthService } from "../auth/auth.service";
import { JwtPayload } from "../auth/auth.types";
import { GqlAuthGuard } from "../auth/gql-auth.guard";
import { MessageModel } from "../common/message.model";
import { isPropertyExactlySameAsGetPostModel } from "../post/models/get-post.model";
import { PrismaService } from "../prisma/prisma.service";
import { GetAllUsersArgs } from "./dto/get-all-users.args";
import { LoginArgs } from "./dto/login.args";
import { SignupArgs } from "./dto/signup.args";
import { GetAllUsersId, isPropertyExactlySameAsGetAllUsersId } from "./models/get-all-users-posts-id.model";
import { isPropertyExactlySameAsGetAllUsersModel, PaginatedGetAllUsersModel } from "./models/get-all-users.model";
import { GetCurrentUserModel, isPropertyExactlySameAsGetCurrentUserModel } from "./models/get-current-user.model";
import { GetUserModel, isPropertyExactlySameAsGetUserModel } from "./models/get-user.model";
import type { Edge } from "../pagination/pagination.model";
import type { ConfigSchema } from "../utils/config/config.schema";
import type { GetAllUsersModel } from "./models/get-all-users.model";

@Resolver()
export class UserResolver {
  private readonly isDevelopment: boolean;
  private readonly domain: string;
  private readonly saltRounds = 10;
  private readonly accessTokenKey = "accessToken";
  public constructor(
    private readonly prismaService: PrismaService,
    private readonly authService: AuthService,
    private readonly configService: ConfigService<ConfigSchema>
  ) {
    const urlObject = new URL(this.configService.get("FRONTEND_ORIGIN") ?? "");
    const hostName = urlObject.hostname;
    const domainName = hostName.replace(/^[^.]+\./gu, "");
    this.domain = `.${domainName}`;
    this.isDevelopment = process.env["NODE_ENV"] === "development";
  }

  @Query(() => [GetAllUsersId], { description: "Get All Users ID" })
  protected async getAllUsersId(): Promise<GetAllUsersId[]> {
    const foundUsers = await this.prismaService.user
      .findMany({ orderBy: { createdAt: "desc" }, select: { id: true } })
      .then((usersData) => {
        const [firstUser] = usersData;
        if (firstUser && isPropertyExactlySameAsGetAllUsersId(firstUser)) {
          return usersData;
        }

        return [];
      });

    return foundUsers;
  }

  @Query(() => PaginatedGetAllUsersModel, { description: "Get All Users" })
  protected async getAllUsers(@Args() { first, after, userId }: GetAllUsersArgs): Promise<PaginatedGetAllUsersModel> {
    const foundUsers = await this.prismaService.user
      .findMany({
        ...(after ? { cursor: { id: after }, skip: 1 } : {}),
        orderBy: {
          createdAt: "desc"
        },
        select: {
          id: true,
          imageUrl: true,
          name: true
        },
        take: first,
        ...(userId
          ? {
              where: {
                // eslint-disable-next-line @typescript-eslint/naming-convention
                NOT: {
                  id: {
                    equals: userId
                  }
                }
              }
            }
          : {})
      })
      .then((usersData) => {
        const [firstUser] = usersData;
        if (firstUser && isPropertyExactlySameAsGetAllUsersModel(firstUser)) {
          return usersData;
        }

        return [];
      });

    const lastUser = foundUsers.at(-1);

    const nextUserId = lastUser
      ? await this.prismaService.user
          .findMany({
            cursor: { id: lastUser.id },
            orderBy: {
              createdAt: "desc"
            },
            select: {
              id: true
            },
            skip: 1,
            take: 1
          })
          .then((value) => value[0]?.id)
      : [];

    const edges: Edge<GetAllUsersModel>[] = foundUsers.map(
      (user): Edge<GetAllUsersModel> => ({
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

  @Mutation(() => MessageModel, { description: "Signup" })
  protected async signup(
    @Args("signupArgs") signupArgs: SignupArgs,
    @Context("res") res: Response
  ): Promise<MessageModel> {
    const foundUser = await this.prismaService.user.findUnique({
      select: {
        id: true
      },
      where: {
        email: signupArgs.email
      }
    });

    if (foundUser) {
      throw new HttpException("Email already exists", HttpStatus.CONFLICT);
    }

    const { password, ...rest } = signupArgs;
    const hashedPassword = await hash(password, this.saltRounds);
    const data: SignupArgs = {
      ...rest,
      password: hashedPassword
    };
    const createdUser = await this.prismaService.user.create({
      data,
      select: {
        email: true,
        id: true
      }
    });
    const { accessToken } = this.authService.getJwtToken(createdUser.id);

    res.cookie(this.accessTokenKey, accessToken, {
      ...(this.isDevelopment ? {} : { domain: this.domain }),
      httpOnly: true,
      sameSite: "strict",
      secure: !this.isDevelopment
    });

    return { message: "Cookie has been set successfully" };
  }

  @Mutation(() => MessageModel, { description: "Login" })
  protected async login(
    @Args("loginArgs") { email, password }: LoginArgs,
    @Context("res") res: Response
  ): Promise<MessageModel> {
    const foundUser = await this.prismaService.user.findUnique({
      select: {
        email: true,
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

    res.cookie(this.accessTokenKey, accessToken, {
      ...(this.isDevelopment ? {} : { domain: this.domain }),
      httpOnly: true,
      sameSite: "strict",
      secure: !this.isDevelopment
    });

    return { message: "Cookie has been set successfully" };
  }

  @Mutation(() => MessageModel, { description: "Logout" })
  protected logout(@Context("res") res: Response): MessageModel {
    res.cookie(this.accessTokenKey, "", {
      ...(this.isDevelopment ? {} : { domain: this.domain }),
      httpOnly: true,
      maxAge: -1,
      sameSite: "strict",
      secure: !this.isDevelopment
    });

    return { message: "Cookie has been deleted successfully" };
  }

  @Query(() => GetUserModel, { description: "Get Current User" })
  @UseGuards(GqlAuthGuard)
  protected async getCurrentUser(@CurrentUser() user: JwtPayload): Promise<GetUserModel> {
    const foundUser = await this.prismaService.user
      .findUnique({
        select: {
          id: true,
          imageUrl: true,
          name: true
        },
        where: {
          id: user.id
        }
      })
      .then((userData) => {
        if (userData && isPropertyExactlySameAsGetUserModel(userData)) {
          return userData;
        }

        return null;
      });

    if (!foundUser) {
      throw new HttpException("User not found", HttpStatus.UNAUTHORIZED);
    }

    return foundUser;
  }

  @SkipThrottle()
  @Query(() => GetCurrentUserModel, { description: "Get User" })
  protected async getUser(@Args("id") id: string): Promise<GetCurrentUserModel> {
    const foundUser = await this.prismaService.user
      .findUnique({
        select: {
          id: true,
          imageUrl: true,
          name: true,
          posts: {
            select: {
              caption: true,
              createdAt: true,
              id: true,
              imageUrl: true
            }
          }
        },
        where: {
          id
        }
      })
      .then((userData) => {
        if (!userData) {
          return null;
        }
        const [post] = userData.posts;
        if (post) {
          if (isPropertyExactlySameAsGetCurrentUserModel(userData) && isPropertyExactlySameAsGetPostModel(post)) {
            return userData;
          }
        } else if (isPropertyExactlySameAsGetCurrentUserModel(userData)) {
          return userData;
        }

        return null;
      });

    if (!foundUser) {
      throw new HttpException("User not found", HttpStatus.UNAUTHORIZED);
    }

    return foundUser;
  }
}
