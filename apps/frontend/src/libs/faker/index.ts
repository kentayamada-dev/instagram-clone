import { faker } from "@faker-js/faker";
import type {
  PostsQuery,
  UsersQuery,
  CurrentUserQuery,
  UserQuery,
  PostQuery,
  UserPostsQuery,
  UserModelBase,
  PostModelPageInfo,
  FollowingQuery,
  FollowersQuery,
  UsersFilterQuery
} from "../../generated";

faker.mersenne.seed(999);

const userData = (): Pick<UserModelBase, "id" | "imageUrl" | "name"> => ({
  id: faker.internet.userName().toLowerCase(),
  imageUrl: faker.internet.avatar(),
  name: faker.name.findName()
});

const pageInfoData = (): Omit<PostModelPageInfo, "__typename"> => ({
  endCursor: faker.datatype.uuid(),
  hasNextPage: false
});

export const generateUsersData: UsersFilterQuery["users"]["nodes"] = new Array(5).fill(null).map(() => userData());

const generateUserPostData = (index: number): UserPostsQuery["user"]["posts"]["edges"][0] => ({
  node: {
    id: faker.datatype.uuid(),
    imageUrl: `https://picsum.photos/id/${index * 10}/1000/1000`
  }
});

export const generateUserPosts: UserPostsQuery["user"]["posts"]["edges"] = new Array(5)
  .fill(null)
  .map((_, index) => generateUserPostData(index));

export const generatePostData = (index: number): PostQuery["post"] => ({
  caption: faker.lorem.sentence(),
  createdAt: faker.date.past().toDateString(),
  id: faker.datatype.uuid(),
  imageUrl: `https://picsum.photos/id/${index}/1000/1000`,
  user: {
    ...userData(),
    posts: {
      edges: generateUserPosts
    }
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

const generateFollowingData: CurrentUserQuery["currentUser"]["following"]["nodes"] = new Array(5)
  .fill(null)
  .map(() => ({ followingUserId: faker.internet.userName().toLowerCase() }));

export const generateCurrentUserData: CurrentUserQuery["currentUser"] = {
  ...userData(),
  following: {
    nodes: generateFollowingData
  }
};

export const generateUserData: UserQuery["user"] = {
  ...{
    follower: {
      totalCount: 123
    },
    following: {
      totalCount: 456
    },
    posts: {
      totalCount: 789
    }
  },
  ...userData()
};

export const generateUserPostsData: UserPostsQuery["user"]["posts"] = {
  edges: generateUserPosts,
  pageInfo: pageInfoData()
};

export const generateFollowing: FollowingQuery["following"] = {
  edges: [
    {
      node: {
        followingUser: userData()
      }
    }
  ],
  pageInfo: pageInfoData()
};

export const generateFollower: FollowersQuery["follower"] = {
  edges: [
    {
      node: {
        followedUser: userData()
      }
    }
  ],
  pageInfo: pageInfoData()
};
