import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import type { OnModuleInit, INestApplication } from "@nestjs/common";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  public constructor() {
    super({
      log: ["query", "info", "warn", "error"]
    });
  }

  public async onModuleInit(): Promise<void> {
    await this.$connect();
  }

  public enableShutdownHooks(app: INestApplication): void {
    this.$on("beforeExit", () => {
      void (async (): Promise<void> => {
        await app.close();
      })();
    });
  }
}
