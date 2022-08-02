import { faker } from "@faker-js/faker";
import type { PostsQuery, UsersQuery, CurrentUserQuery, UserQuery, PostQuery } from "../../generated";

faker.mersenne.seed(999);

export const generatePostData = (index: number): PostQuery["post"] => ({
  caption: faker.lorem.sentence(),
  createdAt: faker.date.past(),
  id: faker.datatype.uuid(),
  imageUrl: `https://picsum.photos/id/${index}/1000/1000`,
  user: {
    id: faker.datatype.uuid(),
    imageUrl: faker.internet.avatar(),
    name: faker.name.findName()
  }
});

const generateAllPostsEdge = (index: number): PostsQuery["posts"]["edges"][0] => ({
  node: generatePostData(index)
});

export const generateAllPostsEdges: PostsQuery["posts"]["edges"] = new Array(5)
  .fill(null)
  .map((_, index) => generateAllPostsEdge(index));

export const generateAllPostsData: PostsQuery["posts"] = {
  edges: generateAllPostsEdges,
  pageInfo: {
    endCursor: faker.datatype.uuid(),
    hasNextPage: false
  }
};

const generateAllUsersEdge = (): UsersQuery["users"]["edges"][0] => ({
  node: {
    id: faker.datatype.uuid(),
    imageUrl: faker.internet.avatar(),
    name: faker.name.findName()
  }
});

export const generateAllUsersEdges: UsersQuery["users"]["edges"] = new Array(5)
  .fill(null)
  .map(() => generateAllUsersEdge());

export const generateAllUsersData: UsersQuery["users"] = {
  edges: generateAllUsersEdges,
  pageInfo: {
    endCursor: faker.datatype.uuid(),
    hasNextPage: false
  }
};

export const generateCurrentUserData: CurrentUserQuery["currentUser"] = {
  id: faker.datatype.uuid(),
  imageUrl: faker.internet.avatar(),
  name: faker.name.findName()
};

const generatePost = (index: number): UserQuery["user"]["posts"]["nodes"][0] => ({
  caption: faker.lorem.sentence(),
  createdAt: faker.date.past(),
  id: faker.datatype.uuid(),
  imageUrl: `https://picsum.photos/id/${index}/1000/1000`
});

const generatePostsData: UserQuery["user"]["posts"]["nodes"] = new Array(5)
  .fill(null)
  .map((_, index) => generatePost(index));

export const generateUserData: UserQuery["user"] = {
  id: faker.datatype.uuid(),
  imageUrl: faker.internet.avatar(),
  name: faker.name.findName(),
  posts: { nodes: generatePostsData }
};
