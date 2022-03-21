import { NestFactory } from "@nestjs/core";
import { FastifyAdapter } from "@nestjs/platform-fastify";
import { AppModule } from "./app.module";
import type { NestFastifyApplication } from "@nestjs/platform-fastify";

const DEV_PORT = 5001;

async function bootstrap(): Promise<void> {
  const { PORT } = process.env;
  const port = PORT ?? DEV_PORT;
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: false })
  );
  await app.listen(port, "0.0.0.0");
}

void bootstrap();
