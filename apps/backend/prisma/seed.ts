import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const generatePosts = (
  numberOfPosts: number,
  name: string
): Prisma.PostCreateWithoutUserInput[] =>
  [...Array(numberOfPosts)].map(
    (_, index): Prisma.PostCreateWithoutUserInput => {
      const title = `${name}_title[${index}]`;

      return {
        title
      };
    }
  );

const generateUsers = (numberOfUsers: number): Prisma.UserCreateInput[] =>
  [...Array(numberOfUsers)].map((_, index): Prisma.UserCreateInput => {
    const name = `user[${index}]`;
    const generatedPosts = generatePosts(5, name);

    return {
      name,
      posts: {
        create: [...generatedPosts]
      }
    };
  });

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
    const createdUser = await prisma.user.create({
      data: user
    });
    console.log(`Created user with id: ${createdUser.id}`);
  }
  console.log("Seeding finished.");
};

(async () => {
  const generatedUsers = generateUsers(5);
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
