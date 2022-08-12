import { faker } from "@faker-js/faker";
import type {
  PostsQuery,
  UsersQuery,
  CurrentUserQuery,
  UserQuery,
  PostQuery,
  UserPostsQuery,
  UserModelBase,
  PostModelPageInfo
} from "../../generated";

faker.mersenne.seed(999);

const userData = (): Omit<UserModelBase, "__typename" | "posts"> => ({
  id: faker.internet.userName().toLowerCase(),
  imageUrl: faker.internet.avatar(),
  name: faker.name.findName()
});

const pageInfoData = (): Omit<PostModelPageInfo, "__typename"> => ({
  endCursor: faker.datatype.uuid(),
  hasNextPage: false
});

export const generateUsersData: Omit<UserModelBase, "__typename" | "posts">[] = new Array(5)
  .fill(null)
  .map(() => userData());

export const generatePostData = (index: number): PostQuery["post"] => ({
  caption: faker.lorem.sentence(),
  createdAt: faker.date.past(),
  id: faker.datatype.uuid(),
  imageUrl: `https://picsum.photos/id/${index}/1000/1000`,
  user: userData()
});

const generateAllPostsEdge = (index: number): PostsQuery["posts"]["edges"][0] => ({
  node: generatePostData(index)
});

export const generateAllPostsEdges: PostsQuery["posts"]["edges"] = new Array(5)
  .fill(null)
  .map((_, index) => generateAllPostsEdge(index));

export const generateAllPostsData: PostsQuery["posts"] = {
  edges: generateAllPostsEdges,
  pageInfo: pageInfoData()
};

const generateAllUsersEdge = (): UsersQuery["users"]["edges"][0] => ({
  node: userData()
});

export const generateAllUsersEdges: UsersQuery["users"]["edges"] = new Array(5)
  .fill(null)
  .map(() => generateAllUsersEdge());

export const generateAllUsersData: UsersQuery["users"] = {
  edges: generateAllUsersEdges,
  pageInfo: pageInfoData()
};

export const generateCurrentUserData: CurrentUserQuery["currentUser"] = userData();

export const generateUserData: UserQuery["user"] = userData();

const generateUserPostData = (index: number): UserPostsQuery["user"]["posts"]["edges"][0] => ({
  node: {
    id: faker.datatype.uuid(),
    imageUrl: `https://picsum.photos/id/${index * 10}/1000/1000`
  }
});

export const generateUserPosts: UserPostsQuery["user"]["posts"]["edges"] = new Array(5)
  .fill(null)
  .map((_, index) => generateUserPostData(index));

export const generateUserPostsData: UserPostsQuery["user"]["posts"] = {
  edges: generateUserPosts,
  pageInfo: pageInfoData()
};
