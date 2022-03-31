import { Module, forwardRef } from "@nestjs/common";
import { PrismaModule } from "../prisma/prisma.module";
import { PostResolver } from "./post.resolver";

@Module({
  imports: [forwardRef(() => PrismaModule)],
  providers: [PostResolver]
})
export class PostModule {}
