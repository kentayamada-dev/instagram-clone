import { Module, forwardRef } from "@nestjs/common";
import { PrismaModule } from "../prisma/prisma.module";
import { UserModule } from "../user/user.module";
import { PostResolver } from "./post.resolver";
import { PostService } from "./post.service";

@Module({
  exports: [PostService],
  imports: [forwardRef(() => PrismaModule), forwardRef(() => UserModule)],
  providers: [PostResolver, PostService]
})
export class PostModule {}
