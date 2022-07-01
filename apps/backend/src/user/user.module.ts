import { Module, forwardRef } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "../auth/auth.module";
import { PrismaModule } from "../prisma/prisma.module";
import { UserResolver } from "./user.resolver";

@Module({
  imports: [forwardRef(() => PrismaModule), forwardRef(() => AuthModule), forwardRef(() => ConfigModule)],
  providers: [UserResolver]
})
export class UserModule {}
