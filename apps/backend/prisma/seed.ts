import { PrismaClient, Prisma } from "@prisma/client";
import { faker } from "@faker-js/faker";
import { hash } from "bcrypt";

const NUM_USERS = 10;
const MAX_NUM_POSTS = 10;
const SALT_ROUNDS = 10;
const UNSPLASH_IMAGES = [
  "https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80",
  "https://images.unsplash.com/photo-1649605955621-1b9eea02391e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80",
  "https://images.unsplash.com/photo-1649696224209-c8b2027ccd37?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
  "https://images.unsplash.com/photo-1649605473295-be3e3fc0f929?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80",
  "https://images.unsplash.com/photo-1638913662252-70efce1e60a7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
  "https://images.unsplash.com/photo-1649693002660-d63a4ff387ad?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
  "https://images.unsplash.com/photo-1649693364265-b4d5af897d99?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80"
];
const TEST_USER = {
  imageUrl:
    "https://images.unsplash.com/photo-1649693364265-b4d5af897d99?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80",
  name: "Test User",
  email: "testuser@gmail.com",
  password: "Test@12345"
};

const prisma = new PrismaClient();
const getRandomInt = (max: number) => Math.floor(Math.random() * max);
const sleep = (msec: number) => new Promise((resolve) => setTimeout(resolve, msec));

const generatePosts = (numberOfPosts: number): Prisma.PostCreateWithoutUserInput[] =>
  [...Array(numberOfPosts)].map((): Prisma.PostCreateWithoutUserInput => {
    const randomBoolean = !getRandomInt(2);
    const caption = randomBoolean && faker.lorem.words();

    return {
      ...(caption ? { caption: caption } : {}),
      imageUrl: UNSPLASH_IMAGES[getRandomInt(7)]
    };
  });

const generateUsers = async (numberOfUsers: number): Promise<Prisma.UserCreateInput[]> =>
  await Promise.all(
    [...Array(numberOfUsers)].map(async (): Promise<Prisma.UserCreateInput> => {
      const name = faker.name.findName();
      const email = faker.internet.email().toLowerCase();
      const firstLetterCapitalizedEmail = email.charAt(0).toUpperCase() + email.slice(1);
      const password = firstLetterCapitalizedEmail + 123;
      const hashedPassword = await hash(password, SALT_ROUNDS);

      return {
        imageUrl: UNSPLASH_IMAGES[getRandomInt(7)],
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
