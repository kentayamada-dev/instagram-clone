import { faker } from "@faker-js/faker";
import type {
  GetAllPostsModel,
  GetAllPostsQuery,
  GetAllUsersQuery,
  GetCurrentUserQuery,
  GetUserQuery
} from "../../types/generated/types";

faker.mersenne.seed(999);

export const generatePostData = (index: number): GetAllPostsModel => ({
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

const generateAllPostsEdge = (index: number): GetAllPostsQuery["getAllPosts"]["edges"][0] => ({
  node: generatePostData(index)
});

export const generateAllPostsEdges: GetAllPostsQuery["getAllPosts"]["edges"] = new Array(5)
  .fill(null)
  .map((_, index) => generateAllPostsEdge(index));

export const generateAllPostsData: GetAllPostsQuery["getAllPosts"] = {
  edges: generateAllPostsEdges,
  pageInfo: {
    endCursor: faker.datatype.uuid(),
    hasNextPage: false
  }
};

const generateAllUsersEdge = (): GetAllUsersQuery["getAllUsers"]["edges"][0] => ({
  node: {
    id: faker.datatype.uuid(),
    imageUrl: faker.internet.avatar(),
    name: faker.name.findName()
  }
});

export const generateAllUsersEdges: GetAllUsersQuery["getAllUsers"]["edges"] = new Array(5)
  .fill(null)
  .map(() => generateAllUsersEdge());

export const generateAllUsersData: GetAllUsersQuery["getAllUsers"] = {
  edges: generateAllUsersEdges,
  pageInfo: {
    endCursor: faker.datatype.uuid(),
    hasNextPage: false
  }
};

export const generateCurrentUserData: GetCurrentUserQuery["getCurrentUser"] = {
  id: faker.datatype.uuid(),
  imageUrl: faker.internet.avatar(),
  name: faker.name.findName()
};

const generatePost = (index: number): GetUserQuery["getUser"]["posts"][0] => ({
  caption: faker.lorem.sentence(),
  createdAt: faker.date.past(),
  id: faker.datatype.uuid(),
  imageUrl: `https://picsum.photos/id/${index}/1000/1000`
});

const generatePostsData: GetUserQuery["getUser"]["posts"] = new Array(5)
  .fill(null)
  .map((_, index) => generatePost(index));

export const generateUserData: GetUserQuery["getUser"] = {
  id: faker.datatype.uuid(),
  imageUrl: faker.internet.avatar(),
  name: faker.name.findName(),
  posts: generatePostsData
};
