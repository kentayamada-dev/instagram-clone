import { Module, forwardRef } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { PrismaModule } from "../prisma/prisma.module";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./jwt.strategy";
import type { ConfigSchema } from "../config/config.schema";

@Module({
  exports: [AuthService],
  imports: [
    ConfigModule,
    forwardRef(() => PrismaModule),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
      useFactory: (configService: ConfigService<ConfigSchema>) => ({
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        secret: configService.get("JWT_SECRET")!,
        signOptions: { expiresIn: "1d" }
      })
    })
  ],
  providers: [AuthService, JwtStrategy]
})
export class AuthModule {}
