import { Module, forwardRef } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "../auth/auth.module";
import { FollowModule } from "../follow/follow.module";
import { PostModule } from "../post/post.module";
import { PrismaModule } from "../prisma/prisma.module";
import { CurrentUserResolver } from "./currentUser.resolver";
import { UserCommon } from "./user.common";
import { UserResolver } from "./user.resolver";
import { UserService } from "./user.service";

@Module({
  exports: [UserService],
  imports: [
    forwardRef(() => PrismaModule),
    forwardRef(() => AuthModule),
    forwardRef(() => ConfigModule),
    forwardRef(() => PostModule),
    forwardRef(() => FollowModule)
  ],
  providers: [UserResolver, CurrentUserResolver, UserService, UserCommon]
})
export class UserModule {}
