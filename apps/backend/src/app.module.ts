import { join } from "path";
import { ApolloDriver } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { GraphQLModule } from "@nestjs/graphql";
import { ServeStaticModule } from "@nestjs/serve-static";
import { ThrottlerModule } from "@nestjs/throttler";
import { configSchema } from "./config/configuration.schema";
import { GqlThrottlerGuard } from "./libs/throttler/gql-throttler.guard";
import { PostModule } from "./post/post.module";
import { PrismaModule } from "./prisma/prisma.module";
import { UserModule } from "./user/user.module";
import type { ApolloDriverConfig } from "@nestjs/apollo";

@Module({
  imports: [
    ThrottlerModule.forRoot({
      limit: 10,
      ttl: 60
    }),
    ConfigModule.forRoot({
      validationSchema: configSchema
    }),
    PrismaModule,
    UserModule,
    PostModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: true,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      context: ({ req, res }) => ({ req, res }),
      cors: {
        credentials: true,
        origin: [
          "https://studio.apollographql.com",
          "https://instagram-clone-kentayamada-dev.vercel.app"
        ]
      },
      debug: true,
      driver: ApolloDriver,
      introspection: true,
      playground: false
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
