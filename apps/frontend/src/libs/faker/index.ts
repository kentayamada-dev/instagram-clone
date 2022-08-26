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
  FollowersQuery
} from "../../generated";

faker.mersenne.seed(999);

const userCommon = (): Pick<UserModelBase, "id" | "imageUrl" | "name"> => ({
  id: faker.internet.userName().toLowerCase(),
  imageUrl: faker.internet.avatar(),
  name: faker.name.findName()
});

const pageInfo = (): Omit<PostModelPageInfo, "__typename"> => ({
  endCursor: faker.datatype.uuid(),
  hasNextPage: false
});

const userPost = (index: number): UserPostsQuery["user"]["posts"]["nodes"][0] => ({
  id: faker.datatype.uuid(),
  imageUrl: `https://picsum.photos/id/${index * 10}/1000/1000`
});

export const userPostNodes: UserPostsQuery["user"]["posts"]["nodes"] = new Array(5)
  .fill(null)
  .map((_, index) => userPost(index));

export const post = (index: number): PostQuery["post"] => ({
  caption: faker.lorem.sentence(),
  createdAt: faker.date.past().toDateString(),
  id: faker.datatype.uuid(),
  imageUrl: `https://picsum.photos/id/${index}/1000/1000`,
  likes: {
    totalCount: 8
  },
  user: {
    ...userCommon(),
    posts: {
      nodes: userPostNodes
    }
  }
});

export const postNodes: PostsQuery["posts"]["nodes"] = new Array(5).fill(null).map((_, index) => post(index));

export const posts: PostsQuery["posts"] = {
  nodes: postNodes,
  pageInfo: pageInfo()
};

export const userNodes: UsersQuery["users"]["nodes"] = new Array(5).fill(null).map(() => userCommon());

export const users: UsersQuery["users"] = {
  nodes: userNodes,
  pageInfo: pageInfo()
};

const followingNodes: CurrentUserQuery["currentUser"]["following"]["nodes"] = new Array(5)
  .fill(null)
  .map(() => ({ followingUserId: faker.internet.userName().toLowerCase() }));

export const currentUser: CurrentUserQuery["currentUser"] = {
  ...userCommon(),
  following: {
    nodes: followingNodes
  },
  likes: {
    nodes: [
      {
        postId: "like01"
      },
      {
        postId: "like02"
      },
      {
        postId: "like03"
      }
    ]
  }
};

export const user: UserQuery["user"] = {
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
  ...userCommon()
};

export const userPosts: UserPostsQuery["user"]["posts"] = {
  nodes: userPostNodes,
  pageInfo: pageInfo()
};

export const following: FollowingQuery["following"] = {
  nodes: [
    {
      followingUser: userCommon()
    }
  ],
  pageInfo: pageInfo()
};

export const follower: FollowersQuery["follower"] = {
  nodes: [
    {
      followedUser: userCommon()
    }
  ],
  pageInfo: pageInfo()
};
