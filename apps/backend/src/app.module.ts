import { join } from "path";
import { ApolloDriver } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { ServeStaticModule } from "@nestjs/serve-static";
import { ApolloServerPluginLandingPageLocalDefault } from "apollo-server-core";
import { PostResolver } from "./post/post.resolver";
import { PrismaService } from "./prisma/prisma.service";
import { UserResolver } from "./user/user.resolver";
import type { ApolloDriverConfig } from "@nestjs/apollo";

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: true,
      cors: {
        credentials: true,
        origin: ["https://studio.apollographql.com"]
      },
      debug: true,
      driver: ApolloDriver,
      introspection: true,
      playground: false,
      // eslint-disable-next-line new-cap
      plugins: [ApolloServerPluginLandingPageLocalDefault()]
    }),
    ServeStaticModule.forRoot({ rootPath: join(__dirname, "..", "client") })
  ],
  providers: [PrismaService, UserResolver, PostResolver]
})
export class AppModule {}
