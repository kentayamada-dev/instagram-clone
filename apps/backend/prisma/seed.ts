import { PrismaClient, Prisma } from "@prisma/client";
import { faker } from "@faker-js/faker";
import { hash } from "bcrypt";

faker.mersenne.seed(999);

const USERS = [
  {
    id: "instagram",
    name: "Instagram"
  },
  {
    id: "cristiano",
    name: "Cristiano Ronaldo"
  },
  {
    id: "kyliejenner",
    name: "Kylie Jenner"
  },
  {
    id: "leomessi",
    name: "Lionel Messi"
  },
  {
    id: "selenagomez",
    name: "Selena Gomez"
  },
  {
    id: "therock",
    name: "Dwayne Johnson"
  },
  {
    id: "kimkardashian",
    name: "Kim Kardashian"
  },
  {
    id: "arianagrande",
    name: "Ariana Grande"
  },
  {
    id: "beyonce",
    name: "Beyonce"
  },
  {
    id: "khloekardashian",
    name: "Khloe Kardashian"
  },
  {
    id: "justinbieber",
    name: "Justin Bieber"
  },
  {
    id: "kendalljenner",
    name: "Kendall Jenner"
  },
  {
    id: "natgeo",
    name: "National Geographic"
  },
  {
    id: "nike",
    name: "Nike"
  },
  {
    id: "taylorswift",
    name: "Taylor Swift"
  },
  {
    id: "jlo",
    name: "Jennifer Lopez"
  },
  {
    id: "virat.kohli",
    name: "Virat Kohli"
  },
  {
    id: "nickiminaj",
    name: "Nicki Minaj"
  },
  {
    id: "kourtneykardash",
    name: "Kourtney Kardashian"
  },
  {
    id: "mileycyrus",
    name: "Miley Cyrus"
  },
  {
    id: "neymarjr",
    name: "Neymar"
  },
  {
    id: "katyperry",
    name: "Katy Perry"
  },
  {
    id: "kevinhart4real",
    name: "Kevin Hart"
  },
  {
    id: "zendaya",
    name: "Zendaya"
  },
  {
    id: "iamcardib",
    name: "Cardi B"
  },
  {
    id: "ddlovato",
    name: "Demi Lovato"
  },
  {
    id: "badgalriri",
    name: "Rihanna"
  },
  {
    id: "kingjames",
    name: "LeBron James"
  },
  {
    id: "theellenshow",
    name: "Ellen DeGeneres"
  }
];
const TEST_USER: Prisma.UserCreateInput = {
  id: "test_user",
  imageUrl: `https://picsum.photos/id/1000/1000/1000`,
  name: "Test User",
  email: "testuser@gmail.com",
  password: "Test@12345"
};
const ANONYMOUS_USER: Prisma.UserCreateInput = {
  id: "anonymous_user",
  imageUrl: `https://picsum.photos/id/997/1000/1000`,
  name: "Anonymous User",
  email: "anonymoususer@gmail.com",
  password: "Anonymoususer@12345",
  posts: {
    createMany: {
      data: [
        { imageUrl: `https://picsum.photos/id/997/1000/1000`, caption: faker.lorem.paragraph() },
        { imageUrl: `https://picsum.photos/id/998/1000/1000`, caption: faker.lorem.paragraph() },
        { imageUrl: `https://picsum.photos/id/996/1000/1000`, caption: faker.lorem.paragraph() },
        { imageUrl: `https://picsum.photos/id/995/1000/1000`, caption: faker.lorem.paragraph() },
        { imageUrl: `https://picsum.photos/id/994/1000/1000`, caption: faker.lorem.paragraph() }
      ]
    }
  }
};
const LONG_USER_ID_NAME: Prisma.UserCreateInput = {
  id: "_the_longest_user_id_for_test_",
  imageUrl: `https://picsum.photos/id/777/1000/1000`,
  name: faker.lorem.paragraph(30),
  email: "longuser@gmail.com",
  password: "Longuser@12345",
  posts: {
    create: {
      caption: faker.lorem.paragraph(),
      imageUrl: `https://picsum.photos/id/666/1000/1000`
    }
  }
};

