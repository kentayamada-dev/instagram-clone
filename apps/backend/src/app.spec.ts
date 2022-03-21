import { FastifyAdapter } from "@nestjs/platform-fastify";
import { Test } from "@nestjs/testing";
import request from "supertest";
import { AppModule } from "./app.module";
import type { NestFastifyApplication } from "@nestjs/platform-fastify";
import type { TestingModule } from "@nestjs/testing";

describe("AppController (e2e)", () => {
  const OK = 200;
  // eslint-disable-next-line @typescript-eslint/init-declarations
  let app: NestFastifyApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = moduleFixture.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter()
    );
    await app.init();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    await app.getHttpAdapter().getInstance().ready();
  });

  it("/ (GET)", async () =>
    request(app.getHttpServer()).get("/").expect(OK).expect("Hello World!!"));

  afterAll(async () => {
    await app.close();
  });
});
