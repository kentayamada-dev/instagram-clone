import { Test } from "@nestjs/testing";
import request from "supertest";
import { AppModule } from "../app.module";
import type { INestApplication } from "@nestjs/common";
import type { TestingModule } from "@nestjs/testing";

describe("AppController (e2e)", () => {
  // eslint-disable-next-line @typescript-eslint/init-declarations
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it("/ (GET)", async () => request(app.getHttpServer()).get("/").expect(404));

  afterAll(async () => {
    await app.close();
  });
});
