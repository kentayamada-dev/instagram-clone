import { Module, forwardRef } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "../auth/auth.module";
import { PostModule } from "../post/post.module";
import { PrismaModule } from "../prisma/prisma.module";
import { CurrentUserResolver } from "./currentUser.resolver";
import { UserResolver } from "./user.resolver";
import { UserService } from "./user.service";

@Module({
  exports: [UserService],
  imports: [
    forwardRef(() => PrismaModule),
    forwardRef(() => AuthModule),
    forwardRef(() => ConfigModule),
    forwardRef(() => PostModule)
  ],
  providers: [UserResolver, CurrentUserResolver, UserService]
})
export class UserModule {}
