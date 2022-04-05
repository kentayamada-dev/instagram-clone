import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import helmet from "helmet";
import { AppModule } from "./app.module";

const DEV_PORT = 5001;

async function bootstrap(): Promise<void> {
  const { PORT } = process.env;
  const port = PORT ?? DEV_PORT;
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  await app.listen(port, "0.0.0.0");
}

void bootstrap();
