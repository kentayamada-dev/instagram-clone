import { Module, forwardRef } from "@nestjs/common";
import { PrismaModule } from "../prisma/prisma.module";
import { FollowResolver } from "./follow.resolver";
import { FollowService } from "./follow.service";

@Module({
  exports: [FollowService],
  imports: [forwardRef(() => PrismaModule)],
  providers: [FollowResolver, FollowService]
})
export class FollowModule {}
