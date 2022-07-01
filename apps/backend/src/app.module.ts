import { join } from "path";
import { ApolloDriver } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { GraphQLModule } from "@nestjs/graphql";
import { ServeStaticModule } from "@nestjs/serve-static";
import { ThrottlerModule } from "@nestjs/throttler";
import { GqlThrottlerGuard } from "./libs/throttler/gql-throttler.guard";
import { PostModule } from "./post/post.module";
import { PrismaModule } from "./prisma/prisma.module";
import { UserModule } from "./user/user.module";
import { configSchema } from "./utils/config/config.schema";
import type { ConfigSchema } from "./utils/config/config.schema";
import type { ApolloDriverConfig } from "@nestjs/apollo";

@Module({
  imports: [
    ThrottlerModule.forRoot({
      limit: 10,
      ttl: 60
    }),
    ConfigModule.forRoot({
      cache: true,
      validationSchema: configSchema
    }),
    PrismaModule,
    UserModule,
    PostModule,
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
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: GqlThrottlerGuard
    }
  ]
})
export class AppModule {}
