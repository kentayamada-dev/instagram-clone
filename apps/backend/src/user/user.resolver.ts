import { HttpException, HttpStatus, UseGuards } from "@nestjs/common";
import { Args, Resolver, Query, Mutation } from "@nestjs/graphql";
import { hash, compare } from "bcrypt";
import { CurrentUser } from "../auth/auth.decorator";
import { AuthService } from "../auth/auth.service";
import { JwtPayload } from "../auth/auth.types";
import { GqlAuthGuard } from "../auth/gql-auth.guard";
import { JwtModel } from "../auth/jwt.model";
import { PaginationArgs } from "../pagination/pagination.args";
import { isPropertyExactlySameAsGetPostModel } from "../post/models/get-post.model";
import { PrismaService } from "../prisma/prisma.service";
import { LoginInput } from "./dto/login.input";
import { SignupInput } from "./dto/signup.input";
import {
  isPropertyExactlySameAsGetAllUsersModel,
  PaginatedGetAllUsersModel
} from "./models/get-all-users.model";
import {
  GetCurrentUserModel,
  isPropertyExactlySameAsGetCurrentUserModel
} from "./models/get-current-user.model";
import type { JwtToken } from "../auth/auth.types";
import type { Edge } from "../pagination/pagination.model";
import type { GetAllUsersModel } from "./models/get-all-users.model";

const SALT_ROUNDS = 10;

@Resolver()
export class UserResolver {
  /* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
  public constructor(
    private readonly prismaService: PrismaService,
    private readonly authService: AuthService
  ) {}
  /* eslint-enable @typescript-eslint/prefer-readonly-parameter-types */

  @Query(() => PaginatedGetAllUsersModel, { description: "Get All Users" })
  protected async getAllUsers(
    @Args() { cursor, limit }: PaginationArgs
  ): Promise<PaginatedGetAllUsersModel> {
    const lastIndex = -1;
    const firstIndex = 0;
    const foundUsers = await this.prismaService.user
      .findMany({
        // eslint-disable-next-line @typescript-eslint/no-extra-parens
        ...(cursor ? { cursor: { id: cursor }, skip: 1 } : {}),
        orderBy: {
          createdAt: "desc"
        },
        select: {
          createdAt: true,
          id: true,
          imageUrl: true,
          name: true
        },
        take: limit
      })
      .then((usersData) => {
        const firstUser = usersData[firstIndex];
        if (firstUser && isPropertyExactlySameAsGetAllUsersModel(firstUser)) {
          return usersData;
        }

        return [];
      });

    const lastUser = foundUsers.at(lastIndex);

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
          .then((value) => value[firstIndex]?.id)
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

  @Mutation(() => JwtModel, { description: "Signup" })
  protected async signup(
    @Args("signupData") signupData: SignupInput
  ): Promise<JwtToken> {
    const foundUser = await this.prismaService.user.findUnique({
      select: {
        id: true
      },
      where: {
        email: signupData.email
      }
    });

    if (foundUser) {
      throw new HttpException("Email already exists", HttpStatus.CONFLICT);
    }

    const { password, ...rest } = signupData;
    const hashedPassword = await hash(password, SALT_ROUNDS);
    const data: SignupInput = {
      ...rest,
      password: hashedPassword
    };
    await this.prismaService.user.create({ data });

    return this.authService.getJwtToken(data.email);
  }

  @Mutation(() => JwtModel, { description: "Login" })
  protected async login(
    @Args("loginData") loginData: LoginInput
  ): Promise<JwtToken> {
    const foundUser = await this.prismaService.user.findUnique({
      select: {
        email: true,
        password: true
      },
      where: {
        email: loginData.email
      }
    });

    if (
      !foundUser ||
      // eslint-disable-next-line @typescript-eslint/no-extra-parens
      !(await compare(loginData.password, foundUser.password))
    ) {
      throw new HttpException(
        "Incorrect email or password",
        HttpStatus.UNAUTHORIZED
      );
    }

    return this.authService.getJwtToken(foundUser.email);
  }

  @Query(() => GetCurrentUserModel, { description: "Get Current User" })
  @UseGuards(GqlAuthGuard)
  protected async getCurrentUser(
    @CurrentUser() user: JwtPayload
  ): Promise<GetCurrentUserModel> {
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
          email: user.email
        }
      })
      .then((postsData) => {
        const firstIndex = 0;
        if (!postsData) {
          return null;
        }
        const post = postsData.posts[firstIndex];
        if (post) {
          if (
            isPropertyExactlySameAsGetCurrentUserModel(postsData) &&
            isPropertyExactlySameAsGetPostModel(post)
          ) {
            return postsData;
          }
        } else if (isPropertyExactlySameAsGetCurrentUserModel(postsData)) {
          return postsData;
        }

        return null;
      });

    if (!foundUser) {
      throw new HttpException("User not found", HttpStatus.UNAUTHORIZED);
    }

    return foundUser;
  }
}
