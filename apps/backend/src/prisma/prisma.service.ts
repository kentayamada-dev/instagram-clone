import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import type { OnModuleInit, INestApplication } from "@nestjs/common";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  public async onModuleInit() {
    await this.$connect();
  }

  public enableShutdownHooks(app: INestApplication) {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    this.$on("beforeExit", async () => {
      await app.close();
    });
  }
}