const sleep = (msec: number) => new Promise((resolve) => setTimeout(resolve, msec));
const getRandomInt = (max: number) => Math.floor(Math.random() * max);

const prisma = new PrismaClient();
const MAX_NUM_POSTS = 20;
const SALT_ROUNDS = 10;

const getRandomElements = (array: string[], num: number) => {
  const output = [];
  for (let i = 0; i < num; i++) {
    // @ts-ignore
    output.push(...array.splice(Math.floor(Math.random() * array.length), 1));
  }

  return output;
};

const generatePosts = (numberOfPosts: number): Prisma.PostCreateWithoutUserInput[] =>
  [...Array(numberOfPosts)].map((_, index): Prisma.PostCreateWithoutUserInput => {
    const randomBoolean = !getRandomInt(2);
    const caption = randomBoolean && faker.lorem.paragraph();

    return {
      ...(caption ? { caption: caption } : {}),
      imageUrl: `https://picsum.photos/id/${(index + 1) * 2}/1000/1000`
    };
  });

const generateUsers = async (): Promise<Prisma.UserCreateInput[]> =>
  await Promise.all(
    USERS.map(async (user, index): Promise<Prisma.UserCreateInput> => {
      const email = faker.internet.email().toLowerCase();
      const firstLetterCapitalizedEmail = email.charAt(0).toUpperCase() + email.slice(1);
      const password = firstLetterCapitalizedEmail + 123;
      const hashedPassword = await hash(password, SALT_ROUNDS);

      return {
        id: user.id,
        imageUrl: `https://picsum.photos/id/${(index + 1) * 3}/1000/1000`,
        name: user.name,
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
  const postIds: string[] = [];
  const usersId: string[] = [];

  for (const user of userData) {
    const randomBoolean = !getRandomInt(2);
    await sleep(0.1);
    const createdUser = await prisma.user.create({
      data: user
    });
    usersId.push(createdUser.id);
    if (randomBoolean) {
      const generatedPosts = generatePosts(getRandomInt(MAX_NUM_POSTS));
      for (const post of generatedPosts) {
        await sleep(0.1);
        const createdPost = await prisma.post.create({
          data: {
            userId: createdUser.id,
            ...post
          }
        });
        postIds.push(createdPost.id);
      }
    }
  }

  for (const user of userData) {
    const randomNumber = getRandomInt(3);
    const randomBoolean = !!randomNumber;
    const usersIdExceptMe = userData.filter((usr) => usr.id !== user.id).map((usr) => usr.id);
    const followingUsers = getRandomElements(
      usersIdExceptMe,
      randomNumber === 2 ? usersIdExceptMe.length : getRandomInt(usersIdExceptMe.length)
    );

    if (randomBoolean) {
      for (const userId of followingUsers) {
        await sleep(0.1);
        await prisma.follow.create({
          data: {
            followedUserId: user.id,
            followingUserId: userId
          }
        });
      }
    }
  }

  for (const postId of postIds) {
    const randomLikeBoolean = !getRandomInt(2);
    if (randomLikeBoolean) {
      const cloned = Array.from(usersId);
      const randomUsersId = getRandomElements(cloned, getRandomInt(cloned.length));
      for (const userId of randomUsersId) {
        await sleep(0.1);
        await prisma.like.create({
          data: {
            postId,
            userId
          }
        });
      }
    }
  }
};

(async () => {
  const generatedUsers = await generateUsers();
  const userToBeTested: Prisma.UserCreateInput = {
    ...TEST_USER,
    password: await hash(TEST_USER.password, SALT_ROUNDS)
  };
  const anonymousUser: Prisma.UserCreateInput = {
    ...ANONYMOUS_USER,
    password: await hash(ANONYMOUS_USER.password, SALT_ROUNDS)
  };
  const longUser: Prisma.UserCreateInput = {
    ...LONG_USER_ID_NAME,
    password: await hash(LONG_USER_ID_NAME.password, SALT_ROUNDS)
  };
  const userData: Prisma.UserCreateInput[] = [...generatedUsers, userToBeTested, longUser, anonymousUser];

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
