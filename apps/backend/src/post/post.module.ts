import { Module, forwardRef } from "@nestjs/common";
import { LikeModule } from "../like/like.module";
import { PrismaModule } from "../prisma/prisma.module";
import { PostResolver } from "./post.resolver";
import { PostService } from "./post.service";

@Module({
  exports: [PostService],
  imports: [forwardRef(() => PrismaModule), forwardRef(() => LikeModule)],
  providers: [PostResolver, PostService]
})
export class PostModule {}
