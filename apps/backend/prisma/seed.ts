import { PrismaClient, Prisma } from "@prisma/client";
import { faker } from "@faker-js/faker";
import { hash } from "bcrypt";

faker.mersenne.seed(999);

const NUM_USERS = 10;
const MAX_NUM_POSTS = 20;
const SALT_ROUNDS = 10;
const TEST_USER = {
  imageUrl: `https://picsum.photos/id/1000/1000/1000`,
  name: "Test User",
  email: "testuser@gmail.com",
  password: "Test@12345"
};

const prisma = new PrismaClient();
const getRandomInt = (max: number) => Math.floor(Math.random() * max);
const sleep = (msec: number) => new Promise((resolve) => setTimeout(resolve, msec));

const generatePosts = (numberOfPosts: number): Prisma.PostCreateWithoutUserInput[] =>
  [...Array(numberOfPosts)].map((_, index): Prisma.PostCreateWithoutUserInput => {
    const randomBoolean = !getRandomInt(2);
    const caption = randomBoolean && faker.lorem.words();

    return {
      ...(caption ? { caption: caption } : {}),
      imageUrl: `https://picsum.photos/id/${(index + 1) * 2}/1000/1000`
    };
  });

const generateUsers = async (numberOfUsers: number): Promise<Prisma.UserCreateInput[]> =>
  await Promise.all(
    [...Array(numberOfUsers)].map(async (_, index): Promise<Prisma.UserCreateInput> => {
      const name = faker.name.findName();
      const email = faker.internet.email().toLowerCase();
      const firstLetterCapitalizedEmail = email.charAt(0).toUpperCase() + email.slice(1);
      const password = firstLetterCapitalizedEmail + 123;
      const hashedPassword = await hash(password, SALT_ROUNDS);

      return {
        imageUrl: `https://picsum.photos/id/${(index + 1) * 3}/1000/1000`,
        name,
        email,
        password: hashedPassword
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
        await prisma.$executeRawUnsafe(`TRUNCATE TABLE "public"."${tablename}" CASCADE;`);
      } catch (error) {
        throw new Error(`${error}`);
      }
    }
  }
};

const seedData = async (userData: Prisma.UserCreateInput[]) => {
  console.log("Start seeding ...");
  for (const user of userData) {
    const randomBoolean = !getRandomInt(2);
    await sleep(0.1);
    const createdUser = await prisma.user.create({
      data: user
    });
    if (randomBoolean) {
      const generatedPosts = generatePosts(getRandomInt(MAX_NUM_POSTS));
      for (const post of generatedPosts) {
        await sleep(0.1);
        await prisma.post.create({
          data: {
            userId: createdUser.id,
            ...post
          }
        });
      }
    }
  }
  console.log("Seeding finished.");
};

(async () => {
  const generatedUsers = await generateUsers(NUM_USERS);
  const userToBeTested = { ...TEST_USER, password: await hash(TEST_USER.password, SALT_ROUNDS) };
  const userData: Prisma.UserCreateInput[] = [...generatedUsers, userToBeTested];

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
