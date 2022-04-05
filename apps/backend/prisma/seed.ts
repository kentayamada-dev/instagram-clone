import { PrismaClient, Prisma } from "@prisma/client";
import { faker } from "@faker-js/faker";
import { hash } from "bcrypt";

const prisma = new PrismaClient();
const getRandomInt = (max: number) => Math.floor(Math.random() * max);

const NUM_USERS = 5;
const MAX_NUM_POSTS = 5;
const SALT_ROUNDS = 10;

const generatePosts = (
  numberOfPosts: number
): Prisma.PostCreateWithoutUserInput[] =>
  [...Array(numberOfPosts)].map((): Prisma.PostCreateWithoutUserInput => {
    const getRandomInt = (max: number) => Math.floor(Math.random() * max);
    const caption = !getRandomInt(2) && faker.lorem.words();
    const imageUrl = faker.image.imageUrl();

    return {
      ...(caption ? { caption: caption } : {}),
      imageUrl
    };
  });

const generateUsers = async (
  numberOfUsers: number
): Promise<Prisma.UserCreateInput[]> =>
  await Promise.all(
    [...Array(numberOfUsers)].map(async (): Promise<Prisma.UserCreateInput> => {
      const name = faker.name.findName();
      const generatedPosts = generatePosts(getRandomInt(MAX_NUM_POSTS));
      const email = faker.internet.email().toLowerCase();
      const imageUrl = faker.image.imageUrl();
      const password = await hash(email, SALT_ROUNDS);

      return {
        imageUrl,
        name,
        email,
        posts: {
          create: [...generatedPosts]
        },
        password
      };
    })
  );

const initDB = async () => {
  const tableNames = await prisma.$queryRaw<
    Array<{ tablename: string }>
  >`SELECT tablename FROM pg_tables WHERE schemaname='public'`;

  for (const { tablename } of tableNames) {
    if (tablename !== "_prisma_migrations") {
      try {
        await prisma.$executeRawUnsafe(
          `TRUNCATE TABLE "public"."${tablename}" CASCADE;`
        );
      } catch (error) {
        throw new Error(`${error}`);
      }
    }
  }
};

const seedData = async (userData: Prisma.UserCreateInput[]) => {
  console.log("Start seeding ...");
  for (const user of userData) {
    await prisma.user.create({
      data: user
    });
  }
  console.log("Seeding finished.");
};

(async () => {
  const generatedUsers = await generateUsers(NUM_USERS);
  const userData: Prisma.UserCreateInput[] = [...generatedUsers];

  try {
    await initDB();
    await seedData(userData);
  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();
