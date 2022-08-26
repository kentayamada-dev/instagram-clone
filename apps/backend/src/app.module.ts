import { join } from "path";
import { ApolloDriver } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import { ServeStaticModule } from "@nestjs/serve-static";
import { FollowModule } from "./follow/follow.module";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { LoggingPlugin } from "./libs/apollo/logging";
import { LikeModule } from "./like/like.module";
import { PostModule } from "./post/post.module";
import { PrismaModule } from "./prisma/prisma.module";
import { UserModule } from "./user/user.module";
import { configSchema } from "./utils/config";
import type { ConfigSchema } from "./utils/config";
import type { ApolloDriverConfig } from "@nestjs/apollo";

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      validationSchema: configSchema
    }),
    PrismaModule,
    UserModule,
    PostModule,
    FollowModule,
    LikeModule,
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService<ConfigSchema>) => ({
        autoSchemaFile: true,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/explicit-function-return-type
        context: ({ req, res }) => ({ req, res }),
        cors: {
          credentials: true,
          origin: ["https://studio.apollographql.com", configService.get("FRONTEND_ORIGIN")]
        },
        debug: false,
        introspection: true,
        playground: false
      })
    }),
    ServeStaticModule.forRoot({ rootPath: join(__dirname, "..", "client") })
  ]
  // eslint-disable-next-line capitalized-comments
  // providers: [LoggingPlugin]
})
export class AppModule {}
