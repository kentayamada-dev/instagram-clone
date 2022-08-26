import { Module, forwardRef } from "@nestjs/common";
import { PrismaModule } from "../prisma/prisma.module";
import { LikeCommon } from "./like.common";
import { LikeResolver } from "./like.resolver";
import { LikeService } from "./like.service";

@Module({
  exports: [LikeService, LikeCommon],
  imports: [forwardRef(() => PrismaModule)],
  providers: [LikeResolver, LikeService, LikeCommon]
})
export class LikeModule {}
